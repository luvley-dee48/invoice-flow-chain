/* eslint-disable */
// Candid IDL factory matching src/twinvest/twinvest_backend.did
import type { IDL } from '@dfinity/candid';

export const idlFactory = ({ IDL }: { IDL: IDL }) => {
  const Role = IDL.Variant({ investor: IDL.Null, issuer: IDL.Null, admin: IDL.Null });
  const KycStatus = IDL.Variant({ unverified: IDL.Null, pending: IDL.Null, verified: IDL.Null, rejected: IDL.Null });
  const NotificationCategory = IDL.Variant({ info: IDL.Null, action: IDL.Null, alert: IDL.Null });
  const TransactionType = IDL.Variant({ deposit: IDL.Null, invest: IDL.Null, payout: IDL.Null, withdrawal: IDL.Null });
  const Transaction = IDL.Record({
    id: IDL.Nat,
    user: IDL.Principal,
    timestamp: IDL.Int,
    kind: TransactionType,
    amount: IDL.Nat,
    invoiceId: IDL.Opt(IDL.Nat),
    description: IDL.Text,
  });
  const Portfolio = IDL.Record({
    owner: IDL.Principal,
    cashBalance: IDL.Nat,
    totalInvested: IDL.Nat,
    positions: IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Nat)),
  });
  const InvoiceStatus = IDL.Variant({ open: IDL.Null, funded: IDL.Null, repaid: IDL.Null, defaulted: IDL.Null });
  const Invoice = IDL.Record({
    id: IDL.Nat,
    issuer: IDL.Principal,
    amount: IDL.Nat,
    discountBps: IDL.Nat,
    dueDate: IDL.Int,
    fundedAmount: IDL.Nat,
    status: InvoiceStatus,
    investors: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
    createdAt: IDL.Int,
  });
  const Metrics = IDL.Record({
    processedVolume: IDL.Nat,
    activeUsers: IDL.Nat,
    openInvoices: IDL.Nat,
    investorsCount: IDL.Nat,
  });
  const Notification = IDL.Record({
    id: IDL.Nat,
    user: IDL.Principal,
    message: IDL.Text,
    createdAt: IDL.Int,
    category: NotificationCategory,
    read: IDL.Bool,
  });
  return IDL.Service({
    // Identity + Roles
    set_my_role: IDL.Func([Role], [], []),
    get_my_role: IDL.Func([], [IDL.Opt(Role)], ['query']),
    // KYC
    submit_my_kyc: IDL.Func([], [], []),
    get_my_kyc: IDL.Func([], [KycStatus], ['query']),
    admin_set_kyc: IDL.Func([IDL.Principal, KycStatus], [IDL.Bool], []),
    // Portfolio + Transactions
    get_my_portfolio: IDL.Func([], [Portfolio], ['query']),
    list_my_transactions: IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    deposit: IDL.Func([IDL.Nat], [IDL.Bool], []),
    // Marketplace
    create_invoice: IDL.Func([IDL.Nat, IDL.Nat, IDL.Int], [IDL.Nat], []),
    list_invoices: IDL.Func([], [IDL.Vec(Invoice)], ['query']),
    get_invoice: IDL.Func([IDL.Nat], [IDL.Opt(Invoice)], ['query']),
    invest_in_invoice: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    // Notifications
    push_notification: IDL.Func([IDL.Principal, IDL.Text, NotificationCategory], [IDL.Opt(IDL.Nat)], []),
    list_my_notifications: IDL.Func([], [IDL.Vec(Notification)], ['query']),
    mark_notification_read: IDL.Func([IDL.Nat], [IDL.Bool], []),
    // Analytics
    get_dashboard_metrics: IDL.Func([], [Metrics], ['query']),
  });
};

export type _SERVICE = ReturnType<typeof idlFactory>;

