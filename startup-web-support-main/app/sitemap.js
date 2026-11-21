import { API_URL } from "@/constants";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://startupwebsupport.com";
  const now = new Date();

  const staticRoutes = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog/locations`, lastModified: now, changeFrequency: "daily", priority: 0.85 },
    { url: `${baseUrl}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/marketing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tax-return-filling`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/it-internship`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/charity`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/child-safety`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    // IT Services
    { url: `${baseUrl}/web-development-company-in-patna`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/software-development`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/mobile-app-development-services-in-patna`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/ecommerce-website-development`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/domain-and-hosting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sms-push-notification`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Digital Marketing
    { url: `${baseUrl}/digital-marketing-agency-in-patna`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/seo-company-in-patna`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/content-marketing-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/smo-smm-services-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/email-marketing-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/sem-ppc-service-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/whatsapp-marketing-services-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/video-marketing-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/branding-promotion-in-patna`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Products
    { url: `${baseUrl}/cab-booking-app`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/hospital-management-system`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pathology`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pathology-management-system`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/ecommerce-website`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  let blogRoutes = [];
  try {
    const res = await fetch(`${API_URL}/blogs?status=published`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const blogs = await res.json();
      if (Array.isArray(blogs)) {
        blogRoutes = blogs
          .filter((b) => b.slug)
          .map((b) => ({
            url: `${baseUrl}/${b.slug}`,
            lastModified: b.updatedAt ? new Date(b.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.8,
          }));
      }
    }
  } catch (err) {
    console.error("Error fetching blogs for sitemap:", err);
  }

  return [...staticRoutes, ...blogRoutes];
}
