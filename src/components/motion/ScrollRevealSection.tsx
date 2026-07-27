"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type ScrollRevealSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
};

/** Soft fade + translate when a section enters the viewport. */
export function ScrollRevealSection({
  children,
  className = "",
  id,
  delay = 0,
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -8% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={
        reduceMotion || inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 22 }
      }
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
