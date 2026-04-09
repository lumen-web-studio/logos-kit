"use client";
import { useEffect } from "react";
import { track } from "./analytics";

const SOCIAL_PLATFORMS = [
  "instagram",
  "facebook",
  "twitter",
  "x.com",
  "linkedin",
  "tiktok",
  "youtube",
  "youtu.be",
] as const;

function extractPlatform(href: string): string {
  for (const platform of SOCIAL_PLATFORMS) {
    if (href.includes(platform)) {
      // Normalize: x.com → twitter, youtu.be → youtube
      if (platform === "x.com") return "twitter";
      if (platform === "youtu.be") return "youtube";
      return platform;
    }
  }
  return "social";
}

export default function ClickTracker(): null {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-track]");
      if (!el) return;

      const label = el.getAttribute("data-track")!;
      const href = el.closest("a")?.href ?? "";

      if (/wa\.me|whatsapp/i.test(href)) {
        track.whatsappClick(label);
      } else if (href.startsWith("tel:")) {
        track.phoneClick(label);
      } else if (href.startsWith("mailto:")) {
        track.emailClick(label);
      } else if (SOCIAL_PLATFORMS.some((p) => href.includes(p))) {
        track.socialClick(extractPlatform(href), label);
      } else {
        track.ctaClick(label);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
