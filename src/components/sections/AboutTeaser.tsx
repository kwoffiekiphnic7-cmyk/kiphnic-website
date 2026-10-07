import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/site-config";

const traits = [
  { icon: "⌂", title: "Remote-First", desc: "Work from anywhere" },
  { icon: "⚙", title: "Innovation-Driven", desc: "Always exploring what's next" },
  { icon: "AI", title: "AI-First", desc: "Intelligence at the core" },
];

export default function AboutTeaser() {
  return (
    <section id="about">
      <div className="container about-grid">
        <Reveal>
          <div className="portrait portrait-with-photo">
            <Image
              src="/founder/founder.webp"
              alt="Mr. Joseph — Founder / Developer of Kiphnic"
              width={420}
              height={560}
              className="portrait-photo"
              sizes="(max-width: 850px) 100vw, 400px"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div className="eyebrow">06 — ABOUT KIPHNIC</div>
            <SectionHeader
              eyebrow=""
              title={
                <>
                  THE PERSON BEHIND <span>KIPHNIC.</span>
                </>
              }
              body="Kiphnic is being built around a simple belief: technology should create possibilities, not just solve problems."
            />
            <p className="founder-line">
              <strong>{siteConfig.founder}</strong>
              <br />
              {siteConfig.founderRole}
            </p>
            <div className="stats-row">
              <div className="stat">
                <b>6+</b>
                <span>Service areas</span>
              </div>
              <div className="stat">
                <b>AI</b>
                <span>First approach</span>
              </div>
              <div className="stat">
                <b>24/7</b>
                <span>AI assistance</span>
              </div>
            </div>
            <div className="founder-traits">
              {traits.map((t) => (
                <div className="trait" key={t.title}>
                  <div className="ic">{t.icon}</div>
                  <div>
                    <div className="t-title">{t.title}</div>
                    <div className="t-desc">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="actions-row">
              <Link className="btn alt" href="/about">
                MORE ABOUT US →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
