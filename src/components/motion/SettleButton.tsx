"use client";

import {
  forwardRef,
  useCallback,
  type MouseEvent,
} from "react";
import {
  motion,
  useAnimation,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";

type SettleButtonProps = Omit<HTMLMotionProps<"button">, "onClick"> & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/** Chip/card button with a brief scale-up-then-settle on click. */
export const SettleButton = forwardRef<HTMLButtonElement, SettleButtonProps>(
  function SettleButton({ onClick, className, children, ...props }, ref) {
    const reduceMotion = useReducedMotion();
    const controls = useAnimation();

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!reduceMotion) {
          void controls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
          });
        }
      },
      [controls, onClick, reduceMotion],
    );

    return (
      <motion.button
        ref={ref}
        type="button"
        className={className}
        onClick={handleClick}
        animate={controls}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

SettleButton.displayName = "SettleButton";
