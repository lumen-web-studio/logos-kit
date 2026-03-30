declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export const track = {
  contactFormSubmit: () => trackEvent("contact_form_submit"),
  whatsappClick: (context?: string) =>
    trackEvent("whatsapp_click", context ? { context } : undefined),
  phoneClick: () => trackEvent("phone_click"),
  emailClick: () => trackEvent("email_click"),
  ctaClick: (label: string) => trackEvent("cta_click", { label }),
  socialClick: (platform: string) => trackEvent("social_click", { platform }),
  custom: (
    name: string,
    params?: Record<string, string | number | boolean>,
  ) => trackEvent(name, params),
} as const;
