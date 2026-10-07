import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="hero hero-with-bg" id="home">
      <Image
        src="/images/hero-bg.png"
        alt="Kiphnic K orb held by robotic hands"
        fill
        priority
        className="hero-bg"
        sizes="100vw"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">— KIPHNIC</div>
            <h1>
              WE BUILD
              <br />
              WHAT&apos;S <span>NEXT.</span>
            </h1>
            <p className="lead">
              Kiphnic is an AI-first technology company creating intelligent
              digital experiences, software, websites, applications and products
              for the future.
            </p>
            <div className="actions">
              <Link className="btn" href="/services">
                EXPLORE KIPHNIC →
              </Link>
              <Link className="btn alt" href="/contact">
                START A PROJECT →
              </Link>
            </div>
            <div className="tags">
              {siteConfig.heroTags.map((t, i) => (
                <span key={t}>
                  {i > 0 ? <span>•&nbsp;&nbsp;</span> : null}
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-art hero-art-fallback">
            <div className="orb">
              <div className="logo-core">K</div>
            </div>
            <div className="city" />
          </div>
        </div>
      </div>
    </section>
  );
}
