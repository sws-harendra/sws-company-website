export const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1036213099089283";

/**
 * Trigger Meta Pixel PageView event
 */
export const pageview = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

/**
 * Trigger Standard Meta Pixel Events
 * Common events: 'Lead', 'Contact', 'ViewContent', etc.
 * https://developers.facebook.com/docs/meta-pixel/reference
 */
export const event = (name, options = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};

/**
 * Trigger Custom Meta Pixel Events
 */
export const customEvent = (name, options = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", name, options);
  }
};
