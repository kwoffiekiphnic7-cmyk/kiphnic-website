import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  InstagramIcon,
  LinkedinIcon,
  SnapchatIcon,
} from "@/components/ui/SocialIcon";

/** Account links shown in the footer (LinkedIn, Snapchat, Instagram). */
const footerSocials = siteConfig.socials.filter((s) =>
  (["LinkedIn", "Snapchat", "Instagram"] as string[]).includes(s.label)
);

const footerSocialIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  LinkedIn: LinkedinIcon,
  Snapchat: SnapchatIcon,
  Instagram: InstagramIcon,
};

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
        <div className="foot-socials">
          <span className="foot-social-title">FOLLOW US</span>
          <div className="foot-social">
            {footerSocials.map((s) => {
              const label = s.label;
              const Icon = footerSocialIcons[label];
              return (
                <Link
                  key={s.label}
                  className="social-chip"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon />
                  <span>{label.toUpperCase()}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <span className="foot-line">{siteConfig.footerLine}</span>
        <span>© 2026 Kiphnic. All rights reserved.</span>
      </div>
    </footer>
  );
}
