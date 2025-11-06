"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BannerCard({ banner, onEdit, onDelete }) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{banner.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg">
          <img
            src={banner.image_url}
            alt={banner.title}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-sm text-gray-600">{banner.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {banner.button1_title && banner.button1_url && (
            <Button asChild size="sm">
              <a href={banner.button1_url} target="_blank">
                {banner.button1_title}
              </a>
            </Button>
          )}
          {banner.button2_title && banner.button2_url && (
            <Button asChild variant="secondary" size="sm">
              <a href={banner.button2_url} target="_blank">
                {banner.button2_title}
              </a>
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(banner)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(banner.id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
