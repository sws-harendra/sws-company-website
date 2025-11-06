"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import blogService from "@/services/blog.service"; // ✅ use your existing service

export default function BlogGrid() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAll();
        // Optional: filter only published blogs
        const published = data.filter((b) => b.status === "published");
        setPosts(published);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="bg-white py-24 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, trends, and tips on web development, digital marketing,
            and growing your business online.
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            No blog posts available yet.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                className="group bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:shadow-xl hover:-translate-y-2"
                variants={itemVariants}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block aspect-video overflow-hidden"
                >
                  <img
                    src={post.image_url || "/placeholder.png"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-medium text-sky-600">
                      {post.author}
                    </span>
                    <span className="text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-sky-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-5">
                    {post.short_description || "No description available."}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sky-600 font-semibold mt-auto group-hover:text-sky-700"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
