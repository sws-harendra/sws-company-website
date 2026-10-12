"use client";

import { useParams } from "next/navigation";
import BlogForm from "@/app/admin/components/BlogForm";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id;

  return <BlogForm blogId={id} />;
}
