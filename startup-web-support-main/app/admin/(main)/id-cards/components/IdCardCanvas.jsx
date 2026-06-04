"use client";

import React, { useRef, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * IdCardCanvas — Live Preview Only
 */
const IdCardCanvas = ({ templateUrl, fileType, data, config }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageObj, setImageObj] = useState(null);
  const [photoObj, setPhotoObj] = useState(null); // Pre-loaded photo image
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [isRendering, setIsRendering] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // Load template when URL changes
  useEffect(() => {
    if (!templateUrl) return;
    setImageLoaded(false);
    setImageObj(null);
    setLoadError(null);

    const isPdf =
      fileType === "application/pdf" ||
      (typeof templateUrl === "string" && templateUrl.toLowerCase().endsWith(".pdf"));

    if (isPdf) {
      import("pdfjs-dist").then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib.getDocument(templateUrl).promise
          .then((pdf) => pdf.getPage(1))
          .then(async (page) => {
            const viewport = page.getViewport({ scale: 2 });
            setOriginalDimensions({ width: viewport.width, height: viewport.height });
            
            const offCanvas = document.createElement("canvas");
            offCanvas.width = viewport.width;
            offCanvas.height = viewport.height;
            const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
            offCtx.fillStyle = "#ffffff";
            offCtx.fillRect(0, 0, viewport.width, viewport.height);
            await page.render({ canvasContext: offCtx, viewport }).promise;

            setImageObj({ type: "pdf", img: offCanvas });
            setImageLoaded(true);
          })
          .catch((err) => {
            console.error("PDF preview error:", err);
            setLoadError("Failed to load PDF template for preview.");
          });
      });
    } else {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setImageObj({ type: "image", img });
        setImageLoaded(true);
      };
      img.onerror = () => setLoadError("Failed to load image template for preview.");
      img.src = templateUrl;
    }
  }, [templateUrl, fileType]);

  // Pre-load employee photo when URL changes
  useEffect(() => {
    if (!data.photoUrl) {
      setPhotoObj(null);
      return;
    }
    const photoImg = new Image();
    photoImg.crossOrigin = "anonymous";
    photoImg.onload = () => setPhotoObj(photoImg);
    photoImg.onerror = () => {
      console.error("Failed to load overlay photo onto canvas");
      setPhotoObj(null);
    };
    photoImg.src = data.photoUrl;
  }, [data.photoUrl]);

  // Redraw whenever data/config/template changes
  useEffect(() => {
    if (!imageObj || !canvasRef.current || !imageLoaded) return;
    
    const drawCanvas = async () => {
      setIsRendering(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      canvas.width = originalDimensions.width;
      canvas.height = originalDimensions.height;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.drawImage(imageObj.img, 0, 0, canvas.width, canvas.height);

      // Draw Photo if available
      if (photoObj && config.photo) {
        try {
          const px = Number(config.photo.x) || 0;
          const py = Number(config.photo.y) || 0;
          const pw = Number(config.photo.width) || 200;
          const ph = Number(config.photo.height) || 250;
          
          ctx.save();
          // Draw image
          ctx.drawImage(photoObj, px, py, pw, ph);
          ctx.restore();
        } catch (err) {
          console.error("Failed to draw overlay photo", err);
        }
      }

      const drawText = (key, text, toUpper = false) => {
        const conf = config[key];
        if (!conf || !text) return;
        ctx.save();
        const fontStyle = conf.style || "bold";
        ctx.font = `${fontStyle === "normal" ? "" : fontStyle} ${conf.size}px ${conf.font || "Arial"}`.trim();
        ctx.fillStyle = conf.color || "#000000";
        ctx.textAlign = conf.align || "center";
        ctx.textBaseline = "middle";
        const finalStr = toUpper ? text.toUpperCase() : text;
        
        const drawX = Number(conf.x) || 50;
        const drawY = Number(conf.y) || 50;
        
        ctx.fillText(finalStr, drawX, drawY);
        ctx.restore();
      };

      drawText("name", data.name, true);
      drawText("role", data.role, true);
      drawText("idNumber", data.idNumber);
      drawText("bloodGroup", data.bloodGroup);
      drawText("phone", data.phone);
      drawText("email", data.email);
      drawText("issueDate", data.issueDate);
      
      setIsRendering(false);
    };
    drawCanvas();
  }, [imageObj, imageLoaded, data, config, originalDimensions, photoObj]);

  if (!templateUrl) return null;

  if (loadError) {
    return (
      <div className="w-full aspect-[1.414/1] flex items-center justify-center bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
        <p className="text-red-500 text-sm text-center px-6">{loadError}</p>
      </div>
    );
  }

  if (!imageLoaded) {
    return (
      <div className="w-full aspect-[1.414/1] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-sm">Loading template…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="w-full bg-gray-100 dark:bg-zinc-950 rounded-xl overflow-hidden shadow-inner p-2 flex justify-center"
      >
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            height: "auto",
            colorScheme: "light",
            filter: "none",
            backgroundColor: "#ffffff",
            imageRendering: "high-quality",
          }}
          className="shadow-lg rounded bg-white"
        />
      </div>
      {isRendering && (
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-2">
          <Loader2 size={11} className="animate-spin" /> Rendering…
        </p>
      )}
    </div>
  );
};

export default IdCardCanvas;
