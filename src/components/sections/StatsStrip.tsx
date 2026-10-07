import { siteConfig } from "@/lib/site-config";

export default function StatsStrip() {
  return (
    <section className="stats-band">
      <div className="container">
        <div className="stats-row stats-row-4">
          <div className="stat">
            <b>6+</b>
            <span>Service areas</span>
          </div>
          <div className="stat">
            <b>AI</b>
            <span>First approach</span>
          </div>
          <div className="stat">
            <b>3</b>
            <span>Build phases: imagine, build, elevate</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>AI assistance</span>
          </div>
        </div>
      </div>
    </section>
  );
}
