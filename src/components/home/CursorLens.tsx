"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Desktop-only lens cursor on interactive elements marked with data-cursor-lens. */
export function CursorLens() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target;
      if (!(target instanceof Element)) {
        setVisible(false);
        return;
      }
      setVisible(Boolean(target.closest("[data-cursor-lens], a, button, summary")));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9999] hidden mix-blend-difference md:block"
      style={{
        left: pos.x,
        top: pos.y,
        width: 44,
        height: 44,
        marginLeft: -22,
        marginTop: -22,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.55)",
        backdropFilter: "blur(2px) invert(0.12)",
        WebkitBackdropFilter: "blur(2px) invert(0.12)",
        transition: "opacity 0.15s ease",
      }}
    />
  );
}
