import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export default function ContactTeaser() {
  return (
    <section id="contact" className="contact">
      <div className="container contact-grid">
        <Reveal>
          <div>
            <div className="eyebrow">07 — CONTACT</div>
            <SectionHeader
              eyebrow=""
              title={
                <>
                  HAVE AN IDEA?
                  <br />
                  <span>LET&apos;S BUILD IT.</span>
                </>
              }
              body="Tell us what you're thinking. Kiphnic is remote-first and can collaborate from anywhere."
            />
            <div className="contact-info">
              <div>
                <strong>PHONE</strong>
                <br />
                {siteConfig.phones.join(" · ")}
              </div>
              <div>
                <strong>EMAIL</strong>
                <br />
                {siteConfig.email}
              </div>
              <div>
                <strong>WHATSAPP</strong>
                <br />
                <Link className="inline-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
                  {siteConfig.whatsapp} →
                </Link>
              </div>
            </div>
            <div className="actions-row">
              <Link className="view-all-link" href="/contact">
                GO TO CONTACT PAGE →
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
