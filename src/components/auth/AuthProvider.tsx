"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AuthModal from "@/components/auth/AuthModal";

export type PublicUser = { email: string; name: string };

export type AuthMode = "signin" | "signup";

type AuthContextValue = {
  user: PublicUser | null;
  loading: boolean;
  /** Accounts backend availability (false when KV env is not configured). */
  accountsEnabled: boolean;
  openAuth: (mode?: AuthMode) => void;
  closeAuth: () => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accountsEnabled, setAccountsEnabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>("signup");

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data?.user ?? null);
      setAccountsEnabled(true);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const openAuth = useCallback((mode: AuthMode = "signup") => {
    setModalMode(mode);
    setModalOpen(true);
  }, []);

  const closeAuth = useCallback(() => setModalOpen(false), []);

  const signOut = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore — clear local state regardless */
    }
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, accountsEnabled, openAuth, closeAuth, signOut, refresh }),
    [user, loading, accountsEnabled, openAuth, closeAuth, signOut, refresh]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        open={modalOpen}
        mode={modalMode}
        onClose={closeAuth}
        onModeChange={setModalMode}
        onAuthed={async () => {
          await refresh();
          setModalOpen(false);
        }}
      />
    </AuthContext.Provider>
  );
}
