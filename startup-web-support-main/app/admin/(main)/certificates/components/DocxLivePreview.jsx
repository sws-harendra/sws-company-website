"use client";

import React, { useEffect, useRef, useState } from "react";
import * as docx from "docx-preview";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Loader2 } from "lucide-react";

export default function DocxLivePreview({ templateUrl, data }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let debounceTimer;

    const renderPreview = async () => {
      if (!templateUrl || !containerRef.current) return;
      setLoading(true);
      setError(null);

      try {
        // Fetch the DOCX template as an ArrayBuffer
        const res = await fetch(templateUrl);
        if (!res.ok) throw new Error("Failed to load template");
        const arrayBuffer = await res.arrayBuffer();

        // Perform substitution
        const zip = new PizZip(arrayBuffer);
        
        let doc;
        try {
          doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
          });
        } catch (parseError) {
          throw new Error("Invalid tags in the Word Document. Check for missing closing brackets like '}}'.");
        }

        try {
          doc.setData(data);
          doc.render();
        } catch (renderError) {
          throw new Error("Failed to render tags in the Word Document. Some variables might be complex or invalid.");
        }

        // Get the updated document as a Blob
        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        // Render the Blob into the container using docx-preview
        if (isMounted) {
          // Clear container before rendering
          containerRef.current.innerHTML = "";
          await docx.renderAsync(out, containerRef.current, null, {
            inWrapper: false,
            ignoreWidth: false,
            ignoreHeight: false,
            ignoreFonts: false,
            breakPages: true,
            ignoreLastRenderedPageBreak: true,
            experimental: true,
          });
          setLoading(false);
        }
      } catch (err) {
        // Suppress console.error so Next.js doesn't show the red error overlay
        console.warn("DOCX Preview Warning:", err.message);
        if (isMounted) {
          setError(err.message || "Failed to render preview. The document structure might be too complex.");
          setLoading(false);
        }
      }
    };

    // Debounce the render to avoid heavy CPU usage while typing
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderPreview();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [templateUrl, JSON.stringify(data)]); // Re-render when data or template changes

  return (
    <div className="relative w-full h-[600px] bg-gray-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-y-auto">
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/50 dark:bg-black/50 flex flex-col items-center justify-center transition-opacity">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin mb-2" />
          <p className="text-sm text-gray-500 font-medium">Updating Document Preview...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white dark:bg-zinc-900 p-6 text-center">
          <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800 shadow-sm">
            {error}
          </p>
        </div>
      )}
      {/* The docx-preview library will inject the DOM into this container */}
      <div 
        ref={containerRef} 
        className="docx-preview-container w-full min-h-full flex justify-center py-8"
        style={{
           // Force a word-like document container styling
           "--docx-preview-page-background": "white",
           "--docx-preview-page-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        }}
      />
    </div>
  );
}
