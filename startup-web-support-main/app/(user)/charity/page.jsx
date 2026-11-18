import Seo from "@/components/Seo";
import CharityGallery from "./components/CharityGallery";

export const metadata = {
  title: "Charity & Giving | Startup Web Support",
  description:
    "Explore photo and video highlights from our charity drives, social initiatives, and community impact.",
};

export default function CharityPage() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground">
        <CharityGallery />
      </main>
    </>
  );
}
