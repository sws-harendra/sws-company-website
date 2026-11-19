import { headers } from "next/headers";
import { getMarketerProfile } from "@/lib/marketerProfiles";
import MarketedByHeroBadge from "@/components/marketing/MarketedByHeroBadge";
import MarketedByProfileSection from "@/components/marketing/MarketedByProfileSection";
import MarketedByStickyBar from "@/components/marketing/MarketedByStickyBar";
import NewHeroSection from "@/components/NewHeroSection";
import FeaturedServices from "@/components/FeaturedServices";
import PageDivider from "@/components/PageDivider";
import AboutUs from "@/components/AboutUs";
import ServiceFeatures from "@/components/ServiceFeatures";
import IndustriesSection from "@/components/IndustriesSection";
import TechStack from "@/components/TechStacks";
import ClientsScroller from "@/components/ClientsScroller";
import Testimonials from "@/components/Testimonials";
import RecentWorkShowcase from "@/components/RecentWorkShowcase";
import Seo from "@/components/Seo";
import ContactUs from "@/components/ContactUs";

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  let reqHeaders;
  try {
    reqHeaders = await headers();
  } catch (e) {
    reqHeaders = null;
  }
  const subdomainHeader = reqHeaders
    ? reqHeaders.get("x-subdomain") || reqHeaders.get("x-marketer")
    : null;

  const identifier =
    resolvedSearchParams.subdomain ||
    subdomainHeader ||
    resolvedSearchParams.partner ||
    resolvedSearchParams.ref ||
    resolvedSearchParams.mkt;

  const marketer = getMarketerProfile(identifier, resolvedSearchParams);

  return {
    title: `${marketer.name} | Authorized Marketing Partner of Startup Web Support`,
    description: `Official marketing and consultation portal represented by ${marketer.name} in partnership with Startup Web Support. Custom software development, mobile apps, and digital growth solutions.`,
    alternates: {
      canonical: "https://startupwebsupport.com/marketing",
    },
  };
}

export default async function MarketingPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  let reqHeaders;
  try {
    reqHeaders = await headers();
  } catch (e) {
    reqHeaders = null;
  }
  const subdomainHeader = reqHeaders
    ? reqHeaders.get("x-subdomain") || reqHeaders.get("x-marketer")
    : null;

  const identifier =
    resolvedSearchParams.subdomain ||
    subdomainHeader ||
    resolvedSearchParams.partner ||
    resolvedSearchParams.ref ||
    resolvedSearchParams.mkt ||
    "hello";

  const marketer = getMarketerProfile(identifier, resolvedSearchParams);

  return (
    <>
      <Seo
        title={`${marketer.name} | Marketing Partner | Startup Web Support`}
        description={`Marketed by ${marketer.name}. Official partner of Startup Web Support offering expert software development, web & app solutions, and digital growth services.`}
        canonical="https://startupwebsupport.com/marketing"
        image="sws-logo.png"
        keywords="startup web support partner, marketing partner, it company in patna, software company in patna, web development company Bihar, mobile app development, digital marketing patna"
      />

      {/* Top Banner: Marketed By / Official Partner */}
      <MarketedByHeroBadge marketer={marketer} />

      <main className="overflow-x-clip">
        {/* Main Brand Hero Section */}
        <NewHeroSection />

        {/* Dedicated "Marketed By" Profile & Co-Branding Section */}
        <MarketedByProfileSection marketer={marketer} />

        {/* Featured Services */}
        <FeaturedServices />

        <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />

        {/* About Company */}
        <AboutUs />

        <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />

        {/* Service Features */}
        <ServiceFeatures />

        {/* Industries We Serve */}
        <IndustriesSection />

        {/* Tech Stack */}
        <TechStack />

        {/* Client Logos */}
        <ClientsScroller />

        {/* Client Testimonials */}
        <Testimonials />

        <PageDivider upperColor="#ffffff" lowerColor="#030712" height="h-16" />

        {/* Recent Work Portfolio */}
        <RecentWorkShowcase />

        {/* Sticky floating consultation bar for fast conversions */}
        <MarketedByStickyBar marketer={marketer} />
      </main>
    </>
  );
}
