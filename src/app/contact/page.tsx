import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";
import { XIcon, LinkedinIcon, GithubIcon, InstagramIcon, SnapchatIcon } from "@/components/ui/SocialIcon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have an idea? Let's build it — contact Kiphnic.",
  openGraph: {
    title: "Contact — Kiphnic",
    description: "Have an idea? Let's build it — contact Kiphnic.",
  },
};

export default function ContactPage() {
  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    X: XIcon,
    LinkedIn: LinkedinIcon,
    GitHub: GithubIcon,
    Instagram: InstagramIcon,
    Snapchat: SnapchatIcon,
  };

  return (
    <main>
      <PageHero
        eyebrow="07 — CONTACT"
        title={
          <>
            HAVE AN IDEA? <span>LET&apos;S BUILD IT.</span>
          </>
        }
        body="Tell us what you're thinking. Kiphnic is remote-first and can collaborate from anywhere."
        bg="/images/bg-contact.webp"
        bgAlt="Kiphnic contact background"
      />
      <section>
        <div className="container contact-grid">
          <Reveal>
            <div>
              <div className="contact-info contact-info-full">
                <div>
                  <strong>PHONE</strong>
                  <br />
                  {siteConfig.phones.join(" · ")}
                </div>
                <div>
                  <strong>EMAIL</strong>
                  <br />
                  <Link className="inline-link" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </Link>
                </div>
                <div>
                  <strong>WHATSAPP</strong>
                  <br />
                  <Link className="inline-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                    Chat on WhatsApp →
                  </Link>
                  <br />
                  <span className="muted">{siteConfig.whatsapp}</span>
                </div>
                <div className="socials">
                  <strong>FOLLOW</strong>
                  <div className="socials-row">
                    {siteConfig.socials.map((s: { label: string; href: string }) => {
                      const label = s.label;
                      const Icon = socialIcons[label];
                      return (
                        <Link
                          key={s.label}
                          className="social-chip"
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="h-4 w-4" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="actions-row">
                <Link className="btn alt" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                  MESSAGE ON WHATSAPP →
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
