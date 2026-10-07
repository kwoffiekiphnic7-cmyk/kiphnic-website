import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ServicesGrid from "@/components/ServicesGrid";
import CtaBanner from "@/components/sections/CtaBanner";
import ServiceCard from "@/components/sections/ServiceCard";

const services = [
  {
    icon: "AI",
    title: "AI PLATFORM",
    body: "Custom AI assistants, copilots and automation — chat, document QA and workflow agents trained on your product.",
    features: ["Conversational AI", "RAG & vector search", "Slack / Teams / Web", "Admin dashboard"],
  },
  {
    icon: "SOFTWARE",
    title: "SOFTWARE",
    body: "Web, desktop and cloud tools engineered for reliability — from first prototype to scaled production system.",
    features: ["Custom web apps", "Data pipelines", "API integration", "CI/CD & monitoring"],
  },
  {
    icon: "WEB",
    title: "WEB & MOBILE",
    body: "Sites and apps that feel native — fast, accessible and built to convert.",
    features: ["Next.js / React", "Mobile-first", "PWA", "Analytics & CRO"],
  },
  {
    icon: "GAME",
    title: "GAMES & DIGITAL SYSTEMS",
    body: "Interactive experiences, games and generative systems that push what the web can do.",
    features: ["2D / 3D", "Real-time", "Procedural content", "WebGL / canvas"],
  },
];

export const metadata: Metadata = {
  title: "Services",
  description: "AI development, software, web, mobile, games and digital solutions by Kiphnic.",
  openGraph: {
    title: "Services — Kiphnic",
    description: "AI development, software, web, mobile, games and digital solutions by Kiphnic.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="02 — WHAT WE BUILD"
        title={
          <>
            TECHNOLOGY. <span>INTELLIGENCE.</span> INNOVATION.
          </>
        }
        body="We combine artificial intelligence, software engineering and creative technology to turn ambitious ideas into useful digital products."
        bg="/images/bg-services.webp"
        bgAlt="Kiphnic services background"
      />
      <section>
        <div className="container">
          <Reveal>
            <ServicesGrid />
          </Reveal>
        </div>
      </section>
      <section className="process">
        <div className="container">
          <Reveal>
            <div className="eyebrow">HOW WE WORK</div>
            <h2>
              FROM IDEA TO <span>LAUNCH.</span>
            </h2>
            <div className="steps steps-4">
              {[
                { n: "01 — DISCOVER", body: "We dig into your goals, users and constraints." },
                { n: "02 — DESIGN", body: "We prototype fast and validate what matters." },
                { n: "03 — BUILD", body: "We engineer with modern stacks and AI leverage." },
                { n: "04 — GROW", body: "We launch, measure and keep improving." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 70}>
                  <div className="step">
                    <b>{s.n}</b>
                    <p>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="feature-card">
        <div className="container">
          <Reveal>
            <h2>WHAT'S INCLUDED</h2>
            <div className="cards" style={{ marginTop: 12 }}>
              {services.map((s) => (
                <ServiceCard key={s.title} service={s} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </main>
  );
}
