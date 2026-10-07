import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "01 — IMAGINE", body: "Every breakthrough begins with an idea. We help you see what's possible." },
  { n: "02 — BUILD", body: "We turn ideas into working products with modern engineering and AI." },
  { n: "03 — ELEVATE", body: "We refine, scale and push beyond expectations — intelligence, elevated." },
];

export default function Vision() {
  return (
    <section className="vision">
      <div className="container vision-grid">
        <Reveal>
          <div>
            <div className="eyebrow">05 — OUR VISION</div>
            <SectionHeader
              eyebrow=""
              title={
                <>
                  THE FUTURE ISN&apos;T SOMETHING WE WAIT FOR. <span>IT&apos;S SOMETHING WE BUILD.</span>
                </>
              }
              body="Kiphnic exists to create technology that opens possibilities — not just tools that solve today's problems, but systems that shape tomorrow."
            />
          </div>
        </Reveal>
        <div className="steps">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="step">
                <b>{s.n}</b>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
