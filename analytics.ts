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
  whatsappClick: (label?: string) =>
    trackEvent("whatsapp_click", label ? { label } : undefined),
  phoneClick: (label?: string) =>
    trackEvent("phone_click", label ? { label } : undefined),
  emailClick: (label?: string) =>
    trackEvent("email_click", label ? { label } : undefined),
  ctaClick: (label: string) => trackEvent("cta_click", { label }),
  socialClick: (platform: string, label?: string) =>
    trackEvent("social_click", { platform, ...(label ? { label } : {}) }),
  custom: (
    name: string,
    params?: Record<string, string | number | boolean>,
  ) => trackEvent(name, params),
} as const;
