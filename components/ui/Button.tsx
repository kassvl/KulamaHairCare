"use client";

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, HTMLMotionProps } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: ButtonProps) => {
  
  const variants = {
    primary: "bg-[#c9a962] text-[#0a0a0a] hover:bg-[#e8d5a3] font-semibold shadow-lg shadow-[#c9a962]/20",
    outline: "border border-[#c9a962]/30 text-[#c9a962] hover:bg-[#c9a962]/10 hover:border-[#c9a962]/50",
    ghost: "text-[#c9a962] hover:bg-[#c9a962]/10",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-full transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
