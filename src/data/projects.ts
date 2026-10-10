export type Project = {
  index: string;
  slug: string;
  title: string;
  body: string;
  image?: string;
  href?: string;
  /** Opens in a new tab (external site). */
  external?: boolean;
  /** Requires a signed-in account before the link works. */
  requiresAuth?: boolean;
  tag?: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "kiphnic-ai",
    title: "KIPHNIC AI",
    tag: "AI PLATFORM",
    body: "AI assistant platform — natural conversation, code help, research and creative support. Live on this site with streaming chat, quick replies and on-device history.",
    image: "/projects/kiphnic-ai.webp",
    href: "/ai",
    gallery: ["/projects/kiphnic-ai.webp", "/projects/kiphnic-ai-2.webp"],
  },
  {
    index: "02",
    slug: "brightlingsea-academy",
    title: "BRIGHTLINGSEA ACADEMY",
    tag: "WEBSITE",
    body: "School website — admissions, news and academic life in one modern platform.",
    image: "/projects/brightlingsea.webp",
    gallery: ["/projects/brightlingsea.webp", "/projects/brightlingsea-2.webp"],
  },
  {
    index: "03",
    slug: "landmarket",
    title: "LANDMARKET",
    tag: "WEBSITE",
    body: "Property marketplace website — browse, list and connect around land and homes.",
    image: "/projects/landmarket.webp",
    gallery: ["/projects/landmarket.webp", "/projects/landmarket-2.webp"],
  },
  {
    index: "04",
    slug: "shalom-baptist-church",
    title: "SHALOM BAPTIST CHURCH",
    tag: "WEBSITE",
    body: "Church website — services, community life and announcements online.",
    image: "/projects/shalom.webp",
    gallery: ["/projects/shalom.webp", "/projects/shalom-2.webp"],
  },
  {
    index: "05",
    slug: "nexus-glasses",
    title: "NEXUS GLASSES",
    tag: "PRODUCT CONCEPT",
    body: "Eyewear product concept — smart shopping experience for modern frames.",
    image: "/projects/nexus.webp",
    gallery: ["/projects/nexus.webp", "/projects/nexus-2.webp", "/projects/nexus-3.webp"],
  },
  {
    index: "06",
    slug: "canvas-dodger",
    title: "CANVAS DODGER",
    tag: "GAME",
    body: "2D arcade game — dodge, survive and chase the high score. Free to play in your browser — create an account to jump in.",
    image: "/projects/canvas-dodger.webp",
    href: "https://canvasdodger.github.io/#",
    external: true,
    requiresAuth: true,
    gallery: ["/projects/canvas-dodger.webp", "/projects/canvas-dodger-2.webp"],
  },
  {
    index: "07",
    slug: "fantasy-realm",
    title: "FANTASY REALM",
    tag: "GAME",
    body: "Fantasy game world — exploration, quests and open-world mechanics.",
    image: "/projects/fantasy-realm.webp",
    gallery: [
      "/projects/fantasy-realm.webp",
      "/projects/fantasy-realm-2.webp",
      "/projects/fantasy-realm-3.webp",
    ],
  },
];
