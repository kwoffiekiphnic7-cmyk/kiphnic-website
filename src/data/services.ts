export type Service = { icon: string; title: string; body: string; id: string; features: string[] };

export const services: Service[] = [
  {
    icon: "◈",
    id: "ai",
    title: "AI DEVELOPMENT",
    body: "Intelligent systems designed to automate, analyze and assist — from custom chatbots to full AI assistants like Kiphnic AI.",
    features: ["Custom AI assistants & chatbots", "Process automation", "Data analysis & insights"],
  },
  {
    icon: "</>",
    id: "software",
    title: "SOFTWARE DEVELOPMENT",
    body: "Modern applications built for real-world problems — desktop tools, internal systems, and business software.",
    features: ["Custom business systems", "Desktop & cross-platform apps", "API & integration work"],
  },
  {
    icon: "◎",
    id: "web",
    title: "WEB DEVELOPMENT",
    body: "High-performance websites and digital platforms, from marketing sites to full web applications.",
    features: ["Marketing & portfolio sites", "Web apps & dashboards", "E-commerce"],
  },
  {
    icon: "▣",
    id: "mobile",
    title: "MOBILE DEVELOPMENT",
    body: "Powerful experiences designed for mobile users, across iOS, Android, or cross-platform frameworks.",
    features: ["iOS & Android apps", "Cross-platform (Flutter)", "Companion apps for existing products"],
  },
  {
    icon: "⌁",
    id: "game",
    title: "GAME DEVELOPMENT",
    body: "Interactive worlds powered by creativity and technology — from prototypes to polished releases.",
    features: ["2D & 3D game prototypes", "Interactive experiences", "Game systems & mechanics"],
  },
  {
    icon: "◇",
    id: "digital",
    title: "DIGITAL SOLUTIONS",
    body: "Custom technology built around your business — tools, systems and workflows designed specifically for you.",
    features: ["Workflow & process tools", "Custom internal platforms", "Ongoing technical partnership"],
  },
];
