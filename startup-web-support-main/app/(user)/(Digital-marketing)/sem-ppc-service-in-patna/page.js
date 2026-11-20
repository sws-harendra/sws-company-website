import React from "react";
import SemPpcHero from "./components/SemPpcHero";
import WhyChooseSemPpc from "./components/WhyChooseSemPpc";
import PageDivider from "@/components/PageDivider";
import SemPpcServicesDetails from "./components/SemPpcServicesDetails";
import BestSemAgency from "./components/BestSemAgency";
import AreasServedCta from "./components/AreasServedCta";
import SemPpcFaqColumns from "./components/SemPpcFaqColumns";
import Seo from "@/components/Seo";

const page = () => {
  return (
    <div>
      <Seo
        title="Professional SEM & PPC Services in Patna to Grow Your Business."
        description="Get expert SEM & PPC services in Patna to boost online visibility, attract targeted traffic, generate quality leads, and increase sales for your business."
        canonical="https://startupwebsupport.com/contact-us"
        image="./sws-logo.png"
      />
      <SemPpcHero />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <WhyChooseSemPpc />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <SemPpcServicesDetails />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <BestSemAgency />
      <PageDivider upperColor="#1e88e5" lowerColor="#ffff" height="h-12" />
      <AreasServedCta />
      <PageDivider upperColor="#ffff" lowerColor="#1e88e5" height="h-12" />
      <SemPpcFaqColumns />
    </div>
  );
};

export default page;
