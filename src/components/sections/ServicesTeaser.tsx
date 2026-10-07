import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/sections/ServiceCard";
import { services } from "@/data/services";

export default function ServicesTeaser() {
  return (
    <section id="services">
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="02 — WHAT WE BUILD"
            title={
              <>
                TECHNOLOGY.
                <br />
                <span>INTELLIGENCE.</span>
                <br />
                INNOVATION.
              </>
            }
            body="We combine artificial intelligence, software engineering and creative technology to turn ambitious ideas into useful digital products."
          />
        </Reveal>
        <div className="cards">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 60, 240)}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="view-all">
            <Link className="view-all-link" href="/services">
              VIEW ALL SERVICES →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
