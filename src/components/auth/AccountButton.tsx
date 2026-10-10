"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function AccountButton() {
  const { user, loading, accountsEnabled, openAuth, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  if (loading) return <span className="nav-account-skel" aria-hidden="true" />;

  if (!user) {
    if (!accountsEnabled) {
      return (
        <button className="btn nav-auth" type="button" disabled title="Accounts coming soon">
          SIGN IN
        </button>
      );
    }
    return (
      <button className="btn nav-auth" type="button" onClick={() => openAuth("signup")}>
        SIGN IN
      </button>
    );
  }

  const initial = (user.name || user.email).trim().charAt(0).toUpperCase() || "K";
  return (
    <div className="nav-account" ref={wrapRef}>
      <button
        type="button"
        className="nav-account-btn"
        aria-expanded={menuOpen}
        aria-label="Account menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="nav-avatar" aria-hidden="true">
          {initial}
        </span>
        <span className="nav-account-name">{user.name || user.email}</span>
      </button>
      {menuOpen && (
        <div className="nav-account-menu" role="menu">
          <div className="nav-account-email">{user.email}</div>
          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setMenuOpen(false);
              await signOut();
            }}
          >
            SIGN OUT
          </button>
        </div>
      )}
    </div>
  );
}
