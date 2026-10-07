"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/layout/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="container navin">
        <Link className="brand" href="/" aria-label="Kiphnic home">
          <Logo />
        </Link>
        <div className="links">
          {siteConfig.nav.map((n) => (
            <Link key={n.href + n.label} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <Link className="btn nav-cta" href="/contact">
          GET STARTED →
        </Link>
        <button
          className="hamburger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div className="container">
        <div className={`mobile-menu${open ? " open" : ""}`}>
          {siteConfig.nav.map((n) => (
            <Link key={n.href + n.label} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
