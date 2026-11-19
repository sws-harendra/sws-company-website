/**
 * Dynamic Marketer & Partner Profile Handler
 * -------------------------------------------------------------
 * No static/hardcoded personal data.
 * All profiles are resolved dynamically based on the active subdomain
 * or URL parameters (?name=...&phone=...&whatsapp=...&email=...).
 */

export const DEFAULT_BRAND_MARKETER = {
  id: "marketing",
  name: "Authorized Marketing Partner",
  title: "Official Growth Partner & IT Consultant",
  partnerId: "SWS-MKT-PARTNER",
  phone: "+91 8789112014",
  whatsapp: "8789112014",
  email: "aanvigroup@startupwebsupport.com",
  location: "Patna, Bihar & Pan-India",
  avatar: "/sws-logo.png",
  avatarFallback: "SWS",
  tagline:
    "Empowering businesses with Startup Web Support's premier IT & Software solutions.",
  bio: "Official marketing and client growth division of Startup Web Support. Connecting ambitious businesses with enterprise-grade web development, mobile applications, custom software, and high-impact digital marketing solutions.",
  verified: true,
  rating: 4.9,
  reviewsCount: 38,
  exclusiveOffer: {
    badge: "Exclusive Partner Offer",
    headline: "Complimentary Tech Audit & Priority Sprint Allocation",
    description:
      "Connect through this official partner portal to receive priority architecture review, custom quote analysis, and dedicated onboarding support.",
    code: "PARTNER-PRIORITY",
  },
  highlights: [
    "Direct Core Engineering Access (No Middlemen)",
    "Guaranteed Startup Web Support Quality & Security",
    "Priority Delivery Timelines & Dedicated Support",
    "Tailored Commercials & Transparent Milestones",
  ],
  stats: [
    { label: "Client Satisfaction", value: "99.4%" },
    { label: "Successful Deliveries", value: "120+" },
    { label: "Years in IT Growth", value: "7+" },
    { label: "Consultation Response", value: "< 15 Mins" },
  ],
  socials: {
    whatsapp: "https://wa.me/8789112014",
    email: "mailto:aanvigroup@startupwebsupport.com",
    phone: "tel:+918789112014",
    // linkedin: "https://linkedin.com",
  },
};

/**
 * Format subdomain string into a clean readable display title
 * e.g. "aanvigroup" -> "Aanvi Group"
 * e.g. "hello" -> "Hello"
 */
function formatSubdomainName(slug) {
  if (!slug) return DEFAULT_BRAND_MARKETER.name;

  // Replace hyphens/underscores with spaces
  const cleaned = slug.replace(/[-_]+/g, " ").trim();

  // Capitalize words
  return cleaned
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Retrieve marketer profile purely dynamically.
 * Zero hardcoded personal data.
 *
 * @param {string} [identifier] - Subdomain or slug (e.g., "aanvigroup")
 * @param {Record<string, string>} [queryOverrides] - Optional query params
 */
export function getMarketerProfile(identifier, queryOverrides = {}) {
  const cleanId = (identifier || "").toString().trim().toLowerCase();

  const displayName = cleanId
    ? formatSubdomainName(cleanId)
    : DEFAULT_BRAND_MARKETER.name;

  const partnerCode = cleanId
    ? `SWS-MKT-${cleanId.toUpperCase().replace(/[^A-Z0-9]/g, "")}`
    : DEFAULT_BRAND_MARKETER.partnerId;

  // Base dynamic profile from subdomain
  let profile = {
    ...DEFAULT_BRAND_MARKETER,
    id: cleanId || DEFAULT_BRAND_MARKETER.id,
    name: displayName,
    partnerId: partnerCode,
    avatarFallback: displayName.slice(0, 2).toUpperCase(),
    bio: cleanId
      ? `Welcome! As an official marketing partner representing Startup Web Support, ${displayName} connects businesses with top-tier custom software development, mobile apps, web solutions, and high-impact digital marketing strategies.`
      : DEFAULT_BRAND_MARKETER.bio,
  };

  // Dynamically override any fields passed via query parameters
  if (queryOverrides && typeof queryOverrides === "object") {
    profile = {
      ...profile,
      ...(queryOverrides.name && { name: queryOverrides.name }),
      ...(queryOverrides.title && { title: queryOverrides.title }),
      ...(queryOverrides.phone && { phone: queryOverrides.phone }),
      ...(queryOverrides.whatsapp && { whatsapp: queryOverrides.whatsapp }),
      ...(queryOverrides.email && { email: queryOverrides.email }),
      ...(queryOverrides.bio && { bio: queryOverrides.bio }),
      ...(queryOverrides.partnerId && { partnerId: queryOverrides.partnerId }),
      ...(queryOverrides.location && { location: queryOverrides.location }),
      ...(queryOverrides.avatar && { avatar: queryOverrides.avatar }),
    };
  }

  return profile;
}
