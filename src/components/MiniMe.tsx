"use client";

import { useEffect, useRef, useState } from "react";

type Route = string;

// Idle position (viewport px) — must match the inline style written at mount.
const START = { x: 40, y: 82 };
const START_ROT = Math.sin(START.x * 0.05) * 8;

export default function MiniMe() {
  const [show, setShow] = useState(true);
  const [bubbleOn, setBubbleOn] = useState(true);

  // Position/target/hover live in refs and are applied with direct DOM writes
  // so the follow-loop never triggers React re-renders. (Previously this
  // called setState ~60×/s FOREVER — even with the mouse idle — churning
  // whole-page compositor repaints alongside the fixed blur layers.)
  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ ...START });
  const targetRef = useRef({ ...START });
  const hoveringRef = useRef(false);
  const routeRef = useRef<Route>("/");

  const bubble = "Hello I'm your future coach. Try the ✦ chat below.";
  const routes = ["/", "/services", "/ai", "/projects", "/about", "/contact"];

  function pickRoute(): Route {
    return routes[Math.floor(Math.random() * routes.length)];
  }

  useEffect(() => {
    routeRef.current = window.location.pathname;
  }, []);

  // Greet once on load, then tuck the bubble away so it doesn't nag.
  useEffect(() => {
    const id = setTimeout(() => setBubbleOn(false), 7000);
    return () => clearTimeout(id);
  }, []);

  // Follow the mouse (only on fine pointers) — also roams on touch / after page change
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (hoveringRef.current) return;
      // hide when hovering interactive controls so as not to cover them
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el && (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) {
        hoveringRef.current = true;
        return;
      }
      hoveringRef.current = false;
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      targetRef.current = { x: touch.clientX, y: touch.clientY };
      hoveringRef.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  // Roaming: pick a new route after ~3s pass, or after page change
  useEffect(() => {
    const id = setInterval(() => {
      const next = pickRoute();
      if (next !== routeRef.current) {
        routeRef.current = next;
        targetRef.current = { x: 30, y: 30 };
      }
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Mini-me follows with a smooth lerp animation. Position is written straight
  // to the DOM and only when it actually changed — an idle mascot does zero
  // per-frame work, so it can never force whole-page repaints/flicker.
  useEffect(() => {
    let raf = 0;
    let lastLeft = NaN;
    let lastTop = NaN;
    let lastRot = NaN;
    function loop() {
      const p = posRef.current;
      const t = targetRef.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) {
        p.x = t.x;
        p.y = t.y;
      } else {
        const step = 0.12 * dist;
        p.x += (dx / dist) * step;
        p.y += (dy / dist) * step;
      }
      const rot = hoveringRef.current ? 0 : Math.sin(p.x * 0.05) * 8;
      const left = p.x - 14;
      const top = p.y - 14;
      if (left !== lastLeft || top !== lastTop || rot !== lastRot) {
        const el = elRef.current;
        if (el) {
          el.style.left = `${left}px`;
          el.style.top = `${top}px`;
          el.style.transform = `rotate(${rot}deg)`;
        }
        lastLeft = left;
        lastTop = top;
        lastRot = rot;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!show) return null;

  return (
    <div
      ref={elRef}
      className={`minime${show ? " show" : ""}${bubbleOn ? " bubble-on" : ""}`}
      style={{
        left: START.x - 14,
        top: START.y - 14,
        transform: `rotate(${START_ROT}deg)`,
        pointerEvents: "none",
        zIndex: 60,
        transition: "opacity 0.3s ease, transform 0.5s ease",
      }}
      role="img"
      aria-label="Mini-me — the site mascot who follows you around"
    >
      <div className="minime-ring" />
      <div className="minime-face" />
      <div className="minime-bubble">{bubble}</div>
    </div>
  );
}

