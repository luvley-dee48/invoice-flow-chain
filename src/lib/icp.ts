import { HttpAgent, Actor, type ActorSubclass } from '@dfinity/agent';
import { idlFactory as twinvestIdlFactory } from './twinvest_idl';
import { AuthClient } from '@dfinity/auth-client';
import type { Principal } from '@dfinity/principal';

// Optional: ambient type for Plug
declare global {
  interface Window {
    ic?: {
      plug?: {
        isConnected: () => Promise<boolean>;
        requestConnect: (opts: { whitelist: string[]; host?: string }) => Promise<boolean>;
        createActor: <T>(opts: { canisterId: string; interfaceFactory: any }) => Promise<ActorSubclass<T>>;
        agent?: HttpAgent;
        sessionManager?: { sessionData?: { principalId?: string } };
      };
    };
  }
}

export type Role = { investor: null } | { issuer: null } | { admin: null };

export function roleVariant(key: 'investor' | 'issuer' | 'admin'): Role {
  return { [key]: null } as Role;
}

export function getRoleKey(role: Role | null | undefined): 'investor' | 'issuer' | 'admin' | null {
  if (!role) return null;
  if ('investor' in role) return 'investor';
  if ('issuer' in role) return 'issuer';
  if ('admin' in role) return 'admin';
  return null;
}

function getHost(): string {
  return import.meta.env.VITE_IC_HOST || 'http://localhost:4943';
}

function getCanisterId(): string {
  const cid = import.meta.env.VITE_TWINVEST_CANISTER_ID;
  if (!cid) {
    throw new Error('VITE_TWINVEST_CANISTER_ID is not set. Add it to your .env');
  }
  return cid as string;
}

async function createHttpActor<T>(identity?: any): Promise<{ actor: ActorSubclass<T>; agent: HttpAgent }> {
  const host = getHost();
  const canisterId = getCanisterId();
  const agent = new HttpAgent({ host, identity });
  // In local, fetch root key for certificate validation
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    try { await agent.fetchRootKey(); } catch {}
  }
  const actor = Actor.createActor<T>(twinvestIdlFactory as any, { agent, canisterId });
  return { actor, agent };
}

export async function loginWithII<T = any>(): Promise<{ actor: ActorSubclass<T>; principal: string }> {
  const authClient = await AuthClient.create();
  // If not authenticated, trigger login
  const isAuthenticated = await authClient.isAuthenticated();
  if (!isAuthenticated) {
    await new Promise<void>((resolve, reject) => {
      authClient.login({
        identityProvider: import.meta.env.VITE_II_URL || 'https://identity.ic0.app',
        onSuccess: () => resolve(),
        onError: (e: unknown) => reject(e),
      });
    });
  }
  const identity = authClient.getIdentity();
  const { actor } = await createHttpActor<T>(identity);
  const principal = identity.getPrincipal().toText();
  return { actor, principal };
}

export async function loginWithPlug<T = any>(): Promise<{ actor: ActorSubclass<T>; principal?: string }> {
  const plug = window.ic?.plug;
  if (!plug) throw new Error('Plug wallet not found. Install the Plug extension.');
  const canisterId = getCanisterId();
  const host = getHost();
  const connected = (await plug.isConnected().catch(() => false)) || false;
  if (!connected) {
    const ok = await plug.requestConnect({ whitelist: [canisterId], host }).catch(() => false);
    if (!ok) throw new Error('User rejected Plug connection');
  }
  const actor = await plug.createActor<T>({ canisterId, interfaceFactory: twinvestIdlFactory as any });
  const principal: string | undefined = plug.sessionManager?.sessionData?.principalId;
  return { actor, principal };
}

// Inline IDL until dfx generates declarations
// Keep in sync with src/twinvest/twinvest_backend.did
export const idlFactory = twinvestIdlFactory;

