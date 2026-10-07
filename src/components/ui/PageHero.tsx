import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  body,
  cta,
  bg,
  bgAlt = "Kiphnic background",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  cta?: { label: string; href: string };
  bg?: string;
  bgAlt?: string;
}) {
  return (
    <section className={bg ? "page-hero page-hero-with-bg" : "page-hero"}>
      {bg ? (
        <>
          <Image
            src={bg}
            alt={bgAlt}
            fill
            priority
            className="page-hero-bg"
            sizes="100vw"
          />
          <div className="page-hero-shade" aria-hidden="true" />
        </>
      ) : null}
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="page-title">{title}</h1>
        {body ? <p className="lead">{body}</p> : null}
        {cta ? (
          <div className="actions" style={{ marginTop: 22 }}>
            <Link className="btn" href={cta.href}>
              {cta.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
