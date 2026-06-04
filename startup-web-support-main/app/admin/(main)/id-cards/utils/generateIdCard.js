import jsPDF from "jspdf";

export async function generateIdCardPDF({ templateUrl, fileType, data, config, fileName }) {
  if (!templateUrl) {
    throw new UserFriendlyError(
      "No template uploaded",
      "Please upload an ID card template before generating."
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
        "The ID card template could not be loaded. Please check your internet connection and try again, or re-upload the template."
      );
    }
  } else {
    await loadImageOntoCanvas(canvas, ctx, templateUrl);
  }

  // ── Step 2: Overlay Photo ──
  if (data.photoUrl && config.photo) {
    try {
      await new Promise((resolve, reject) => {
        const photoImg = new Image();
        photoImg.crossOrigin = "anonymous";
        photoImg.onload = () => {
          const px = Number(config.photo.x) || 0;
          const py = Number(config.photo.y) || 0;
          const pw = Number(config.photo.width) || 200;
          const ph = Number(config.photo.height) || 250;
          ctx.drawImage(photoImg, px, py, pw, ph);
          resolve();
        };
        photoImg.onerror = () => reject(new Error("Failed to load photo"));
        photoImg.src = data.photoUrl;
      });
    } catch (e) {
      console.error(e);
      throw new UserFriendlyError(
        "Could not load photo",
        "The uploaded photo could not be drawn on the ID Card. Please try a different photo."
      );
    }
  }

  // ── Step 3: Overlay text ──
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
  drawText("idNumber", data.idNumber, false);
  drawText("bloodGroup", data.bloodGroup, false);
  drawText("phone", data.phone, false);
  drawText("email", data.email, false);
  drawText("issueDate", data.issueDate, false);

  // ── Step 4: Export as PDF ──
  try {
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
    pdf.save(fileName || "ID_Card.pdf");
  } catch (err) {
    console.error("PDF export error:", err);
    throw new UserFriendlyError(
      "PDF export failed",
      "The ID card was generated but could not be saved as a PDF. Please try again."
    );
  }
}

function loadImageOntoCanvas(canvas, ctx, url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
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

class UserFriendlyError extends Error {
  constructor(title, userMessage) {
    super(userMessage);
    this.name = "UserFriendlyError";
    this.title = title;
    this.userMessage = userMessage;
  }
}
