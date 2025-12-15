"use client";

import React, { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

// Simplified smooth scroll - just pass through children
// The CSS scroll-behavior: smooth in globals.css handles the smooth scrolling
export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  return <>{children}</>;
};
