import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Option "mo:base/Option";

actor Twinvest {
  // -------- Types --------
  public type Role = { #investor; #issuer; #admin };

  public type KycStatus = { #unverified; #pending; #verified; #rejected };

  public type NotificationCategory = { #info; #action; #alert };

  public type TransactionType = { #deposit; #invest; #payout; #withdrawal };

  public type Transaction = {
    id : Nat;
    user : Principal;
    timestamp : Int;
    kind : TransactionType;
    amount : Nat;
    invoiceId : ?Nat;
    description : Text;
  };

  public type Portfolio = {
    owner : Principal;
    cashBalance : Nat;
    totalInvested : Nat;
    positions : [(Nat, Nat)]; // (invoiceId, amount)
  };

  public type InvoiceStatus = { #open; #funded; #repaid; #defaulted };

  public type Invoice = {
    id : Nat;
    issuer : Principal;
    amount : Nat; // face value
    discountBps : Nat; // basis points discount (e.g., 250 = 2.5%)
    dueDate : Int; // unix time (ns)
    fundedAmount : Nat;
    status : InvoiceStatus;
    investors : [(Principal, Nat)]; // invested per investor
    createdAt : Int;
  };

  public type Metrics = {
    processedVolume : Nat;
    activeUsers : Nat;
    openInvoices : Nat;
    investorsCount : Nat;
  };

  public type Notification = {
    id : Nat;
    user : Principal;
    message : Text;
    createdAt : Int;
    category : NotificationCategory;
    read : Bool;
  };

  // -------- Stable Storage (portable representations) --------
  private stable var rolesStable : [(Principal, Role)] = [];
  private stable var kycStable : [(Principal, KycStatus)] = [];
  private stable var portfoliosStable : [(Principal, Portfolio)] = [];
  private stable var transactionsStable : [Transaction] = [];
  private stable var invoicesStable : [Invoice] = [];
  private stable var notificationsStable : [Notification] = [];

  private stable var nextTransactionId : Nat = 1;
  private stable var nextInvoiceId : Nat = 1;
  private stable var nextNotificationId : Nat = 1;

  // -------- In-memory indices (rebuilt on upgrade) --------
  private var roles : HashMap.HashMap<Principal, Role> = HashMap.HashMap<Principal, Role>(16, Principal.equal, Principal.hash);
  private var kycMap : HashMap.HashMap<Principal, KycStatus> = HashMap.HashMap<Principal, KycStatus>(16, Principal.equal, Principal.hash);
  private var portfolioMap : HashMap.HashMap<Principal, Portfolio> = HashMap.HashMap<Principal, Portfolio>(16, Principal.equal, Principal.hash);
  private var investorCountsCache : Nat = 0; // quick metric

  system func preupgrade() {
    rolesStable := Iter.toArray(roles.entries());
    kycStable := Iter.toArray(kycMap.entries());
    portfoliosStable := Iter.toArray(portfolioMap.entries());
    // Transactions, invoices, notifications are already kept in stable arrays
  };

  system func postupgrade() {
    roles := HashMap.fromIter<Principal, Role>(rolesStable.vals(), 16, Principal.equal, Principal.hash);
    kycMap := HashMap.fromIter<Principal, KycStatus>(kycStable.vals(), 16, Principal.equal, Principal.hash);
    portfolioMap := HashMap.fromIter<Principal, Portfolio>(portfoliosStable.vals(), 16, Principal.equal, Principal.hash);
    investorCountsCache := Iter.size<Principal>(roles.keys());
  };

  // -------- Helpers --------
  private func requireAdmin(p : Principal) : Bool {
    switch (roles.get(p)) {
      case (? #admin) { true };
      case _ { false };
    }
  };

  private func getOrInitPortfolio(p : Principal) : Portfolio {
    switch (portfolioMap.get(p)) {
      case (?port) { port };
      case null {
        let fresh : Portfolio = {
          owner = p;
          cashBalance = 0;
          totalInvested = 0;
          positions = [];
        };
        portfolioMap.put(p, fresh);
        fresh
      };
    }
  };

  private func upsertPortfolio(port : Portfolio) {
    portfolioMap.put(port.owner, port);
  };

  private func pushTransaction(t : Transaction) {
    transactionsStable := Array.append(transactionsStable, [t]);
  };

  private func now() : Int { Time.now() };

  // -------- Identity + Role Binding --------
  public shared({ caller }) func set_my_role(role : Role) : async () {
    let hadRole = roles.get(caller);
    roles.put(caller, role);
    if (hadRole == null) {
      investorCountsCache += 1;
    };
  };

  public shared query({ caller }) func get_my_role() : async ?Role {
    roles.get(caller)
  };

  // -------- KYC + Compliance --------
  public shared({ caller }) func submit_my_kyc() : async () {
    // Transition to pending when user submits
    kycMap.put(caller, #pending);
  };

  public shared query({ caller }) func get_my_kyc() : async KycStatus {
    switch (kycMap.get(caller)) {
      case (?s) { s };
      case null { #unverified };
    }
  };

  public shared({ caller }) func admin_set_kyc(user : Principal, status : KycStatus) : async Bool {
    if (!requireAdmin(caller)) { return false };
    kycMap.put(user, status);
    true
  };

  // -------- Portfolio + Transactions --------
  public shared query({ caller }) func get_my_portfolio() : async Portfolio {
    getOrInitPortfolio(caller)
  };

  public shared query({ caller }) func list_my_transactions() : async [Transaction] {
    Array.filter<Transaction>(transactionsStable, func(t : Transaction) : Bool { t.user == caller })
  };

  public shared({ caller }) func deposit(amount : Nat) : async Bool {
    var port = getOrInitPortfolio(caller);
    port := {
      owner = port.owner;
      cashBalance = port.cashBalance + amount;
      totalInvested = port.totalInvested;
      positions = port.positions;
    };
    upsertPortfolio(port);
    let t : Transaction = {
      id = nextTransactionId;
      user = caller;
      timestamp = now();
      kind = #deposit;
      amount = amount;
      invoiceId = null;
      description = "Deposit";
    };
    nextTransactionId += 1;
    pushTransaction(t);
    true
  };

  // -------- Invoice Marketplace --------
  public shared({ caller }) func create_invoice(amount : Nat, discountBps : Nat, dueDate : Int) : async Nat {
    let invoice : Invoice = {
      id = nextInvoiceId;
      issuer = caller;
      amount = amount;
      discountBps = discountBps;
      dueDate = dueDate;
      fundedAmount = 0;
      status = #open;
      investors = [];
      createdAt = now();
    };
    nextInvoiceId += 1;
    invoicesStable := Array.append(invoicesStable, [invoice]);
    invoice.id
  };

  public shared query func list_invoices() : async [Invoice] {
    invoicesStable
  };

  public shared query func get_invoice(id : Nat) : async ?Invoice {
    Array.find<Invoice>(
      invoicesStable,
      func(i : Invoice) : Bool { i.id == id }
    )
  };

  public shared({ caller }) func invest_in_invoice(id : Nat, amount : Nat) : async Bool {
    var port = getOrInitPortfolio(caller);
    if (amount == 0 or amount > port.cashBalance) { return false };

    var found : Bool = false;
    var updated : [Invoice] = [];
    label scan for (i in invoicesStable.vals()) {
      if (i.id == id) {
        if (i.status != #open) { return false };
        let newFunded = i.fundedAmount + amount;
        let status' : InvoiceStatus = if (newFunded >= i.amount) { #funded } else { #open };
        // merge investor position
        var investedList = i.investors;
        var merged : [(Principal, Nat)] = [];
        var added = false;
        for ((p, a) in investedList.vals()) {
          if (p == caller) {
            merged := Array.append(merged, [(p, a + amount)]);
            added := true;
          } else {
            merged := Array.append(merged, [(p, a)]);
          }
        };
        if (!added) { merged := Array.append(merged, [(caller, amount)]) };

        let updatedInv : Invoice = {
          id = i.id;
          issuer = i.issuer;
          amount = i.amount;
          discountBps = i.discountBps;
          dueDate = i.dueDate;
          fundedAmount = newFunded;
          status = status';
          investors = merged;
          createdAt = i.createdAt;
        };
        updated := Array.append(updated, [updatedInv]);
        found := true;

        // Update investor portfolio
        port := {
          owner = port.owner;
          cashBalance = port.cashBalance - amount;
          totalInvested = port.totalInvested + amount;
          positions = addOrIncreasePosition(port.positions, id, amount);
        };
      } else {
        updated := Array.append(updated, [i]);
      };
    };
    if (!found) { return false };
    invoicesStable := updated;
    upsertPortfolio(port);
    let t : Transaction = {
      id = nextTransactionId;
      user = caller;
      timestamp = now();
      kind = #invest;
      amount = amount;
      invoiceId = ?id;
      description = "Invest in invoice #" # Nat.toText(id);
    };
    nextTransactionId += 1;
    pushTransaction(t);
    true
  };

  private func addOrIncreasePosition(positions : [(Nat, Nat)], invoiceId : Nat, amount : Nat) : [(Nat, Nat)] {
    var result : [(Nat, Nat)] = [];
    var added = false;
    for ((id, amt) in positions.vals()) {
      if (id == invoiceId) {
        result := Array.append(result, [(id, amt + amount)]);
        added := true;
      } else {
        result := Array.append(result, [(id, amt)]);
      }
    };
    if (!added) { result := Array.append(result, [(invoiceId, amount)]) };
    result
  };

  // -------- Notifications --------
  public shared({ caller }) func push_notification(user : Principal, message : Text, category : NotificationCategory) : async ?Nat {
    if (!requireAdmin(caller) and caller != user) { return null };
    let n : Notification = {
      id = nextNotificationId;
      user = user;
      message = message;
      createdAt = now();
      category = category;
      read = false;
    };
    nextNotificationId += 1;
    notificationsStable := Array.append(notificationsStable, [n]);
    ?n.id
  };

  public shared query({ caller }) func list_my_notifications() : async [Notification] {
    Array.filter<Notification>(notificationsStable, func(n : Notification) : Bool { n.user == caller })
  };

  public shared({ caller }) func mark_notification_read(id : Nat) : async Bool {
    var updated : [Notification] = [];
    var ok = false;
    for (n in notificationsStable.vals()) {
      if (n.id == id and n.user == caller) {
        let n' : Notification = {
          id = n.id;
          user = n.user;
          message = n.message;
          createdAt = n.createdAt;
          category = n.category;
          read = true;
        };
        updated := Array.append(updated, [n']);
        ok := true;
      } else {
        updated := Array.append(updated, [n]);
      }
    };
    if (ok) { notificationsStable := updated };
    ok
  };

  // -------- Analytics --------
  public shared query func get_dashboard_metrics() : async Metrics {
    let processed : Nat = Array.foldLeft<Transaction, Nat>(
      transactionsStable,
      0,
      func(acc : Nat, t : Transaction) : Nat {
        switch (t.kind) {
          case (#invest) { acc + t.amount };
          case _ { acc };
        }
      }
    );
    let openCount : Nat = Array.size(Array.filter<Invoice>(invoicesStable, func(i : Invoice) : Bool { i.status == #open }));
    let investorCount : Nat = Iter.size<Principal>(roles.keys());
    let activeUsers : Nat = Iter.size<Principal>(uniqueUsersFromTx());
    {
      processedVolume = processed;
      activeUsers = activeUsers;
      openInvoices = openCount;
      investorsCount = investorCount;
    }
  };

  private func uniqueUsersFromTx() : Iter.Iter<Principal> {
    let hm = HashMap.HashMap<Principal, Bool>(32, Principal.equal, Principal.hash);
    for (t in transactionsStable.vals()) { hm.put(t.user, true) };
    hm.keys()
  };
}

