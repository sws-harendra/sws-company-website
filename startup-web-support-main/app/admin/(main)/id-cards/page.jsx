"use client";

import React, { useState, useEffect, useRef } from "react";
import IdCardCanvas from "./components/IdCardCanvas";
import { generateIdCardPDF } from "./utils/generateIdCard";
import {
  Upload, Settings, Download, RefreshCw, FileImage,
  History, ChevronLeft, Loader2, Award, X, Eye, Trash2, AlertTriangle, Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_serverurl || "http://localhost:8000/api";

const defaultFormData = () => ({
  name: "", role: "",
  idNumber: "",
  bloodGroup: "",
  phone: "",
  email: "",
  issueDate: new Date().toISOString().split("T")[0],
  photoUrl: "", // Employee Photo
});

const defaultConfig = {
  photo: { x: 50, y: 50, width: 200, height: 250 },
  name: { x: 300, y: 100, size: 42, color: "#1a1a1a", font: "Arial", align: "left", style: "bold" },
  role: { x: 300, y: 150, size: 28, color: "#444444", font: "Arial", align: "left", style: "bold" },
  idNumber: { x: 300, y: 200, size: 22, color: "#555555", font: "Arial", align: "left", style: "normal" },
  bloodGroup: { x: 300, y: 240, size: 22, color: "#cc0000", font: "Arial", align: "left", style: "bold" },
  phone: { x: 300, y: 280, size: 18, color: "#333333", font: "Arial", align: "left", style: "normal" },
  email: { x: 300, y: 320, size: 18, color: "#333333", font: "Arial", align: "left", style: "normal" },
  issueDate: { x: 780, y: 60, size: 18, color: "#333333", font: "Arial", align: "left", style: "bold" },
};

export default function IdCardPage() {
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // ── Template state (persists via backend) ──
  const [templateUrl, setTemplateUrl] = useState("");
  const [templateFileType, setTemplateFileType] = useState("");
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(true);

  // ── Form & UI ──
  const [formData, setFormData] = useState(defaultFormData());
  const [config, setConfig] = useState(defaultConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [view, setView] = useState("generate"); // "generate" | "history"
  const [showSettings, setShowSettings] = useState(false);
  const [showPreviewSheet, setShowPreviewSheet] = useState(false);

  const [pastCards, setPastCards] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [redownloadingId, setRedownloadingId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ── On mount: load saved template from backend ──
  useEffect(() => {
    const loadSettings = async () => {
      setTemplateLoading(true);
      try {
        const res = await axios.get(`${API_URL}/id-cards/settings`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        if (res.data.success && res.data.setting) {
          const setting = res.data.setting;
          if (setting.config) {
            let dbConfig = setting.config;
            if (typeof dbConfig === "string") {
              try { dbConfig = JSON.parse(dbConfig); } catch (e) { dbConfig = {}; }
            }

            const merged = { ...defaultConfig };
            for (const key of Object.keys(defaultConfig)) {
              if (dbConfig[key]) {
                merged[key] = { ...defaultConfig[key], ...dbConfig[key] };
              }
            }
            setConfig(merged);
          }

          if (setting.templateUrl) {
            const url = setting.templateUrl;
            if (url.startsWith("http://") || url.startsWith("https://")) {
              setTemplateUrl(url);
              setTemplateFileType(res.data.setting.templateFileType || "image/png");
            } else {
              setTemplateUrl("");
              setTemplateFileType("");
            }
          }
        }
      } catch (e) {
        console.error("Could not load ID card settings", e);
      } finally {
        setTemplateLoading(false);
      }
    };
    loadSettings();
    fetchNextSerial();
  }, []);

  useEffect(() => {
    if (view === "history") {
      loadHistory();
    }
  }, [view]);

  const fetchNextSerial = async () => {
    try {
      const res = await axios.get(`${API_URL}/id-cards/next-serial`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success)
        setFormData((p) => ({ ...p, idNumber: res.data.nextSerialNo }));
    } catch {
      toast.error("Could not fetch ID number");
    }
  };

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API_URL}/id-cards`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) setPastCards(res.data.idCards);
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

    const localUrl = URL.createObjectURL(file);
    setTemplateUrl(localUrl);
    setTemplateFileType(file.type);

    setIsUploadingTemplate(true);
    try {
      const fd = new FormData();
      fd.append("template", file);
      const res = await axios.post(`${API_URL}/id-cards/settings/template`, fd, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setTemplateUrl(res.data.templateUrl);
        setTemplateFileType(res.data.templateFileType);
        toast.success("Template saved!");
      }
    } catch {
      toast.error("Template preview ready, but server save failed");
    } finally {
      setIsUploadingTemplate(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Upload Employee Photo → backend ──
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setFormData((p) => ({ ...p, photoUrl: localUrl }));
    setIsUploadingPhoto(true);

    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await axios.post(`${API_URL}/id-cards/upload-photo`, fd, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setFormData((p) => ({ ...p, photoUrl: res.data.photoUrl }));
        toast.success("Photo uploaded successfully!");
      }
    } catch {
      toast.error("Photo upload failed");
      setFormData((p) => ({ ...p, photoUrl: "" })); // revert
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };

  // ── Generate current ID Card ──
  const handleGenerate = async () => {
    const { name, role, idNumber, issueDate } = formData;
    if (!name || !role || !idNumber || !issueDate) {
      toast.error("Please fill Name, Role, ID Number, and Issue Date");
      return;
    }
    if (!templateUrl) {
      toast.error("Please upload an ID Card template first");
      return;
    }

    setIsSaving(true);
    try {
      await axios.post(
        `${API_URL}/id-cards`,
        { ...formData, templateUrl, templateFileType, config },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      axios.put(
        `${API_URL}/id-cards/settings/config`,
        { config },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      ).catch(e => console.error("Auto-save config failed:", e));

      await generateIdCardPDF({
        templateUrl,
        fileType: templateFileType,
        data: formData,
        config,
        fileName: `ID_Card_${name.replace(/\s+/g, "_")}_${idNumber}.pdf`,
      });

      toast.success("ID Card generated and downloaded!");
      setFormData(defaultFormData());
      fetchNextSerial();
      setShowPreviewSheet(false);
    } catch (e) {
      console.error(e);
      const msg = e.response?.data?.message || e.userMessage || e.message || "Failed to generate ID Card";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Re-download a past ID card ──
  const handleRedownload = async (card) => {
    if (templateLoading) {
      toast.error("Template is still loading, please wait…");
      return;
    }
    if (!templateUrl) {
      toast.error("No template found. Please go back and upload a template first.");
      return;
    }

    setRedownloadingId(card.id);
    try {
      let parsedConfig = card.config;
      if (typeof parsedConfig === "string") {
        try { parsedConfig = JSON.parse(parsedConfig); } catch (e) { parsedConfig = null; }
      }

      const finalTemplateUrl = card.templateUrl || templateUrl;
      const finalTemplateFileType = card.templateFileType || templateFileType;
      const finalConfig = parsedConfig || config;

      await generateIdCardPDF({
        templateUrl: finalTemplateUrl,
        fileType: finalTemplateFileType,
        data: {
          name: card.name,
          role: card.role,
          idNumber: card.idNumber,
          bloodGroup: card.bloodGroup,
          phone: card.phone,
          email: card.email,
          issueDate: card.issueDate,
          photoUrl: card.photoUrl,
        },
        config: finalConfig,
        fileName: `ID_Card_${card.name.replace(/\s+/g, "_")}_${card.idNumber}.pdf`,
      });

      toast.success("ID Card downloaded!");
    } catch (e) {
      console.error(e);
      const msg = e.userMessage || e.message || "Failed to re-download ID Card";
      toast.error(msg);
    } finally {
      setRedownloadingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalId) return;
    try {
      const res = await axios.delete(`${API_URL}/id-cards/${deleteModalId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.data.success) {
        toast.success("ID Card deleted successfully");
        setPastCards((prev) => prev.filter((c) => c.id !== deleteModalId));
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete ID Card");
    } finally {
      setDeleteModalId(null);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleConfigChange = (field, prop, value) => {
    setConfig((p) => ({
      ...p,
      [field]: {
        ...p[field],
        [prop]: ["x", "y", "size", "width", "height"].includes(prop) ? Number(value) : value,
      },
    }));
  };

  const handleSaveConfig = async () => {
    setIsSavingConfig(true);
    try {
      const res = await axios.put(`${API_URL}/id-cards/settings/config`, { config }, {
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
  // HISTORY VIEW
  // ────────────────────────────────────────────────────
  if (view === "history") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-6 flex flex-col">
        <div className="max-w-3xl mx-auto space-y-5 w-full">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("generate")}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <History size={20} /> Past ID Cards
            </h1>
            <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
              {pastCards.length} records
            </span>
          </div>

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
          ) : pastCards.length === 0 ? (
            <div className="text-center py-16 text-gray-400 space-y-3">
              <Award size={48} className="mx-auto opacity-20" />
              <p className="text-sm">No ID Cards generated yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {card.photoUrl ? (
                       <img src={card.photoUrl} alt="Employee" className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-zinc-700" />
                    ) : (
                       <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-400"><ImageIcon size={20}/></div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-2 py-0.5 rounded-lg">
                          {card.idNumber}
                        </span>
                        <span className="text-xs text-gray-400">
                          Issued: {new Date(card.issueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <p className="font-bold text-gray-800 dark:text-white truncate">{card.name}</p>
                      <p className="text-sm text-gray-500 truncate">{card.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRedownload(card)}
                      disabled={!!redownloadingId || templateLoading || !templateUrl}
                      className="p-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-sm font-medium transition disabled:opacity-50"
                      title="Download"
                    >
                      {redownloadingId === card.id ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    </button>
                    <button
                      onClick={() => setDeleteModalId(card.id)}
                      className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400 rounded-xl transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Delete Confirm Modal */}
          {deleteModalId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-600">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-lg font-bold">Delete ID Card?</h3>
                <p className="text-sm text-gray-500">Are you sure you want to delete this record? This action cannot be undone.</p>
                <div className="flex gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <button onClick={() => setDeleteModalId(null)} className="flex-1 py-2 bg-gray-100 dark:bg-zinc-800 rounded-xl font-medium">Cancel</button>
                  <button onClick={confirmDelete} className="flex-1 py-2 bg-red-600 text-white rounded-xl font-medium">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────
  // GENERATE VIEW
  // ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <h1 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Award size={20} className="text-sky-500" /> ID Card Generator
        </h1>
        <div className="flex items-center gap-2">
          {templateUrl && (
            <button onClick={() => setShowPreviewSheet(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-lg text-xs font-medium lg:hidden">
              <Eye size={13} /> Preview
            </button>
          )}
          <button onClick={() => { setView("history"); loadHistory(); }} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg rounded-xl text-xs sm:text-sm font-semibold transition-all">
            <History size={16} />
            <span className="hidden sm:inline">Past ID Cards</span>
            <span className="sm:hidden">History</span>
          </button>
          <button onClick={() => setShowSettings((s) => !s)} className={`p-2 rounded-lg transition ${showSettings ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600" : "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700"}`}>
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
                  <button onClick={() => fileInputRef.current?.click()} className="text-xs text-sky-500 hover:text-sky-700">Change</button>
                )}
              </div>
              {templateLoading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 p-3"><Loader2 size={15} className="animate-spin" /> Loading…</div>
              ) : !templateUrl ? (
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <p className="text-xs text-gray-500 text-center px-4">Tap to upload template</p>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*,application/pdf" onChange={handleTemplateUpload} />
                </label>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <FileImage size={18} className="text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-emerald-700">Template loaded ✓</p>
                  </div>
                  {isUploadingTemplate && <Loader2 size={14} className="animate-spin text-emerald-600 ml-auto shrink-0" />}
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*,application/pdf" onChange={handleTemplateUpload} />
                </div>
              )}
            </div>

            {/* Details Form */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
              <h2 className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Employee Details</h2>
              <div className="space-y-3">
                {/* Photo Upload */}
                <div className="flex flex-col items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-950/50">
                  {formData.photoUrl ? (
                    <div className="relative group">
                      <img src={formData.photoUrl} alt="Employee" className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-md" />
                      <button onClick={() => setFormData(p => ({...p, photoUrl: ""}))} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm"><X size={14}/></button>
                      {isUploadingPhoto && <div className="absolute inset-0 bg-white/50 dark:bg-black/50 rounded-full flex items-center justify-center"><Loader2 size={20} className="animate-spin text-sky-600" /></div>}
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-24 h-24 bg-white dark:bg-zinc-800 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-full cursor-pointer hover:border-sky-500 hover:text-sky-500 transition text-gray-400">
                      <ImageIcon size={24} className="mb-1" />
                      <span className="text-[10px] font-medium">Upload</span>
                      <input ref={photoInputRef} type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                  )}
                  <p className="text-[11px] text-gray-400 mt-2 text-center">Portrait photo (Square/Vertical recommended)</p>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Full Name <span className="text-red-400">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase" placeholder="JOHN DOE" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Designation <span className="text-red-400">*</span></label>
                  <input type="text" name="role" value={formData.role} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase" placeholder="SOFTWARE ENGINEER" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <div>
                     <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Blood Group</label>
                     <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700 uppercase" placeholder="O+" />
                   </div>
                   <div>
                     <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Phone Number</label>
                     <input type="text" name="phone" value={formData.phone} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700" placeholder="+1 234 567 8900" />
                   </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700" placeholder="john.doe@company.com" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">ID Number (Serial)</label>
                    <div className="flex gap-1.5">
                      <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-xs font-mono focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700" />
                      <button onClick={fetchNextSerial} className="p-2.5 bg-gray-100 dark:bg-zinc-700 rounded-xl hover:bg-gray-200 transition shrink-0" title="Refresh"><RefreshCw size={13} /></button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-zinc-400 block mb-1">Issue Date</label>
                    <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInput} className="w-full px-3 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-sky-500 outline-none dark:bg-zinc-800 dark:border-zinc-700" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate} disabled={isSaving || isUploadingPhoto}
                className="mt-5 w-full flex justify-center items-center gap-2 px-4 py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 text-sm"
              >
                {isSaving ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Download size={16} /> Generate &amp; Download</>}
              </button>
            </div>

            {/* Coordinate Settings */}
            {showSettings && (
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-orange-200 dark:border-orange-900 p-4 shadow-sm">
                <h2 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-3">🎯 Coordinates</h2>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {Object.keys(config).map((field) => (
                    <div key={field} className="border-b border-gray-100 dark:border-zinc-800 pb-4 last:border-0">
                      <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2">{field}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {["x", "y"].map((p) => (
                          <div key={p}>
                            <label className="text-[10px] text-gray-400">{p.toUpperCase()}</label>
                            <input type="number" value={config[field][p]} onChange={(e) => handleConfigChange(field, p, e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700" />
                          </div>
                        ))}
                        {field === "photo" ? (
                           <>
                             <div>
                               <label className="text-[10px] text-gray-400">WIDTH</label>
                               <input type="number" value={config[field].width} onChange={(e) => handleConfigChange(field, "width", e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700" />
                             </div>
                             <div>
                               <label className="text-[10px] text-gray-400">HEIGHT</label>
                               <input type="number" value={config[field].height} onChange={(e) => handleConfigChange(field, "height", e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700" />
                             </div>
                           </>
                        ) : (
                          <>
                            <div>
                              <label className="text-[10px] text-gray-400">SIZE</label>
                              <input type="number" value={config[field].size} onChange={(e) => handleConfigChange(field, "size", e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700" />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400">ALIGN</label>
                              <select value={config[field].align || "center"} onChange={(e) => handleConfigChange(field, "align", e.target.value)} className="w-full px-2 py-1.5 border rounded-lg text-xs dark:bg-zinc-800 dark:border-zinc-700">
                                <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
                              </select>
                            </div>
                            <div className="col-span-1">
                              <label className="text-[10px] text-gray-400">COLOR</label>
                              <input type="color" value={config[field].color} onChange={(e) => handleConfigChange(field, "color", e.target.value)} className="w-full h-8 p-0 border-0 rounded-lg cursor-pointer" />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleSaveConfig} disabled={isSavingConfig} className="mt-4 w-full flex justify-center items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-xl transition text-sm">
                  {isSavingConfig ? <Loader2 size={16} className="animate-spin" /> : "Save Default Positions"}
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Live Preview ── */}
          <div className="hidden lg:block lg:col-span-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm sticky top-20">
              <h2 className="text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Live Preview</h2>
              {templateUrl ? (
                <IdCardCanvas templateUrl={templateUrl} fileType={templateFileType} data={formData} config={config} />
              ) : templateLoading ? (
                <div className="w-full aspect-[1/1.4] flex items-center justify-center bg-gray-50 dark:bg-zinc-800 rounded-xl"><Loader2 className="animate-spin text-gray-400" size={28} /></div>
              ) : (
                <div className="w-full aspect-[1/1.4] bg-gray-50 dark:bg-zinc-800 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-zinc-700 gap-3">
                  <Upload className="w-10 h-10 text-gray-300" />
                  <p className="text-gray-400 text-sm text-center px-8">Upload a template to see preview</p>
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
            <h2 className="text-base font-bold text-gray-800 dark:text-white flex items-center gap-2"><Eye size={18} /> Preview</h2>
            <button onClick={() => setShowPreviewSheet(false)} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-500 hover:text-gray-700"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
            {templateUrl ? <IdCardCanvas templateUrl={templateUrl} fileType={templateFileType} data={formData} config={config} /> : null}
          </div>
        </div>
      )}
    </div>
  );
}
