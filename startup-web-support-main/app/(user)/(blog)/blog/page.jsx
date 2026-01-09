import BlogGrid from "../components/BlogGrid";
import BlogHero from "../components/BlogHero";

export const metadata = {
  title: "Blog | Startup Web Support",
  description: "Leading IT company in Patna offering web development, software solutions, digital marketing and scalable technology services for business growth.",
};

const page = () => {
  return (
    <div>
      <BlogHero />
      <BlogGrid />
    </div>
  );
};

export default page;
