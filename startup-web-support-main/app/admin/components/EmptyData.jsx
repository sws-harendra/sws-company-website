import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Sparkles } from "lucide-react";

export default function EmptyState({
  heading,
  description = "No items to show yet. Add one to get started.",
}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="relative overflow-hidden border-0 shadow-none bg-transparent">
        {/* Subtle background gradient removed for full transparency */}

        <CardContent className="relative p-10 md:p-16">
          <div className="flex flex-col items-center text-center space-y-6">


            {/* Icon section */}
            <div className="flex justify-center mb-2">
              <ImageIcon
                className="w-16 h-16 text-zinc-400 dark:text-zinc-600 drop-shadow-sm"
                strokeWidth={1.5}
              />
            </div>

            {/* Text content */}
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-zinc-200">
                {heading}
              </h2>
              <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
