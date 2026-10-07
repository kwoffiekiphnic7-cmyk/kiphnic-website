import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import AiTerminal from "@/components/AiTerminal";

const points = [
  "Answer questions",
  "Help you code",
  "Generate ideas",
  "Research information",
];

export default function AiTeaser() {
  return (
    <section id="ai" className="ai">
      <div className="container ai-grid">
        <Reveal>
          <div>
            <div className="eyebrow">03 — KIPHNIC AI</div>
            <SectionHeader
              eyebrow=""
              title={
                <>
                  MEET <span>KIPHNIC AI.</span>
                </>
              }
              body="Intelligence designed to help you think, create, research, build and solve."
            />
            <ul className="checks">
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link className="btn" href="/ai">
              START CHAT →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <AiTerminal />
        </Reveal>
      </div>
    </section>
  );
}
