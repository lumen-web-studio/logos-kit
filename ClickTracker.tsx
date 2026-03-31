"use client";
import { useEffect } from "react";
import { track } from "./analytics";

export default function ClickTracker(): null {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-track]");
      if (!el) return;
      track.ctaClick(el.getAttribute("data-track")!);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
