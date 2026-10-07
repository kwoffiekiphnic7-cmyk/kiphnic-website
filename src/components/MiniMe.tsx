"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Route = string;

export default function MiniMe() {
  const [show, setShow] = useState(true);
  const [bubbleOn, setBubbleOn] = useState(true);
  const [pos, setPos] = useState({ x: 40, y: 82 });
  const [target, setTarget] = useState({ x: 40, y: 82 });
  const [route, setRoute] = useState<Route>("/");
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ pos, target });

  const bubble = "Hello I'm your future coach. Try the ✦ chat below.";
  const routes = ["/", "/services", "/ai", "/projects", "/about", "/contact"];

  function pickRoute(): Route {
    return routes[Math.floor(Math.random() * routes.length)];
  }

  useEffect(() => {
    setRoute(window.location.pathname);
  }, []);

  // Greet once on load, then tuck the bubble away so it doesn't nag.
  useEffect(() => {
    const id = setTimeout(() => setBubbleOn(false), 7000);
    return () => clearTimeout(id);
  }, []);

  // Follow the mouse (only on fine pointers) — also roams on touch / after page change
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (hovering) return;
      // hide when hovering interactive controls so as not to cover them
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el && (el.tagName === "BUTTON" || el.tagName === "A" || el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) {
        setHovering(true);
        return;
      }
      setHovering(false);
      setTarget({ x: e.clientX, y: e.clientY });
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      setTarget({ x: touch.clientX, y: touch.clientY });
      setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, [hovering]);

  // Roaming: pick a new route after ~3s pass, or after page change
  useEffect(() => {
    const id = setInterval(() => {
      const next = pickRoute();
      if (next !== route) {
        setRoute(next);
        setTarget({ x: 30, y: 30 });
      }
    }, 4000);
    return () => clearInterval(id);
  }, [route]);

  // Mini-me follows with a smooth lerp animation
  useEffect(() => {
    function loop() {
      const sx = stateRef.current.pos.x;
      const sy = stateRef.current.pos.y;
      const tx = stateRef.current.target.x;
      const ty = stateRef.current.target.y;
      const dx = tx - sx;
      const dy = ty - sy;
      const dist = Math.hypot(dx, dy);
      if (dist < 1) {
        stateRef.current.pos.x = tx;
        stateRef.current.pos.y = ty;
        setPos({ x: tx, y: ty });
      } else {
        const step = 0.12 * dist;
        stateRef.current.pos.x += (dx / dist) * step;
        stateRef.current.pos.y += (dy / dist) * step;
        setPos({ x: stateRef.current.pos.x, y: stateRef.current.pos.y });
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!show) return null;

  const m = pos;
  return (
    <div
      className={`minime${show ? " show" : ""}${bubbleOn ? " bubble-on" : ""}`}
      style={{
        left: m.x - 14,
        top: m.y - 14,
        transform: `rotate(${hovering ? 0 : (Math.sin(m.x * 0.05) * 8)}deg)`,
        pointerEvents: "none",
        zIndex: 60,
        transition: "opacity 0.3s ease, transform 0.5s ease",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      role="img"
      aria-label="Mini-me — the site mascot who follows you around"
    >
      <div className="minime-ring" />
      <div className="minime-face" />
      <div className="minime-bubble">{bubble}</div>
    </div>
  );
}

