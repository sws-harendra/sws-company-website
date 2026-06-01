"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserService } from "@/services/userService";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newVal = !prev;
      localStorage.setItem("admin-theme", newVal ? "dark" : "light");
      if (newVal) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newVal;
    });
  };

  async function submitForgotPassword(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const email = e.target.email.value;

    try {
      const res = await UserService.forgotPassword(email);
      toast.success(res.message || "Password reset link sent!");
      router.push("/admin/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <div
        className={cn(
          "fixed inset-0 w-screen h-screen overflow-hidden flex flex-col md:flex-row items-stretch select-none z-30"
        )}
      >
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute top-6 right-6 z-40 p-3 rounded-full bg-gradient-to-br from-white to-zinc-100 dark:bg-gradient-to-br from-[#1a4468] to-[#102c44] dark:border-zinc-800/50 backdrop-blur-md shadow-md text-zinc-700 dark:text-zinc-300 hover:text-[#029bd2] dark:hover:text-[#029bd2] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Toggle System Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" />
          ) : (
            <Moon className="w-5 h-5 text-[#1a4468]" />
          )}
        </button>

        <motion.div
          initial={isMobile ? { y: -60, opacity: 0 } : { x: -100, opacity: 0 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative z-10 overflow-hidden bg-gradient-to-br from-[#1a4468] via-[#102c44] to-[#0a1b2a] text-white flex flex-col justify-between items-center transition-colors duration-500",
            "w-full h-[40vh] p-6 shadow-lg",
            "md:absolute md:left-0 md:top-0 md:w-[58vw] md:h-full md:p-12 lg:p-16"
          )}
          style={{
            clipPath: isMobile
              ? "polygon(0 0, 100% 0, 100% 74%, 0 92%)"
              : "polygon(0 0, 98% 0, 72% 100%, 0 100%)"
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#029bd2]/40 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_35%_50%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="relative z-10 my-auto flex flex-col items-center gap-4 md:gap-6 text-center transition-all duration-300 md:-translate-x-14 lg:-translate-x-24">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative cursor-pointer group"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#029bd2] to-[#1a4468] opacity-20 blur-lg animate-pulse" />
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/5 border border-white/10 p-4 shadow-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:border-white/20">
                <Image
                  src="/sws-logo.png"
                  alt="SWS Logo Large"
                  width={100}
                  height={100}
                  className="object-contain drop-shadow-[0_4px_10px_rgba(2,155,210,0.25)]"
                  priority
                />
              </div>
            </motion.div>
            <div className="space-y-1.5">
              <h2 className="text-lg md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent leading-none">
                Startup Web Support
              </h2>
              <p className="text-[9px] md:text-[10px] font-extrabold tracking-widest text-[#029bd2] uppercase">
                Account Recovery
              </p>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path
              d={isMobile ? "M 100,73 L 0,91" : "M 97.2,0 L 71.2,100"}
              stroke={isDark ? "rgba(2, 155, 210, 0.85)" : "#029bd2"}
              strokeWidth={isMobile ? "0.4" : "0.3"}
              fill="none"
              strokeDasharray="20 80"
              animate={{ strokeDashoffset: [-100, 100] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={isMobile ? { y: 60, opacity: 0 } : { x: 100, opacity: 0 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative z-10 flex flex-col justify-center items-center transition-colors duration-500 bg-transparent backdrop-blur-none",
            "w-full h-[60vh] overflow-y-auto pt-4 pb-8 px-8 sm:px-12",
            "md:w-[42vw] md:ml-[58vw] md:h-full md:py-16 md:pr-16 md:pl-8 lg:py-24 lg:pr-24 lg:pl-14"
          )}
        >
          <div className="w-full max-w-md space-y-8 my-auto">
            <div className="space-y-2 text-center md:text-left -mt-18 md:-mt-16">
              <Link href="/admin/login" className="inline-flex items-center text-[10px] font-extrabold tracking-widest text-zinc-400 hover:text-[#029bd2] uppercase transition-colors mb-4 gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950 dark:text-white leading-none">
                Forgot Password
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={submitForgotPassword} className="space-y-5">
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="text-zinc-700 dark:text-zinc-300 font-semibold text-xs tracking-wider uppercase"
                  >
                    Email Address
                  </FieldLabel>
                  <div className="relative flex items-center group mt-1.5">
                    <Mail className="absolute left-4 w-4.5 h-4.5 text-zinc-400 dark:text-zinc-500 transition-colors group-focus-within:text-[#029bd2]" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@startupwebsupport.com"
                      required
                      className="pl-12 h-12 border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 rounded-2xl focus-visible:ring-4 focus-visible:ring-[#029bd2]/10 focus-visible:border-[#029bd2] focus-visible:shadow-[0_4px_20px_rgba(2,155,210,0.12)] transition-all duration-300 text-sm outline-none"
                    />
                  </div>
                </Field>

                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="relative overflow-hidden rounded-2xl shadow-lg shadow-[#029bd2]/10 hover:shadow-[#029bd2]/25 transition-all duration-300 pt-2"
                >
                  <Button
                    type="submit"
                    disabled={loading}
                    className="relative w-full h-12 bg-gradient-to-r from-[#1a4468] via-[#102d45] to-[#029bd2] hover:opacity-95 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#029bd2]/20 overflow-hidden"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-4.5 h-4.5" />
                      </>
                    )}
                    <motion.span
                      className="absolute -left-[50%] top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                      animate={{ left: ["-50%", "150%"] }}
                      transition={{ duration: 2.2, delay: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 5.5 }}
                    />
                  </Button>
                </motion.div>
              </FieldGroup>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
