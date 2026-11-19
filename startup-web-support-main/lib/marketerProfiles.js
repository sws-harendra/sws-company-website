/**
 * Marketer & Partner Profiles Configuration
 * -------------------------------------------------------------
 * Add or edit marketing partner details below.
 * These profiles are loaded when a visitor arrives via a specific
 * subdomain (e.g., rahul.startupwebsupport.com) or query param (?ref=rahul).
 */

export const DEFAULT_MARKETER = {
  id: "official",
  name: "Authorized Marketing Partner",
  title: "Official Growth Partner & IT Consultant",
  partnerId: "SWS-MKT-PARTNER",
  phone: "+91 7479499718",
  whatsapp: "917479499718",
  email: "marketing@startupwebsupport.com",
  location: "Patna, Bihar & Pan-India",
  avatar: "/sws-logo.png",
  avatarFallback: "MP",
  tagline:
    "Empowering businesses with Startup Web Support's premier IT & Software solutions.",
  bio: "Welcome! As an official marketing partner of Startup Web Support, I connect ambitious businesses with our enterprise-grade web development, mobile applications, custom software, and high-impact digital marketing solutions. Enjoy direct priority onboarding and exclusive partner privileges.",
  verified: true,
  rating: 4.9,
  reviewsCount: 38,
  exclusiveOffer: {
    badge: "Exclusive Partner Offer",
    headline: "Complimentary Tech Audit & Up to 15% Off Custom Development",
    description:
      "Connect through this official partner page to claim priority sprint allocation, a free UI/UX & SEO audit, and dedicated account manager support.",
    code: "PARTNER-PRIORITY",
  },
  highlights: [
    "Direct Core Engineering Access (No Middlemen)",
    "Guaranteed Startup Web Support Quality & Security",
    "Priority Delivery Timelines & Dedicated Support",
    "Tailored Commercials & Flexible Milestones",
  ],
  stats: [
    { label: "Client Satisfaction", value: "99.4%" },
    { label: "Successful Deliveries", value: "120+" },
    { label: "Years in IT Growth", value: "7+" },
    { label: "Consultation Response", value: "< 15 Mins" },
  ],
  socials: {
    whatsapp: "https://wa.me/917479499718",
    email: "mailto:marketing@startupwebsupport.com",
    phone: "tel:+917479499718",
    linkedin: "https://linkedin.com",
  },
};

/**
 * Pre-configured Marketer Profiles Map.
 * You can add as many partners as you wish.
 * Key can be the subdomain (e.g. 'aman' for aman.startupwebsupport.com or 'aman' in /marketing?ref=aman)
 */
export const MARKETER_PROFILES = {
  official: DEFAULT_MARKETER,
  // Specific profile for the "hello" subdomain:
  aanvigroup: {
    ...DEFAULT_MARKETER,
    id: "aanvigroup",
    name: "Aanvi Group",
    title: "Authorized Growth Partner & Digital Consultant",
    partnerId: "SWS-MKT-HELLO",
    phone: "+91 8789112014",
    whatsapp: "8789112014",
    email: "officialanupchaudhary@gmail.com",
    avatarFallback: "AG",
    bio: "Welcome! As an official marketing partner representing Startup Web Support, I connect businesses with top-tier custom software development, mobile apps, web solutions, and high-impact digital marketing strategies.",
  },
};

/**
 * Retrieve a marketer profile by key/subdomain with fallback to default
 * and support for custom query parameter overrides.
 *
 * @param {string} [identifier] - Subdomain, slug, or profile ID
 * @param {Record<string, string>} [queryOverrides] - Optional query params to dynamically override fields
 * @returns {typeof DEFAULT_MARKETER}
 */
export function getMarketerProfile(identifier, queryOverrides = {}) {
  const cleanId = (identifier || "").toString().trim().toLowerCase();

  // Find base profile or fallback
  let profile = MARKETER_PROFILES[cleanId] || {
    ...DEFAULT_MARKETER,
    id: cleanId || DEFAULT_MARKETER.id,
    name: cleanId
      ? cleanId.charAt(0).toUpperCase() + cleanId.slice(1) + " (Partner)"
      : DEFAULT_MARKETER.name,
    partnerId: cleanId
      ? `SWS-MKT-${cleanId.toUpperCase()}`
      : DEFAULT_MARKETER.partnerId,
  };

  // If query overrides are passed, allow dynamic tweaking without code edit
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
