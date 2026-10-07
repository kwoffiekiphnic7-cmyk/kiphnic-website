import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="container">
        <Reveal>
          <div className="cta-inner">
            <div className="eyebrow">READY WHEN YOU ARE</div>
            <h2>
              LET&apos;S BUILD <span>SOMETHING.</span>
            </h2>
            <p>From first sketch to launched product — Kiphnic turns bold ideas into intelligent digital products.</p>
            <div className="actions actions-center">
              <Link className="btn" href="/contact">
                START A PROJECT →
              </Link>
              <Link className="btn alt" href="/ai">
                TALK TO KIPHNIC AI →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
