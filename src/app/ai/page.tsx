import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import AiTerminal from "@/components/AiTerminal";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Kiphnic AI",
  description: "Meet Kiphnic AI — intelligence designed to help you think, create, research, build and solve.",
  openGraph: {
    title: "Kiphnic AI — Kiphnic",
    description: "Meet Kiphnic AI — intelligence designed to help you think, create, research, build and solve.",
  },
};

const features = [
  { title: "ANSWER QUESTIONS", body: "Clear, direct answers across tech, business and everyday topics." },
  { title: "HELP YOU CODE", body: "Debug, explain and scaffold — from snippets to full flows." },
  { title: "GENERATE IDEAS", body: "Names, concepts, content angles and product directions." },
  { title: "RESEARCH INFORMATION", body: "Summaries and pointers that save hours of digging." },
];

const useCases = [
  { title: "BUILDERS", body: "Prototype faster — validate ideas before writing production code." },
  { title: "CREATORS", body: "Beat blank-page syndrome with drafts, outlines and angles." },
  { title: "STUDENTS", body: "Learn by asking — get concepts explained in plain language." },
  { title: "BUSINESS", body: "Draft proposals, emails and plans in minutes, not days." },
];

export default function AiPage() {
  return (
    <main>
      <PageHero
        eyebrow="03 — KIPHNIC AI"
        title={
          <>
            MEET <span>KIPHNIC AI.</span>
          </>
        }
        body="Intelligence designed to help you think, create, research, build and solve — live on this site."
        bg="/images/bg-ai.webp"
        bgAlt="Kiphnic AI background"
      />
      <section>
        <div className="container ai-grid">
          <Reveal>
            <div>
              <ul className="checks">
                <li>Answer questions</li>
                <li>Help you code</li>
                <li>Generate ideas</li>
                <li>Research information</li>
              </ul>
              <p className="body-text" style={{ marginTop: 18 }}>
                Try it below — pick a quick reply or type anything and Kiphnic AI
                replies instantly. Your history is saved on this device, and the
                floating ✦ button opens this chat from any page.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AiTerminal />
          </Reveal>
        </div>
      </section>
      <section>
        <div className="container">
          <Reveal>
            <div className="eyebrow">WHAT IT DOES</div>
            <h2>
              ONE AI. <span>MANY JOBS.</span>
            </h2>
          </Reveal>
          <div className="cards cards-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <article className="card">
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <Reveal>
            <div className="eyebrow">WHO IT HELPS</div>
            <h2>
              BUILT FOR <span>EVERYONE.</span>
            </h2>
          </Reveal>
          <div className="cards cards-4">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 70}>
                <article className="card">
                  <h3>{u.title}</h3>
                  <p>{u.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}

