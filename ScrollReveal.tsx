"use client";

import { useEffect, useRef } from "react";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  threshold?: number;
};

export default function ScrollReveal({
  children,
  className,
  threshold = 0.12,
}: Props): ReactElement {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const cls = className ? `reveal-group ${className}` : "reveal-group";
  return (
    <div ref={ref} className={cls}>
      {children}
    </div>
  );
}
