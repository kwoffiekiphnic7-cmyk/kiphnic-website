"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // `.in` = revealed. We only ever go false → true, never back to false,
  // so a remount/re-fire can never make visible content disappear again.
  const [shown, setShown] = useState(false);
  // `.pre` = pre-hidden, applied ONLY to blocks that start fully off-screen
  // (invisible to the user anyway) so they can animate in on scroll.
  const [pre, setPre] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      setPre(false);
      setShown(true);
    };

    // No IntersectionObserver (or user prefers reduced motion): leave the
    // content at its default visible state — never hide it.
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    // If the block is already in the viewport on mount, reveal it immediately
    // with NO pre-hide — above-the-fold content never pops or flickers.
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh && rect.bottom > 0) {
      show();
      return;
    }

    // Fully off-screen: pre-hide it (user can't see it) and reveal on scroll.
    setPre(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show();
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [
    "reveal",
    pre && !shown ? "pre" : "",
    shown ? "in" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={cls} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
