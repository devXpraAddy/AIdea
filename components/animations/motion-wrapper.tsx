"use client";

import { motion } from "framer-motion";
import {
  fadeInVariants,
  scaleInVariants,
  slideUpVariants,
} from "@/lib/animations";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide" | "scale";
}

export const MotionWrapper = ({
  children,
  className,
  variant = "fade",
}: MotionWrapperProps) => {
  const variants = {
    fade: fadeInVariants,
    slide: slideUpVariants,
    scale: scaleInVariants,
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
};
