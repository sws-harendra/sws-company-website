"use client";

import { useParams } from "next/navigation";
import BlogForm from "@/app/admin/components/BlogForm";

export default function EditBlogPage() {
  const params = useParams();
  const id = params?.id;

  return <BlogForm blogId={id} />;
}
