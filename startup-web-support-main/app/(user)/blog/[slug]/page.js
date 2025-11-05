import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blogData'; // Adjust path
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPostPage({ params }) {
    const { slug } = params;
    const post = getBlogPostBySlug(slug);


    if (!post) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-4xl font-bold">Post Not Found</h1>
                <Link href="/blog" className="text-sky-600 hover:underline mt-4 inline-block">
                    &larr; Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="bg-white py-16 font-sans">
            <div className="container mx-auto px-6 max-w-6xl"> {/* Max width for readability */}
                {/* Back link */}
                <Link href="/blog" className="text-sky-600 hover:underline mb-8 inline-block">
                    &larr; Back to Blog
                </Link>

                {/* Post Header */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <div className="flex items-center space-x-4 text-gray-500 text-sm mb-8">
                    <span>By {post.author}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span className="font-medium text-sky-600">{post.category}</span>
                </div>

                {/* Featured Image */}
                <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>

                <div
                    className="prose prose-lg max-w-none text-gray-700" // Tailwind 'prose' class for styling
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

            </div>
        </article>
    );
}


// Optional: Generate Metadata
export async function generateMetadata({ params }) {
    const post =  getBlogPostBySlug(params.slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: `${post.title} - Blog`,
        description: post.excerpt,
    };
}