import Image from "next/image";
import Link from "next/link";
import blogService from "@/services/blog.service"; // your existing API helper

// ✅ This is a Server Component (no "use client")
export default async function BlogPostPage({ params }) {
  const { slug } = params;

  // Fetch single blog by slug or ID
  let post = null;
  try {
    // if your API endpoint supports slug:
    post = await blogService.getBySlug(slug);
    // otherwise fallback to ID:
    // post = await blogService.getById(slug);
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

  return (
    <article className="bg-white py-16 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sky-600 hover:underline mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-gray-500 text-sm mb-8">
          <span>By {post.author || "Unknown"}</span>
          <span>&bull;</span>
          <span>
            {new Date(post.createdAt || post.published_at).toLocaleDateString()}
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

        {/* Image */}
        {post.image_url && (
          <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.image_url}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              // priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}

// ✅ Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const slug = params.slug;
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
