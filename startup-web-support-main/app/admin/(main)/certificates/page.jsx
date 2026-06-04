"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import CertificateCanvas from "./components/CertificateCanvas";
import DocxLivePreview from "./components/DocxLivePreview";
import { generateCertificatePDF } from "./utils/generateCertificate";
import { generateDocxCertificate } from "./utils/generateDocx";
import {
  Upload, Settings, Download, RefreshCw, FileImage,
  History, ChevronLeft, Loader2, Award, X, Eye, Trash2, AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_serverurl || "http://localhost:8000/api";

const defaultFormData = () => ({
  name: "", role: "",
  startDate: "", endDate: "",
  serialNo: "",
  issueDate: new Date().toISOString().split("T")[0],
  skills: "", desc: "", signDate: new Date().toISOString().split("T")[0]
});

const defaultConfig = {
  name: { x: 500, y: 370, size: 42, color: "#1a1a1a", font: "Arial", align: "center", style: "bold" },
  role: { x: 500, y: 450, size: 28, color: "#444444", font: "Arial", align: "center", style: "bold" },
  duration: { x: 500, y: 530, size: 22, color: "#555555", font: "Arial", align: "center", style: "normal" },
  serialNo: { x: 80, y: 60, size: 18, color: "#cc0000", font: "Arial", align: "left", style: "bold" },
  issueDate: { x: 780, y: 60, size: 18, color: "#333333", font: "Arial", align: "left", style: "bold" },
};

export default function CertificatePage() {
  const fileInputRef = useRef(null);

  // ── Template state (persists via backend) ──
  const [templateUrl, setTemplateUrl] = useState("");
  const [templateFileType, setTemplateFileType] = useState("");
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(true); // true while fetching from DB

  // ── Form & UI ──
  const [formData, setFormData] = useState(defaultFormData());
  const [config, setConfig] = useState(defaultConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [view, setView] = useState("generate"); // "generate" | "history"
  const [showSettings, setShowSettings] = useState(false);
  const [showPreviewSheet, setShowPreviewSheet] = useState(false);
  const [documentType, setDocumentType] = useState("Internship Offer Letter");

  const documentTypes = [
    "Internship Offer Letter",
    "Internship Certificate",
    "Job Offer Letter",
    "Letter of Experience",
    "Letter of Appreciation"
  ];

  const [pastCerts, setPastCerts] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [redownloadingId, setRedownloadingId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const isDocx = templateFileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                 templateFileType === "application/msword" ||
                 (templateUrl && typeof templateUrl === "string" && templateUrl.toLowerCase().endsWith(".docx"));

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ── On mount: load saved template from backend ──
  useEffect(() => {
    setFormData(defaultFormData()); // clear form on tab switch
    setShowSettings(false); // close settings panel on tab switch

    const loadSettings = async () => {
      setTemplateLoading(true);
      try {
        const res = await axios.get(`${API_URL}/certificates/settings?type=${encodeURIComponent(documentType)}`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.data.success && res.data.setting) {
          const setting = res.data.setting;
          if (setting.config) {
            let dbConfig = setting.config;
            if (typeof dbConfig === "string") {
              try { dbConfig = JSON.parse(dbConfig); } catch (e) { dbConfig = {}; }
            }

            // Deep merge only the keys that currently exist in defaultConfig
            const merged = { ...defaultConfig };
            for (const key of Object.keys(defaultConfig)) {
              if (dbConfig[key]) {
                merged[key] = { ...defaultConfig[key], ...dbConfig[key] };
              }
            }
            setConfig(merged);
          } else {
            setConfig(defaultConfig);
          }

          if (setting.templateUrl) {
            const url = setting.templateUrl;
            // Guard: only use URLs that are proper absolute URLs to prevent 404 routing
            if (url.startsWith("http://") || url.startsWith("https://")) {
              setTemplateUrl(url);
              setTemplateFileType(res.data.setting.templateFileType || "image/png");
            } else {
              setTemplateUrl("");
              setTemplateFileType("");
              console.warn("Stored template URL is invalid (was BACKEND_URL missing?):", url);
            }
          } else {
            setTemplateUrl("");
            setTemplateFileType("");
          }
        } else {
          // No settings found for this tab, clear everything
          setConfig(defaultConfig);
          setTemplateUrl("");
          setTemplateFileType("");
        }
      } catch (e) {
        console.error("Could not load certificate settings", e);
        setConfig(defaultConfig);
        setTemplateUrl("");
        setTemplateFileType("");
      } finally {
        setTemplateLoading(false);
      }
    };
    loadSettings();
    fetchNextSerial();
  }, [documentType]);

  useEffect(() => {
    if (view === "history") {
      loadHistory();
    }
  }, [documentType, view]);

  const fetchNextSerial = async (typeOverride) => {
    try {
      const typeToFetch = typeOverride || documentType;
      const res = await axios.get(`${API_URL}/certificates/next-serial?type=${encodeURIComponent(typeToFetch)}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) {
        setFormData((prev) => ({ ...prev, serialNo: res.data.nextSerialNo }));
      }
    } catch (e) {
      console.error("Failed to fetch next serial", e);
    }
  };

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API_URL}/certificates?type=${encodeURIComponent(documentType)}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) setPastCerts(res.data.certificates);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoadingHistory(false);
    }
  };

  // ── Upload template → backend ──
  const handleTemplateUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setTemplateUrl(localUrl);
    setTemplateFileType(file.type);

    setIsUploadingTemplate(true);
    try {
      const fd = new FormData();
      fd.append("template", file);
      fd.append("type", documentType);
      const res = await axios.post(`${API_URL}/certificates/settings/template`, fd, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        // Replace blob URL with permanent server URL
        setTemplateUrl(res.data.templateUrl);
        setTemplateFileType(res.data.templateFileType);
        toast.success("Template saved — loads automatically next time!");
      }
    } catch {
      toast.error("Template preview ready, but server save failed");
    } finally {
      setIsUploadingTemplate(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Computed duration string ──
  const getDurationString = useCallback(() => {
    if (!formData.startDate || !formData.endDate) return "";
    const fmt = (d) =>
      new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(formData.startDate)} – ${fmt(formData.endDate)}`;
  }, [formData.startDate, formData.endDate]);

  const handleGenerate = async () => {
    const { name, role, startDate, endDate, serialNo, skills, desc, signDate } = formData;
    
    if (documentType === "Internship Offer Letter") {
      if (!name || !role || !startDate || !skills || !desc || !signDate) {
        toast.error("Please fill all required fields for Offer Letter");
        return;
      }
    } else {
      if (!name || !role || !startDate || !endDate || !serialNo) {
        toast.error("Please fill all required fields");
        return;
      }
    }

    if (!templateUrl) {
      toast.error("Please upload a certificate template first");
      return;
    }

    setIsSaving(true);
    try {
      // 1. Save record to DB including the CURRENT template configuration
      await axios.post(
        `${API_URL}/certificates`,
        { ...formData, templateUrl, templateFileType, config, type: documentType },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      // Automatically persist the current coordinates as the new defaults
      axios.put(
        `${API_URL}/certificates/settings/config`,
        { config, type: documentType },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      ).catch(e => console.error("Auto-save config failed:", e));

      // 2. Generate and download
      const isDocx = templateFileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                     templateFileType === "application/msword" ||
                     (templateUrl && typeof templateUrl === "string" && templateUrl.toLowerCase().endsWith(".docx"));

      if (isDocx) {
        const ordinalFormat = (d) => {
          if (!d) return "";
          const date = new Date(d);
          const day = date.getDate();
          const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
          return `${day}${suffix} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
        };

        await generateDocxCertificate({
          templateUrl,
          data: { 
            ...formData, 
            duration: getDurationString(),
            startdate: ordinalFormat(formData.startDate),
            signdate: ordinalFormat(formData.signDate)
          },
          fileName: `${documentType.replace(/\s+/g, "_")}_${name.replace(/\s+/g, "_")}${serialNo ? `_${serialNo}` : ""}.docx`,
        });
      } else {
        await generateCertificatePDF({
          templateUrl,
          fileType: templateFileType,
          data: { ...formData, duration: getDurationString() },
          config,
          fileName: `Certificate_${name.replace(/\s+/g, "_")}_${serialNo}.pdf`,
        });
      }

      toast.success("Certificate generated and downloaded!");
      setFormData(defaultFormData());
      fetchNextSerial();
      setShowPreviewSheet(false);
    } catch (e) {
      console.error(e);
      const msg = e.userMessage || e.response?.data?.message || e.message || "Failed to generate certificate";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Re-download a past certificate ──
  // Uses the SAME standalone utility — no React state/ref tricks
  const handleRedownload = async (cert) => {
    // If template is still loading, wait
    if (templateLoading) {
      toast.error("Template is still loading, please wait…");
      return;
    }
    if (!templateUrl) {
      toast.error("No template found. Please go back and upload a template first.");
      return;
    }

    setRedownloadingId(cert.id);
    try {
      const fmt = (d) =>
        new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      const durationStr = `${fmt(cert.startDate)} – ${fmt(cert.endDate)}`;

      let parsedCertConfig = cert.config;
      if (typeof parsedCertConfig === "string") {
        try { parsedCertConfig = JSON.parse(parsedCertConfig); } catch (e) { parsedCertConfig = null; }
      }

      // Use the template & config saved at the time of creation, fallback to current if old
      const finalTemplateUrl = cert.templateUrl || templateUrl;
      const finalTemplateFileType = cert.templateFileType || templateFileType;
      const finalConfig = parsedCertConfig || config;
      const isDocx = finalTemplateFileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                     finalTemplateFileType === "application/msword" ||
                     (finalTemplateUrl && typeof finalTemplateUrl === "string" && finalTemplateUrl.toLowerCase().endsWith(".docx"));

      const certDuration = cert.startDate && cert.endDate ? `${fmt(cert.startDate)} – ${fmt(cert.endDate)}` : "";

      if (isDocx) {
        const ordinalFormat = (d) => {
          if (!d) return "";
          const date = new Date(d);
          const day = date.getDate();
          const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
          return `${day}${suffix} ${date.toLocaleString('en-US', { month: 'long' })} ${date.getFullYear()}`;
        };

        await generateDocxCertificate({
          templateUrl: finalTemplateUrl,
          data: {
            ...cert,
            duration: certDuration,
            startdate: ordinalFormat(cert.startDate),
            signdate: ordinalFormat(cert.signDate)
          },
          fileName: `${cert.type?.replace(/\s+/g, "_") || "Document"}_${cert.name.replace(/\s+/g, "_")}${cert.serialNo ? `_${cert.serialNo}` : ""}.docx`,
        });
      } else {
        await generateCertificatePDF({
          templateUrl: finalTemplateUrl,
          fileType: finalTemplateFileType,
          data: {
            name: cert.name,
            role: cert.role,
            serialNo: cert.serialNo,
            issueDate: cert.issueDate,
            duration: certDuration,
          },
          config: finalConfig,
          fileName: `Certificate_${cert.name.replace(/\s+/g, "_")}_${cert.serialNo}.pdf`,
        });
      }

      toast.success("Certificate downloaded!");
    } catch (e) {
      console.error(e);
      const msg = e.userMessage || e.message || "Failed to re-download certificate";
      toast.error(msg);
    } finally {
      setRedownloadingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalId) return;
    try {
      const res = await axios.delete(`${API_URL}/certificates/${deleteModalId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) {
        toast.success("Certificate deleted successfully");
        setPastCerts((prev) => prev.filter((c) => c.id !== deleteModalId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete certificate");
    } finally {
      setDeleteModalId(null);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      // If end date is already set and is now BEFORE the new start date, clear it
      if (formData.endDate && value > formData.endDate) {
        toast.error("Start date cannot be after end date — end date cleared");
        setFormData((p) => ({ ...p, startDate: value, endDate: "" }));
        return;
      }
    }

    if (name === "endDate" && formData.startDate) {
      // Block end date that is before start date
      if (value < formData.startDate) {
        toast.error("End date cannot be before start date");
        return; // Don't update state — keep field at previous value
      }
    }

    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleConfigChange = (field, prop, value) => {
    setConfig((p) => ({
      ...p,
      [field]: {
        ...p[field],
        [prop]: ["x", "y", "size"].includes(prop) ? Number(value) : value,
      },
    }));
  };

  const canvasData = { ...formData, duration: getDurationString() };

  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    try {
      const res = await axios.put(`${API_URL}/certificates/settings/config`, { config, type: documentType }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) {
        toast.success("Coordinates saved successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to save coordinates");
    } finally {
      setIsSavingConfig(false);
    }
  };

  // ────────────────────────────────────────────────────
  // TABS HEADER
  // ────────────────────────────────────────────────────
  const TabsHeader = (
    <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 overflow-x-auto no-scrollbar">
      <div className="flex gap-2 min-w-max max-w-7xl mx-auto">
        {documentTypes.map(type => (
          <button
            key={type}
            onClick={() => {
              setDocumentType(type);
              fetchNextSerial(type); // Fetch new serial for the selected document type
            }}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              documentType === type 
              ? 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-400 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-zinc-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );

  // ────────────────────────────────────────────────────
  // HISTORY VIEW
  // ────────────────────────────────────────────────────
  if (view === "history") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
        {TabsHeader}
        <div className="p-4 sm:p-6 flex-1">
          <div className="max-w-3xl mx-auto space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("generate")}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <History size={20} /> Past Certificates
            </h1>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
              {pastCerts.length} records
            </span>
          </div>

          {/* Template loading notice */}
          {templateLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
              <Loader2 size={13} className="animate-spin" />
              Loading template from server — re-downloads will be available shortly…
            </div>
          )}

          {!templateUrl && !templateLoading && (
            <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
              ⚠️ No template saved. Go back and upload a template to enable re-downloads.
            </div>
          )}

          {/* List */}
          {loadingHistory ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-sky-500" size={32} />
            </div>
          ) : pastCerts.length === 0 ? (
            <div className="text-center py-16 text-gray-400 space-y-3">
              <Award size={48} className="mx-auto opacity-20" />
              <p className="text-sm">No certificates generated yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-2 py-0.5 rounded-lg">
                          {cert.serialNo}
                        </span>
                        <span className="text-xs text-gray-400">
                          Issued: {new Date(cert.issueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <p className="font-bold text-gray-800 dark:text-white truncate">{cert.name}</p>
                      <p className="text-sm text-gray-500 truncate">{cert.role} <span className="text-xs text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md ml-2">{cert.type || "Internship Certificate"}</span></p>
                      <p className="text-xs text-indigo-500 dark:text-indigo-400">
                        📅 {new Date(cert.startDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })} – {new Date(cert.endDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleRedownload(cert)}
                        disabled={!!redownloadingId || templateLoading || !templateUrl}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {redownloadingId === cert.id ? (
                          <><Loader2 size={14} className="animate-spin" /> Generating…</>
                        ) : (
                          <><Download size={14} /> Download</>
                        )}
                      </button>
                      <button
                        onClick={() => setDeleteModalId(cert.id)}
                        className="flex items-center justify-center p-2.5 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-xl transition"
                        title="Delete Certificate"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Delete Confirmation Modal ── */}
          {deleteModalId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600 dark:text-red-400">
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Certificate?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Are you sure you want to delete this certificate? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-zinc-950/50 flex gap-3 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => setDeleteModalId(null)}
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────
  // GENERATE VIEW
  // ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      {TabsHeader}
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <h1 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Award size={20} className="text-sky-500" /> Certificate Generator
        </h1>
        <div className="flex items-center gap-2">
          {templateUrl && (
            <button
              onClick={() => setShowPreviewSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-lg text-xs font-medium lg:hidden"
            >
              <Eye size={13} /> Preview
            </button>
          )}
          <button
            onClick={() => { setView("history"); loadHistory(); }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <History size={16} />
            <span className="hidden sm:inline">Past Certificates</span>
            <span className="sm:hidden">History</span>
          </button>
          <button
            onClick={() => setShowSettings((s) => !s)}
            className={`p-2 rounded-lg transition ${showSettings ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"}`}
            title="Text Coordinates"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ── Left: Form ── */}
          <div className="lg:col-span-4 space-y-4">

            {/* Template Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Template</h2>
                {templateUrl && !templateLoading && (
                  <button onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-sky-500 hover:text-sky-700 transition">
                    Change
                  </button>
                )}
              </div>

              {templateLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 p-3">
                  <Loader2 size={15} className="animate-spin" /> Loading saved template…
                </div>
              ) : !templateUrl ? (
                <label htmlFor="template-file"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500 text-center px-4">Tap to upload image or PDF template</p>
                </label>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <FileImage size={18} className="text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Template loaded ✓</p>
                    <p className="text-xs text-emerald-600/70 mt-0.5">Auto-saves — no need to re-upload</p>
                  </div>
                  {isUploadingTemplate && <Loader2 size={14} className="animate-spin text-emerald-600 ml-auto shrink-0" />}
                </div>
              )}
              <input ref={fileInputRef} id="template-file" type="file"
                className="hidden" accept="image/*,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleTemplateUpload}
              />
            </div>

            {/* Details Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
              <h2 className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Document Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input type="text" name="name" value={formData.name} onChange={handleInput}
                    className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase tracking-wide"
                    placeholder="JOHN DOE"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                    Role / Designation <span className="text-red-400">*</span>
                  </label>
                  <input type="text" name="role" value={formData.role} onChange={handleInput}
                    className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase tracking-wide"
                    placeholder="FRONTEND DEVELOPER INTERN"
                  />
                </div>
                {documentType === "Internship Offer Letter" ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                          Start Date <span className="text-red-400">*</span>
                        </label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInput}
                          className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                          Sign Date <span className="text-red-400">*</span>
                        </label>
                        <input type="date" name="signDate" value={formData.signDate} onChange={handleInput}
                          className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                        Skills <span className="text-red-400">*</span>
                      </label>
                      <input type="text" name="skills" value={formData.skills} onChange={handleInput}
                        className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase tracking-wide"
                        placeholder="E.G. FRONTEND TECHNOLOGIES"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Serial No.</label>
                      <div className="flex gap-1.5">
                        <input type="text" name="serialNo" value={formData.serialNo} onChange={handleInput}
                          className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                        />
                        <button onClick={() => fetchNextSerial(documentType)}
                          className="p-2.5 bg-gray-100 dark:bg-zinc-700 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-600 transition shrink-0"
                          title="Refresh serial"
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                        Description <span className="text-red-400">*</span>
                      </label>
                      <textarea name="desc" value={formData.desc} onChange={handleInput} rows={3}
                        className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                        placeholder="Enter description here..."
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">
                        Duration <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">From</p>
                          <input type="date" name="startDate" value={formData.startDate} onChange={handleInput}
                            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1">To</p>
                          <input type="date" name="endDate" value={formData.endDate} onChange={handleInput}
                            className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                          />
                        </div>
                      </div>
                      {getDurationString() && (
                        <div className="mt-2 flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg">
                          <span className="text-xs text-indigo-500 dark:text-indigo-400">📅 {getDurationString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Serial No.</label>
                        <div className="flex gap-1.5">
                          <input type="text" name="serialNo" value={formData.serialNo} onChange={handleInput}
                            className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                          />
                          <button onClick={fetchNextSerial}
                            className="p-2.5 bg-gray-100 dark:bg-zinc-700 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-600 transition shrink-0"
                            title="Refresh serial"
                          >
                            <RefreshCw size={13} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Issue Date</label>
                        <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInput}
                          className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isSaving}
                className="mt-5 w-full flex justify-center items-center gap-2 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 text-sm"
              >
                {isSaving
                  ? <><Loader2 size={16} className="animate-spin" /> Generating…</>
                  : <><Download size={16} /> Generate &amp; Download PDF</>
                }
              </button>
            </div>

            {/* Coordinate Settings */}
            {showSettings && !isDocx && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-orange-200 dark:border-orange-900 p-4 shadow-sm">
                <h2 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-3">🎯 Text Positions</h2>
                <p className="text-xs text-gray-400 mb-4">Adjust X, Y and font size for each field on your template.</p>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {Object.keys(config).map((field) => (
                    <div key={field} className="border-b border-gray-100 dark:border-zinc-800 pb-4 last:border-0">
                      <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">{field}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {["x", "y", "size"].map((p) => (
                          <div key={p}>
                            <label className="text-xs text-gray-400">{p === "size" ? "Size" : p.toUpperCase()}</label>
                            <input type="number" value={config[field][p]}
                              onChange={(e) => handleConfigChange(field, p, e.target.value)}
                              className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="text-xs text-gray-400">Align</label>
                          <select value={config[field].align || "center"}
                            onChange={(e) => handleConfigChange(field, "align", e.target.value)}
                            className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400">Style</label>
                          <select value={config[field].style || "bold"}
                            onChange={(e) => handleConfigChange(field, "style", e.target.value)}
                            className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700"
                          >
                            <option value="normal">Normal</option>
                            <option value="bold">Bold</option>
                            <option value="italic">Italic</option>
                            <option value="bold italic">Bold + Italic</option>
                          </select>
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs text-gray-400">Color</label>
                          <input type="color" value={config[field].color}
                            onChange={(e) => handleConfigChange(field, "color", e.target.value)}
                            className="w-full h-8 p-0 border-0 rounded-lg cursor-pointer"
                          />
                        </div>
                        <div className="col-span-3">
                          <label className="text-xs text-gray-400">Font Family</label>
                          <select value={config[field].font || "Arial"}
                            onChange={(e) => handleConfigChange(field, "font", e.target.value)}
                            className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700"
                          >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Bell MT">Bell MT</option>
                            <option value="Courier New">Courier New</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Helvetica">Helvetica</option>
                            <option value="Tahoma">Tahoma</option>
                            <option value="Trebuchet MS">Trebuchet MS</option>
                            <option value="Impact">Impact</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleSaveConfig}
                  disabled={isSavingConfig}
                  className="mt-4 w-full flex justify-center items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/40 dark:hover:bg-orange-900/60 dark:text-orange-300 font-medium rounded-xl transition disabled:opacity-50 text-sm"
                >
                  {isSavingConfig ? <Loader2 size={16} className="animate-spin" /> : "Save Default Positions"}
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Desktop Live Preview ── */}
          <div className="hidden lg:block lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm sticky top-20">
              <h2 className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Live Preview</h2>
              {templateUrl ? (
                isDocx ? (
                  <DocxLivePreview 
                    templateUrl={templateUrl} 
                    data={{
                      ...formData,
                      duration: getDurationString(),
                      startdate: formData.startDate ? (() => {
                        const d = new Date(formData.startDate);
                        const day = d.getDate();
                        const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
                        return `${day}${suffix} ${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
                      })() : "",
                      signdate: formData.signDate ? (() => {
                        const d = new Date(formData.signDate);
                        const day = d.getDate();
                        const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
                        return `${day}${suffix} ${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
                      })() : ""
                    }} 
                  />
                ) : (
                  <CertificateCanvas
                    templateUrl={templateUrl}
                    fileType={templateFileType}
                    data={{ ...formData, duration: getDurationString() }}
                    config={config}
                  />
                )
              ) : templateLoading ? (
                <div className="w-full aspect-[1.414/1] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-xl">
                  <Loader2 className="animate-spin text-gray-400" size={28} />
                </div>
              ) : (
                <div className="w-full aspect-[1.414/1] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-zinc-700 gap-3">
                  <Upload className="w-10 h-10 text-gray-300 dark:text-zinc-600" />
                  <p className="text-gray-400 dark:text-gray-500 text-sm text-center px-8">
                    Upload a certificate template to see live preview here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Preview Sheet ── */}
      {showPreviewSheet && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-zinc-900 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
            <h2 className="font-semibold text-gray-800 dark:text-white text-sm">Live Preview</h2>
            <button onClick={() => setShowPreviewSheet(false)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {isDocx ? (
              <DocxLivePreview 
                templateUrl={templateUrl} 
                data={{
                  ...formData,
                  duration: getDurationString(),
                  startdate: formData.startDate ? (() => {
                    const d = new Date(formData.startDate);
                    const day = d.getDate();
                    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
                    return `${day}${suffix} ${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
                  })() : "",
                  signdate: formData.signDate ? (() => {
                    const d = new Date(formData.signDate);
                    const day = d.getDate();
                    const suffix = ["th", "st", "nd", "rd"][(day % 10 > 3) ? 0 : (day % 100 - day % 10 != 10) * day % 10];
                    return `${day}${suffix} ${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
                  })() : ""
                }} 
              />
            ) : (
              <CertificateCanvas
                templateUrl={templateUrl}
                fileType={templateFileType}
                data={{ ...formData, duration: getDurationString() }}
                config={config}
              />
            )}
          </div>
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
            <button
              onClick={handleGenerate}
              disabled={isSaving}
              className="w-full flex justify-center items-center gap-2 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50"
            >
              {isSaving
                ? <><Loader2 size={16} className="animate-spin" /> Generating…</>
                : <><Download size={16} /> Generate &amp; Download PDF</>
              }
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
