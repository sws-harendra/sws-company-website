/**
 * generateCertificatePDF
 *
 * A fully self-contained, promise-based utility that:
 * 1. Loads the template (image or PDF) into an offscreen Canvas
 * 2. Overlays all text fields according to the coordinate config
 * 3. Exports the final canvas as a PDF and triggers browser download
 *
 * Does NOT depend on React state, refs, or render cycles.
 */
export async function generateCertificatePDF({ templateUrl, fileType, data, config, fileName }) {
  if (!templateUrl) {
    throw new UserFriendlyError(
      "No template uploaded",
      "Please upload a certificate template before generating."
    );
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const isPdf =
    fileType === "application/pdf" ||
    (typeof templateUrl === "string" && templateUrl.toLowerCase().endsWith(".pdf"));

  // ── Step 1: Load the template ──
  if (isPdf) {
    try {
      const pdfjsLib = await import("pdfjs-dist");
      // Use local worker — no CDN, no network failures
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const pdfDoc = await pdfjsLib.getDocument(templateUrl).promise;
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 2 });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
    } catch (err) {
      console.error("PDF template load error:", err);
      throw new UserFriendlyError(
        "Could not load PDF template",
        "The certificate template could not be loaded. Please check your internet connection and try again, or re-upload the template."
      );
    }
  } else {
    // Try loading image; fall back gracefully if CORS blocks it
    await loadImageOntoCanvas(canvas, ctx, templateUrl);
  }

  // ── Step 2: Overlay text ──
  const drawText = (key, text, toUpper = false) => {
    const conf = config[key];
    if (!conf || !text) return;
    ctx.save();
    const fontStyle = conf.style || "bold";
    ctx.font = `${fontStyle === "normal" ? "" : fontStyle} ${conf.size}px ${conf.font || "Arial"}`.trim();
    ctx.fillStyle = conf.color || "#000000";
    ctx.textAlign = conf.align || "center";
    ctx.textBaseline = "middle";
    ctx.fillText(toUpper ? text.toUpperCase() : text, conf.x, conf.y);
    ctx.restore();
  };

  drawText("name", data.name, true);
  drawText("role", data.role, true);
  drawText("duration", data.duration, false);
  drawText("serialNo", data.serialNo, false);
  drawText("issueDate", data.issueDate, false);

  // ── Step 3: Export as PDF ──
  try {
    const { default: jsPDF } = await import("jspdf");
    const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
    const w = canvas.width;
    const h = canvas.height;

    const pdf = new jsPDF({
      orientation: w > h ? "landscape" : "portrait",
      unit: "px",
      format: [w, h],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(dataUrl, "JPEG", 0, 0, w, h);
    pdf.save(fileName || "Certificate.pdf");
  } catch (err) {
    console.error("PDF export error:", err);
    throw new UserFriendlyError(
      "PDF export failed",
      "The certificate was generated but could not be saved as a PDF. Please try again."
    );
  }
}

/**
 * Attempts to load an image URL onto a canvas.
 * First tries with crossOrigin = "anonymous" (needed for canvas export).
 * Falls back without crossOrigin if the server doesn't support CORS headers,
 * which allows preview but prevents canvas export — we throw a clear error in that case.
 */
function loadImageOntoCanvas(canvas, ctx, url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    // Append a cache-busting param so the browser doesn't serve a
    // previously-cached response that lacked CORS headers.
    const bustUrl = url + (url.includes("?") ? "&" : "?") + "_cb=" + Date.now();

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve();
      } catch (e) {
        reject(
          new UserFriendlyError(
            "Template blocked by browser",
            "The template image is loaded but could not be exported due to a security restriction (CORS). Please make sure your backend server includes CORS headers for uploaded files."
          )
        );
      }
    };

    img.onerror = () => {
      // Retry without crossOrigin to distinguish CORS-blocked vs truly missing
      const img2 = new Image();
      img2.onload = () => {
        reject(
          new UserFriendlyError(
            "Template blocked by browser (CORS)",
            "The template image loaded but cannot be used for PDF export. The backend CORS headers may not be active yet — please restart the backend server and try again."
          )
        );
      };
      img2.onerror = () => {
        reject(
          new UserFriendlyError(
            "Template not found",
            "The saved template could not be reached. Please re-upload the template and try again."
          )
        );
      };
      img2.src = url;
    };

    img.src = bustUrl;
  });
}

/**
 * A custom error class that carries a user-friendly title and message
 * so the UI can display helpful feedback instead of raw technical errors.
 */
class UserFriendlyError extends Error {
  constructor(title, userMessage) {
    super(userMessage);
    this.name = "UserFriendlyError";
    this.title = title;
    this.userMessage = userMessage;
  }
}
