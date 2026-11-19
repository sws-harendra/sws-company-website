import { headers } from "next/headers";
import { getMarketerProfile } from "@/lib/marketerProfiles";
import MarketingPage from "../page";

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const identifier = resolvedParams.slug || "official";
  const marketer = getMarketerProfile(identifier, resolvedSearchParams);

  return {
    title: `${marketer.name} | Authorized Marketing Partner of Startup Web Support`,
    description: `Official marketing and consultation portal represented by ${marketer.name} in partnership with Startup Web Support. Custom software development, mobile apps, and digital growth solutions.`,
    alternates: {
      canonical: `https://startupwebsupport.com/marketing/${identifier}`,
    },
  };
}

export default async function MarketerSlugPage({ params, searchParams }) {
  const resolvedParams = params ? await params : {};
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const mergedSearchParams = {
    ...resolvedSearchParams,
    partner: resolvedParams.slug,
  };

  return <MarketingPage searchParams={Promise.resolve(mergedSearchParams)} />;
}
