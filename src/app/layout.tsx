import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatLauncher from "@/components/chat/ChatLauncher";
import MiniMe from "@/components/MiniMe";
import AuthProvider from "@/components/auth/AuthProvider";
import { siteConfig } from "@/lib/site-config";

const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  title: {
    default: "Kiphnic — Intelligence. Elevated.",
    template: "%s — Kiphnic",
  },
  description: siteConfig.description,
  metadataBase: new URL(siteUrl),
  // Self-referencing canonical per page (resolves against metadataBase).
  alternates: { canonical: "./" },
  openGraph: {
    title: "Kiphnic — Intelligence. Elevated.",
    description: siteConfig.description,
    url: siteUrl,
    siteName: "Kiphnic",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Kiphnic — Intelligence. Elevated." }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiphnic — Intelligence. Elevated.",
    description: siteConfig.description,
    images: ["/og-cover.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#03070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <AuthProvider>
          <Navbar />
          <div id="main">{children}</div>
          <Footer />
          <MiniMe />
          <ChatLauncher />
        </AuthProvider>
      </body>
    </html>
  );
}
