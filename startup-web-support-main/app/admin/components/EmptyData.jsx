import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, Sparkles } from "lucide-react";

export default function EmptyState({
  heading,
  description = "No items to show yet. Add one to get started.",
}) {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
        {/* Subtle background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-3xl" />

        <CardContent className="relative p-10 md:p-16">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon section */}
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-2xl" />

              <div className="relative rounded-2xl p-5 bg-gradient-to-br from-blue-500 to-violet-600 shadow-xl">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-white/95 backdrop-blur-sm">
                  <ImageIcon
                    className="w-10 h-10 text-blue-600"
                    strokeWidth={2.5}
                  />
                </div>

                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-400 drop-shadow-lg" />
              </div>
            </div>

            {/* Text content */}
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
                {heading}
              </h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
