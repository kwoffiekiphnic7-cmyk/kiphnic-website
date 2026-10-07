"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${title} — screenshot ${active + 1}`}
          width={1280}
          height={760}
          sizes="(max-width: 850px) 100vw, 800px"
          className="project-shot"
        />
      </div>
      {images.length > 1 ? (
        <div className="gallery-thumbs" role="tablist" aria-label={`${title} screenshots`}>
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`View screenshot ${i + 1}`}
              className={i === active ? "gallery-thumb active" : "gallery-thumb"}
              onClick={() => setActive(i)}
            >
              <Image src={src} alt="" width={240} height={140} sizes="240px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}