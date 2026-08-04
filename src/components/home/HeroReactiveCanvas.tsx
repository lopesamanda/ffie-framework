"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type HeroReactiveCanvasProps = {
  className?: string;
};

/** Soft mesh gradient that drifts gently with pointer position in the hero. */
export function HeroReactiveCanvas({ className = "" }: HeroReactiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let pointer = { x: 0.5, y: 0.4 };
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      if (!finePointer) return;
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const t = frame * 0.004;
      const px = pointer.x * width;
      const py = pointer.y * height;

      const blobs = [
        {
          x: width * (0.22 + Math.sin(t) * 0.03) + (px - width * 0.5) * 0.06,
          y: height * (0.28 + Math.cos(t * 0.9) * 0.04) + (py - height * 0.5) * 0.05,
          r: Math.min(width, height) * 0.34,
          color: "rgba(110, 82, 196, 0.09)",
        },
        {
          x: width * (0.72 + Math.cos(t * 0.8) * 0.03) - (px - width * 0.5) * 0.04,
          y: height * (0.38 + Math.sin(t * 1.1) * 0.03) - (py - height * 0.5) * 0.04,
          r: Math.min(width, height) * 0.28,
          color: "rgba(200, 71, 42, 0.06)",
        },
        {
          x: width * (0.48 + Math.sin(t * 0.7) * 0.02),
          y: height * (0.62 + Math.cos(t) * 0.03) + (py - height * 0.5) * 0.03,
          r: Math.min(width, height) * 0.32,
          color: "rgba(26, 40, 112, 0.07)",
        },
      ];

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame += 1;
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [finePointer, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
