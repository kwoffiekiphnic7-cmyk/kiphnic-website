export const siteConfig = {
  name: "KIPHNIC",
  // Current canonical origin. Overridable via NEXT_PUBLIC_SITE_URL when a custom domain arrives.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiphnic-website.vercel.app",
  tagline: "INTELLIGENCE. ELEVATED.",
  description:
    "Kiphnic is an AI-first technology company building intelligent digital experiences, software and products.",
  phones: ["0200823079", "0538616119"],
  email: "kiphnic7@gmail.com",
  whatsapp: "0538616119",
  whatsappUrl: "https://wa.me/233538616119",
  founder: "Mr. Joseph",
  founderRole: "Founder / Developer",
  nav: [
    { label: "HOME", href: "/" },
    { label: "SERVICES", href: "/services" },
    { label: "AI", href: "/ai" },
    { label: "PROJECTS", href: "/projects" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ],
  heroTags: ["AI", "SOFTWARE", "WEB", "MOBILE", "GAMES", "DIGITAL SYSTEMS"],
  socials: [
    { label: "X", href: "https://x.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Snapchat", href: "https://snapchat.com/add/" },
  ],
  footerLine: "Build the future. Together.",
} as const;

export type SiteConfig = typeof siteConfig;
