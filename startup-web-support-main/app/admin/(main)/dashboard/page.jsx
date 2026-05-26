"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Mail, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ArrowUpRight, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import contactService from "@/services/contact.service";
import blogService from "@/services/blog.service";
import clientService from "@/services/client.service";
import invoiceService from "@/services/invoice.service";
import portfolioService from "@/services/portfolio.service";
import axios from "axios";
import { API_URL } from "@/constants";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [serverOk, setServerOk] = useState(null);
  const [greetMsg, setGreetMsg] = useState("Welcome back");
  
  // Data States
  const [stats, setStats] = useState({
    leads: 0,
    invoices: 0,
    clients: 0,
    blogs: 0,
    portfolios: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    totalAmount: 0,
    paidCount: 0,
    unpaidCount: 0
  });

  // Calculate greeting message based on time of day
  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreetMsg("Good Morning");
    else if (hrs < 18) setGreetMsg("Good Afternoon");
    else setGreetMsg("Good Evening");
  }, []);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Parallel fetching of all stats from APIs
        const [
          leadsRes,
          blogsRes,
          clientsRes,
          invoicesRes,
          portfoliosRes
        ] = await Promise.allSettled([
          contactService.getAllContacts({ limit: 10 }),
          blogService.getAll(),
          clientService.getAll(),
          invoiceService.getAll({ limit: 100 }),
          portfolioService.getAll({ limit: 100 })
        ]);

        // Process Leads
        let leadsCount = 0;
        let recentLeadsList = [];
        if (leadsRes.status === "fulfilled") {
          const lData = leadsRes.value;
          const lList = Array.isArray(lData) 
            ? lData 
            : (lData?.data && Array.isArray(lData.data)) 
            ? lData.data 
            : [];
          leadsCount = lData?.total || lList.length || 0;
          recentLeadsList = lList.slice(0, 5); // Take top 5
        }

        // Process Blogs
        let blogsCount = 0;
        if (blogsRes.status === "fulfilled") {
          const bData = blogsRes.value;
          const bList = Array.isArray(bData) 
            ? bData 
            : (bData?.data && Array.isArray(bData.data)) 
            ? bData.data 
            : [];
          blogsCount = bData?.total || bList.length || 0;
        }

        // Process Clients
        let clientsCount = 0;
        if (clientsRes.status === "fulfilled") {
          const cData = clientsRes.value;
          const cList = Array.isArray(cData) 
            ? cData 
            : (cData?.data && Array.isArray(cData.data)) 
            ? cData.data 
            : [];
          clientsCount = cData?.total || cList.length || 0;
        }

        // Process Portfolios
        let portfoliosCount = 0;
        if (portfoliosRes.status === "fulfilled") {
          const pData = portfoliosRes.value;
          const pList = Array.isArray(pData) 
            ? pData 
            : (pData?.data && Array.isArray(pData.data)) 
            ? pData.data 
            : [];
          portfoliosCount = pData?.total || pList.length || 0;
        }

        // Process Invoices & Billing
        let invoicesCount = 0;
        let totalBill = 0;
        let paid = 0;
        let unpaid = 0;
        if (invoicesRes.status === "fulfilled") {
          const iData = invoicesRes.value;
          const iList = Array.isArray(iData) 
            ? iData 
            : (iData?.data && Array.isArray(iData.data)) 
            ? iData.data 
            : [];
          invoicesCount = iData?.total || iList.length || 0;

          iList.forEach(inv => {
            const amt = parseFloat(inv.amount || 0);
            totalBill += amt;
            if (inv.status?.toLowerCase() === "paid") paid++;
            else unpaid++;
          });
        }

        setStats({
          leads: leadsCount,
          blogs: blogsCount,
          clients: clientsCount,
          invoices: invoicesCount,
          portfolios: portfoliosCount
        });

        setRecentLeads(recentLeadsList);

        setBillingInfo({
          totalAmount: totalBill,
          paidCount: paid,
          unpaidCount: unpaid
        });

      } catch (err) {
        console.error("Dashboard parallel fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Check Backend Server Status
  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await axios.get(API_URL.replace(/\/api\/?$/, ""));
        if (res.status === 200) setServerOk(true);
        else setServerOk(false);
      } catch {
        setServerOk(false);
      }
    };
    checkServer();
  }, []);

  // Format currency helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col space-y-6 animate-pulse">
        {/* Header Loading Skeleton */}
        <div className="h-10 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        
        {/* Metrics Grid Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50" />
          ))}
        </div>

        {/* Column Grid Loading Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-72 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>

        {/* Table Loading Skeleton */}
        <div className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
      </div>
    );
  }

  // Calculate invoice completion percentage
  const totalInvs = billingInfo.paidCount + billingInfo.unpaidCount;
  const payCompletion = totalInvs > 0 ? Math.round((billingInfo.paidCount / totalInvs) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col space-y-6 transition-colors duration-300">
      {/* Greetings Block - Fade In Up */}
      <div className="animate-fade-in-up border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          {greetMsg}, <span className="text-[#029bd2]">Super Admin</span>
          <span className="animate-bounce">👋</span>
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Operational dashboard and client analytics overview for Startup Web Support.
        </p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

        {/* Card 1: Leads — sky blue overlapping circles */}
        <div className="animate-fade-in-up delay-75 relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 py-4 px-4">
          {/* Decorative shapes — only color in the card */}
          <svg className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="72" cy="24" r="28" fill="#0ea5e9" fillOpacity="0.18"/>
            <circle cx="88" cy="48" r="18" fill="#38bdf8" fillOpacity="0.12"/>
            <circle cx="60" cy="12" r="10" fill="#0284c7" fillOpacity="0.22"/>
          </svg>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500"/>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Leads</p>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{stats.leads}</p>
            <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3 h-3 text-emerald-400"/> +12% this week
            </p>
          </div>
        </div>

        {/* Card 2: Invoices — indigo triangles */}
        <div className="animate-fade-in-up delay-150 relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 py-4 px-4">
          <svg className="absolute -top-2 -right-2 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="96,0 96,56 40,0" fill="#6366f1" fillOpacity="0.16"/>
            <polygon points="96,30 96,80 46,30" fill="#818cf8" fillOpacity="0.12"/>
            <polygon points="70,0 96,0 96,26" fill="#4f46e5" fillOpacity="0.20"/>
          </svg>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500"/>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Invoices</p>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{stats.invoices}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">{formatCurrency(billingInfo.totalAmount)} billed</p>
          </div>
        </div>

        {/* Card 3: Clients — emerald hexagons */}
        <div className="animate-fade-in-up delay-225 relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 py-4 px-4">
          <svg className="absolute -top-3 -right-3 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="72,4 92,16 92,40 72,52 52,40 52,16" fill="#10b981" fillOpacity="0.18"/>
            <polygon points="84,44 96,52 96,68 84,76 72,68 72,52" fill="#34d399" fillOpacity="0.14"/>
            <polygon points="58,0 70,7 70,21 58,28 46,21 46,7" fill="#059669" fillOpacity="0.12"/>
          </svg>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500"/>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Clients</p>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{stats.clients}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Active accounts</p>
          </div>
        </div>

        {/* Card 4: Blogs — violet stacked diamonds */}
        <div className="animate-fade-in-up delay-300 relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 py-4 px-4">
          <svg className="absolute -top-2 -right-2 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="78,0 96,22 78,44 60,22" fill="#8b5cf6" fillOpacity="0.18"/>
            <polygon points="90,28 96,40 90,52 84,40" fill="#a78bfa" fillOpacity="0.22"/>
            <polygon points="62,8 76,24 62,40 48,24" fill="#7c3aed" fillOpacity="0.12"/>
          </svg>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500"/>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Blogs</p>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{stats.blogs}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Published articles</p>
          </div>
        </div>

        {/* Card 5: Portfolio — amber stars & rings */}
        <div className="animate-fade-in-up delay-375 relative overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 py-4 px-4">
          <svg className="absolute -top-2 -right-2 w-24 h-24 pointer-events-none" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="78" cy="18" r="22" fill="none" stroke="#f59e0b" strokeWidth="6" strokeOpacity="0.22"/>
            <circle cx="78" cy="18" r="12" fill="#f59e0b" fillOpacity="0.18"/>
            <circle cx="88" cy="44" r="8" fill="#fbbf24" fillOpacity="0.16"/>
            <circle cx="60" cy="6" r="5" fill="#d97706" fillOpacity="0.20"/>
          </svg>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500"/>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Portfolio</p>
            </div>
            <p className="text-2xl font-black text-zinc-900 dark:text-white">{stats.portfolios}</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold">Showcase items</p>
          </div>
        </div>

      </div>

      {/* Analytics Donut & Action Decks - Staggered fade */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Chart Card */}
        <div className="animate-fade-in-up delay-450 bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800/85 rounded-lg p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-4.5 h-4.5 text-[#029bd2]" /> Inquiry Activity Metrics
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Real-time visualization of client interest</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#029bd2]" />
              <span className="text-[10px] font-bold tracking-wide uppercase text-zinc-500">Lead Flow</span>
            </div>
          </div>

          {/* SVG Line / Area Graph */}
          <div className="flex-1 min-h-[140px] flex items-center justify-center relative w-full pt-4">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#029bd2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#029bd2" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/50" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/50" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="currentColor" className="text-zinc-100 dark:text-zinc-800/50" strokeWidth="1" strokeDasharray="3" />

              {/* Area Spline Path */}
              <path 
                d="M 0 120 C 50 110, 100 60, 150 70 C 200 80, 250 110, 300 50 C 350 -10, 400 60, 500 30 L 500 135 L 0 135 Z" 
                fill="url(#areaGrad)" 
              />

              {/* Line Spline Path */}
              <path 
                d="M 0 120 C 50 110, 100 60, 150 70 C 200 80, 250 110, 300 50 C 350 -10, 400 60, 500 30" 
                fill="none" 
                stroke="#029bd2" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />

              {/* Nodes / Dots */}
              <circle cx="150" cy="70" r="4.5" className="fill-white dark:fill-zinc-900 stroke-[#029bd2] transition-transform duration-300 hover:scale-125 cursor-pointer" strokeWidth="3" />
              <circle cx="300" cy="50" r="4.5" className="fill-white dark:fill-zinc-900 stroke-[#029bd2] transition-transform duration-300 hover:scale-125 cursor-pointer" strokeWidth="3" />
              <circle cx="500" cy="30" r="4.5" className="fill-white dark:fill-zinc-900 stroke-[#1a4468] dark:stroke-sky-400 transition-transform duration-300 hover:scale-125 cursor-pointer" strokeWidth="3" />
            </svg>
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 mt-3">
            <span>Jan - Mar</span>
            <span>Apr - Jun</span>
            <span>Jul - Sep</span>
            <span>Oct - Dec</span>
          </div>
        </div>

        {/* Invoice Ratio & Quick Shortcuts */}
        <div className="animate-fade-in-up delay-450 bg-white dark:bg-zinc-900 border border-zinc-200/85 dark:border-zinc-800/85 rounded-lg p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-[#1a4468] dark:text-[#029bd2]" /> Invoice Billing
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Collection progress ratio</p>
            </div>
          </div>

          {/* SVG Donut Chart */}
          <div className="flex-1 flex items-center justify-center min-h-[120px] relative py-4">
            <svg width="110" height="110" className="transform -rotate-90">
              {/* Track Ring */}
              <circle 
                cx="55" 
                cy="55" 
                r="40" 
                className="fill-none stroke-zinc-100 dark:stroke-zinc-800" 
                strokeWidth="10" 
              />
              {/* Radial Accent Ring */}
              <circle 
                cx="55" 
                cy="55" 
                r="40" 
                className="fill-none stroke-[#029bd2] transition-all duration-1000" 
                strokeWidth="10" 
                strokeDasharray={`${(payCompletion / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center leading-none text-center">
              <span className="text-xl font-black text-zinc-800 dark:text-white">{payCompletion}%</span>
              <span className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">Paid</span>
            </div>
          </div>

          {/* Action Decks shortcuts */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60">
            <Link 
              href="/admin/blogs" 
              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Plus className="w-3.5 h-3.5 text-[#029bd2]" /> Blog
            </Link>
            <Link 
              href="/admin/invoices" 
              className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#1a4468] to-[#029bd2] text-white hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow shadow-[#029bd2]/25"
            >
              <Plus className="w-3.5 h-3.5" /> Invoice
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Leads Table - Fade In Up */}
      <div className="animate-fade-in-up delay-450 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-lg shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/20 dark:bg-zinc-900/20">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Zap className="w-4.5 h-4.5 text-[#029bd2] animate-pulse" /> Active Customer Inquiries
            </h2>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">Real-time leads submitted via SWS contact forms</p>
          </div>
          <Link 
            href="/admin/contacted" 
            className="text-xs font-semibold text-[#029bd2] hover:text-[#1a4468] dark:hover:text-sky-300 flex items-center gap-1 group transition-colors"
          >
            Manage Inquiries <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {recentLeads.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">Subject</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 text-sm">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/25 transition-colors text-zinc-700 dark:text-zinc-300">
                    <td className="py-3.5 px-6 font-semibold text-zinc-950 dark:text-white">{lead.name || "N/A"}</td>
                    <td className="py-3.5 px-6 font-mono text-xs">{lead.email || "N/A"}</td>
                    <td className="py-3.5 px-6 truncate max-w-xs">{lead.subject || "No Subject"}</td>
                    <td className="py-3.5 px-6 text-xs text-zinc-450 dark:text-zinc-500 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-[#029bd2]" />
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle className="w-3 h-3" /> New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="p-4 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 dark:text-zinc-650 mb-3">
                <AlertCircle className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-450">No Inquiries Registered</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

