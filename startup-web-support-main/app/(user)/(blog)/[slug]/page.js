import Image from "next/image";
import Link from "next/link";
import blogService from "@/services/blog.service";
import ContactUs from "@/components/ContactUs";

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  let post = null;
  try {
    post = await blogService.getBySlug(slug);
  } catch (err) {
    console.error("Error fetching post:", err);
  }

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link
          href="/blog"
          className="text-sky-600 hover:underline mt-4 inline-block"
        >
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const featuredBlogs = post.FeaturedBlogs || [];

  return (
    <article className="bg-white py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <Link
          href="/blog"
          className="text-sky-600 hover:underline mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        {/* ✅ Grid layout: main + sidebar */}
        <div
          className={`grid gap-12 ${
            featuredBlogs.length > 0 ? "lg:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {/* Main content */}
          <div className={featuredBlogs.length > 0 ? "lg:col-span-2" : ""}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-gray-500 text-sm mb-8">
              <span>By {post.author || "Unknown"}</span>
              <span>&bull;</span>
              <span>
                {new Date(
                  post.createdAt || post.published_at
                ).toLocaleDateString()}
              </span>
              {post.status && (
                <>
                  <span>&bull;</span>
                  <span className="font-medium text-sky-600">
                    {post.status.toUpperCase()}
                  </span>
                </>
              )}
            </div>

            {post.image_url && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={post.image_url}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.contactus && (
              <ContactUs
                page={slug}
                showTitle={true}
                title="Contact Now"
                subtitle="To Get Started and have own product"
              />
            )}
          </div>

          {/* ✅ Sidebar for featured blogs */}
          {featuredBlogs.length > 0 && (
            <aside className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                Featured Blogs
              </h2>
              {featuredBlogs.map((f) => (
                <Link
                  key={f.id}
                  href={`/blog/${f.slug}`}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden shadow hover:shadow-md transition bg-gray-50">
                    {f.image_url && (
                      <img
                        src={f.image_url}
                        alt={f.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-sky-600">
                        {f.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {f.short_description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const slug = await params.slug;
  let post = null;
  try {
    post = await blogService.getBySlug(slug);
  } catch (err) {
    console.error("Metadata fetch failed:", err);
  }

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} - Blog`,
    description: post.short_description || "Read this blog post",
    openGraph: {
      title: post.title,
      description: post.short_description,
      images: [{ url: post.image_url }],
    },
  };
}
