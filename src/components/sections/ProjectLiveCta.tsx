"use client";

import Link from "next/link";

import { useAuth } from "@/components/auth/AuthProvider";

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export default function ProjectLiveCta({
  href,
  label,
  external,
  requiresAuth,
}: {
  href: string;
  label: string;
  external?: boolean;
  requiresAuth?: boolean;
}) {
  const { user, loading, openAuth } = useAuth();
  const openExternal = Boolean(external) || isExternal(href);
  const needsAuth = Boolean(requiresAuth) && !loading && !user;

  if (needsAuth) {
    return (
      <button className="btn" type="button" onClick={() => openAuth("signup")}>
        SIGN IN TO PLAY →
      </button>
    );
  }

  if (openExternal) {
    return (
      <a className="btn" href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link className="btn" href={href}>
      {label}
    </Link>
  );
}
