"use client";

import { useEffect, useRef } from "react";

export default function BodyScrollClass() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const update = (isScrolled: boolean) => {
      document.body.classList.toggle("scroll", isScrolled);
    };

    update(window.scrollY > 12);

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      update(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-3 left-0 h-px w-px opacity-0"
    />
  );
}
