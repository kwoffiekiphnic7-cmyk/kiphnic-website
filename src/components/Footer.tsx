import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer>
      <div className="container foot">
        <div className="foot-brand">
          <strong>{siteConfig.name}</strong>
          <span>{siteConfig.tagline}</span>
        </div>
        <div className="foot-links">
          {siteConfig.nav.map((n) => (
            <Link key={n.href + n.label} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <span className="foot-line">{siteConfig.footerLine}</span>
        <span>© 2026 Kiphnic. All rights reserved.</span>
      </div>
    </footer>
  );
}
