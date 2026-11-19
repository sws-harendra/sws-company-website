"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Award,
  Zap,
  ArrowRight,
  ExternalLink,
  Star,
  Users,
} from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function MarketedByProfileSection({ marketer }) {
  if (!marketer) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello ${marketer.name}! I am visiting your Startup Web Support marketing partner page and would like to get a quote / consultation for my project.`,
  );
  const whatsappUrl = `https://wa.me/${marketer.whatsapp}?text=${whatsappMessage}`;
  const phoneUrl = `tel:${marketer.phone.replace(/\s+/g, "")}`;
  const emailUrl = `mailto:${marketer.email}?subject=Project Consultation via ${marketer.name} (SWS Partner)`;

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-b from-slate-50 via-sky-50/40 to-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Co-branding Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Official Marketing & Strategic Partnership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Marketed by <span className="text-blue-600">{marketer.name}</span>
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Representing{" "}
            <strong className="text-slate-900">Startup Web Support</strong> —
            empowering your business with end-to-end software, web & mobile
            development, and data-driven marketing.
          </p>
        </div>

        {/* Profile & Main Brand Co-Branding Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left / Main Profile Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
              <div>
                {/* Profile Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-6 border-b border-slate-100">
                  {/* Avatar / Photo */}
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
                      {marketer.avatar && marketer.avatar.startsWith("/") ? (
                        <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-2">
                          <Image
                            src={marketer.avatar}
                            alt={marketer.name}
                            width={96}
                            height={96}
                            className="object-contain max-h-16"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                          {marketer.avatarFallback || "SWS"}
                        </div>
                      )}
                    </div>
                    {marketer.verified && (
                      <div
                        className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white rounded-full p-1 shadow-md"
                        title="Verified Partner"
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Name and Designation */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {marketer.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified SWS Partner
                      </span>
                    </div>

                    <p className="text-sm font-medium text-blue-600 mt-1">
                      {marketer.title}
                    </p>
                  </div>
                </div>

                {/* Marketer Bio / Message */}
                <div className="py-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Message from your Marketing Partner
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    &ldquo;{marketer.bio}&rdquo;
                  </p>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Why Consult Through This Partner?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {marketer.highlights?.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct CTAs */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                >
                  <BsWhatsapp className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </Link>

                <Link
                  href={phoneUrl}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {marketer.phone}</span>
                </Link>

                {marketer.email && (
                  <Link
                    href={emailUrl}
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-4 py-3 rounded-xl transition-all text-sm"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4 text-slate-600" />
                    <span className="hidden sm:inline">Email</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: Main Brand Credibility & Exclusive Partner Offer */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Main Brand Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                      Core Technology Provider
                    </span>
                    <h4 className="text-xl font-bold text-white mt-0.5">
                      Startup Web Support
                    </h4>
                    <p className="text-xs text-slate-300">
                      Software Development & IT Solutions Company
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shrink-0 shadow-md">
                    <Image
                      src="/sws-logo.png"
                      alt="Startup Web Support Logo"
                      width={60}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Exclusive Partner Offer */}
                {marketer.exclusiveOffer && (
                  <div className="my-6 p-5 rounded-xl bg-gradient-to-br from-blue-600/30 via-sky-500/20 to-transparent border border-sky-400/30 backdrop-blur-sm">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-semibold mb-2">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>{marketer.exclusiveOffer.badge}</span>
                    </div>
                    <h5 className="text-sm sm:text-base font-bold text-white mb-1">
                      {marketer.exclusiveOffer.headline}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {marketer.exclusiveOffer.description}
                    </p>
                    {marketer.exclusiveOffer.code && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">
                          Referral Code:
                        </span>
                        <code className="text-xs font-mono font-bold bg-white/10 text-sky-300 px-2 py-0.5 rounded border border-white/10">
                          {marketer.exclusiveOffer.code}
                        </code>
                      </div>
                    )}
                  </div>
                )}

                {/* Partner Stats */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {marketer.stats?.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                    >
                      <div className="text-lg sm:text-xl font-extrabold text-sky-400">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Assurance Note */}
              <div className="pt-6 mt-6 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Verified Direct Booking Channel</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
