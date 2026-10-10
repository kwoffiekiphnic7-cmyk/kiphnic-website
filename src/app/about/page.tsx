import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import StatItem from "@/components/sections/StatItem";
import Vision from "@/components/sections/Vision";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/lib/site-config";

const timeline = [
  { year: "2023", title: "First Build", body: "Started with one developer and a conviction — that AI, software and creative tech can elevate how people live, work and play." },
  { year: "2024", title: "Kiphnic AI", body: "Launched Kiphnic AI — a conversational assistant that answers questions, helps you code and generates ideas, live on this site." },
  { year: "2025", title: "Company", body: "Kiphnic is now an AI-first technology company offering AI, software, web, mobile, games and digital systems." },
  { year: "2026", title: "Elevated", body: "Intelligence. Elevated. Building products, partnerships and the next generation of intelligent tools." },
];

const values = [
  { title: "INTELLIGENCE FIRST", body: "AI isn't a feature — it's the foundation of everything we build." },
  { title: "CRAFT OVER SHORTCUTS", body: "Clean engineering, thoughtful design, products that last." },
  { title: "POSSIBILITIES, NOT JUST FIXES", body: "We build technology that opens doors, not just patches problems." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="06 — ABOUT KIPHNIC"
        title={
          <>
            THE PERSON BEHIND <span>KIPHNIC.</span>
          </>
        }
        body="An AI-first technology company built around a simple belief: technology should create possibilities."
        bg="/images/bg-about.webp"
        bgAlt="Kiphnic about background"
      />
      <section>
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
              <div className="eyebrow">OUR STORY</div>
              <h2>
                BUILT ON <span>BELIEF.</span>
              </h2>
              <p className="body-text">
                Kiphnic started with one developer and a conviction — that artificial
                intelligence, software and creative technology can elevate how people
                live, work and play. Every product we ship carries that conviction.
              </p>
              <blockquote className="founder-quote">
                “I believe technology should not simply solve today&apos;s problems —
                it should create tomorrow&apos;s possibilities.”
                <cite>
                  — {siteConfig.founder}, {siteConfig.founderRole}
                </cite>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="stats-band">
        <div className="container">
          <div className="stats-row stats-row-4">
            <StatItem value="6+" label="Service areas" />
            <StatItem value="AI" label="First approach" />
            <StatItem value="3" label="Build phases: imagine, build, elevate" />
            <StatItem value="24/7" label="AI assistance" />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Reveal>
            <div className="eyebrow">WHAT WE STAND FOR</div>
            <h2>
              VALUES THAT <span>GUIDE US.</span>
            </h2>
          </Reveal>
          <div className="cards">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <article className="card">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="process" style={{ background: "linear-gradient(180deg,var(--bg-3),var(--bg-4))" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow">OUR TIMELINE</div>
            <h2>FROM FIRST IDEA TO <span>ELEVATED.</span></h2>
            <div className="steps steps-4">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 70}>
                  <div className="step">
                    <b>{t.year}</b>
                    <p>{t.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <Vision />
      <CtaBanner />
    </main>
  );
}
