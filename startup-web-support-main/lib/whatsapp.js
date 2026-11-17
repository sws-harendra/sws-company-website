import * as fpixel from "@/lib/fpixel";

export const WHATSAPP_PHONE = "917479499718";

/**
 * Generate a wa.me URL with auto-filled quotation message based on service/topic
 * @param {string} [topicOrService]
 * @returns {string}
 */
export function getWhatsAppUrl(topicOrService) {
  const message = topicOrService
    ? `Hello Startup Web Support! I would like to get a free quotation for ${topicOrService}.`
    : `Hello Startup Web Support! I would like to get a free quotation for your services.`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Trigger Meta Pixel tracking and open WhatsApp in a new tab
 * @param {string} [topicOrService]
 */
export function openWhatsApp(topicOrService) {
  const url = getWhatsAppUrl(topicOrService);

  if (typeof window !== "undefined") {
    try {
      fpixel.event("Contact", {
        method: "WhatsApp",
        content_name: topicOrService || "General Quotation",
      });
      fpixel.customEvent("WhatsAppClick", {
        phoneNumber: WHATSAPP_PHONE,
        service: topicOrService || "General Quotation",
      });
    } catch (e) {
      // ignore tracking errors
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }
}
