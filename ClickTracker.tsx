"use client";
import { useEffect } from "react";
import { track } from "./analytics";

function extractSocialPlatform(href: string): string | null {
  let hostname: string;
  try {
    hostname = new URL(href).hostname;
  } catch {
    return null;
  }
  if (/instagram\.com/.test(hostname)) return "instagram";
  if (/facebook\.com|fb\.com/.test(hostname)) return "facebook";
  if (/twitter\.com|x\.com/.test(hostname)) return "twitter";
  if (/linkedin\.com|lnkd\.in/.test(hostname)) return "linkedin";
  if (/tiktok\.com/.test(hostname)) return "tiktok";
  if (/youtube\.com|youtu\.be/.test(hostname)) return "youtube";
  return null;
}

function parseLabel(label: string): {
  section: string;
  action: string;
  context?: string;
} {
  const [section = "", action = "", context] = label.split("_");
  return { section, action, ...(context ? { context } : {}) };
}

export default function ClickTracker(): null {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-track]");
      if (!el) return;

      const label = el.getAttribute("data-track")!;
      const href = el.closest("a")?.href ?? "";
      const elementType =
        el.tagName === "BUTTON" || el.closest("button") ? "button" : "link";
      const { section, action, context } = parseLabel(label);
      const params = {
        label,
        section,
        action,
        ...(context ? { context } : {}),
        element_type: elementType,
      };

      if (/wa\.me|whatsapp/i.test(href)) {
        track.custom("whatsapp_click", params);
      } else if (href.startsWith("tel:")) {
        track.custom("phone_click", params);
      } else if (href.startsWith("mailto:")) {
        track.custom("email_click", params);
      } else {
        const platform = extractSocialPlatform(href);
        track.custom(platform ? "social_click" : "cta_click", {
          ...params,
          ...(platform ? { platform } : {}),
        });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
