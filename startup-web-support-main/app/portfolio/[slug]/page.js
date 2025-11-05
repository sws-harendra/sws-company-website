import { getProjectBySlug, getAllProjectSlugs } from '@/lib/portfolio.Data'; // Adjust path
import { MoveLeft } from 'lucide-react';
import Image from 'next/image'; // Use Next.js Image for optimization
import Link from 'next/link';

// Optional: For Static Site Generation (SSG)
// export async function generateStaticParams() {
//   const slugs = getAllProjectSlugs();
//   return slugs.map((item) => ({
//     slug: item.slug,
//   }));
// }

export default  function ProjectDetailsPage({ params }) {
    const { slug } = params;
    const project = getProjectBySlug(slug);

    // If project not found (optional: show a 404 page)
    if (!project) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-4xl font-bold">Project Not Found</h1>
                <Link href="/portfolio" className="text-sky-600 hover:underline mt-4 inline-block">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Back link */}
                <Link href="/portfolio" >
                    <span className="text-sky-600 flex items-center gap-3 hover:underline mb-8"><MoveLeft /> Back to Portfolio</span>
                </Link>

                {/* Project Title and Category */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{project.title}</h1>
                <p className="text-lg text-sky-600 font-medium mb-8">{project.category}</p>

                {/* Main Image */}
                <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover"
                        priority // Load main image faster
                    />
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column: Description, Challenge, Solution */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Project Overview</h2>
                            <p className="text-gray-600 leading-relaxed">{project.description}</p>
                        </div>
                        {project.details?.challenge && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Challenge</h3>
                                <p className="text-gray-600 leading-relaxed">{project.details.challenge}</p>
                            </div>
                        )}
                        {project.details?.solution && (
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Solution</h3>
                                <p className="text-gray-600 leading-relaxed">{project.details.solution}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Technologies */}
                    <div className="md:col-span-1">
                        {project.details?.technologies && (
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
                                <ul className="flex flex-wrap gap-2">
                                    {project.details.technologies.map(tech => (
                                        <li key={tech} className="bg-sky-100 text-sky-700 text-sm font-medium px-3 py-1 rounded-full">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Gallery (Optional) */}
                {project.details?.gallery && project.details.gallery.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Project Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {project.details.gallery.map((imgUrl, index) => (
                                <div key={index} className="rounded-lg overflow-hidden shadow-md">
                                    <Image
                                        src={imgUrl}
                                        alt={`${project.title} - Gallery Image ${index + 1}`}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

// Optional: Generate Metadata for the page
export async function generateMetadata({ params }) {
    const project = getProjectBySlug(params.slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} - Portfolio`,
        description: project.description,
    };
}