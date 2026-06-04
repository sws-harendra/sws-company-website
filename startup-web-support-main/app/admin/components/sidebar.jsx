"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  BookOpen, 
  HeartHandshake, 
  Receipt, 
  Palette, 
  UserCog, 
  ShieldCheck, 
  Mail, 
  Users, 
  MessageSquareQuote,
  Award,
  X, 
  Menu 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../(main)/context/AuthContext";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard /> },
  { label: "Banner", href: "/admin/banner", icon: <ImageIcon /> },
  { label: "Blogs", href: "/admin/blogs", icon: <BookOpen /> },
  { label: "Our Clients", href: "/admin/our-clients", icon: <HeartHandshake /> },
  { label: "Invoices", href: "/admin/invoices", icon: <Receipt /> },
  { label: "Portfolio", href: "/admin/portfolio", icon: <Palette /> },
  { label: "Admin Users", href: "/admin/users", icon: <UserCog /> },
  { label: "Roles", href: "/admin/role", icon: <ShieldCheck /> },
  { label: "Contacts", href: "/admin/contacted", icon: <Mail /> },
  { label: "Our Teams", href: "/admin/ourteam", icon: <Users /> },
  { label: "Testimonial", href: "/admin/testimonial", icon: <MessageSquareQuote /> },
  { label: "Docs & Certificates", href: "/admin/certificates", icon: <Award /> },
  { label: "ID Cards", href: "/admin/id-cards", icon: <Award /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  const { user } = useAuth();
  const userPermissions = user?.permissions || [];

  const filteredLinks = sidebarLinks.filter((link) => {
    const permissionMap = {
      Blogs: "view_blog",
      Invoices: "view_invoices",
      Portfolio: "view_portfolio_item",
      "Our Clients": "view_clients",
      "Hero Section": "view_hero_section",
      "Our Teams": "view_our_team",
      "Admin Users": "manage_users",
      Roles: "manage_roles",
      Testimonial: "view_testimonials",
      Contacts: "view_contact",
    };

    const requiredPermission = permissionMap[link.label];
    return !requiredPermission || userPermissions.includes(requiredPermission);
  });

  const groupedLinks = filteredLinks.reduce((acc, link) => {
    const section = link.section || "Main Menu";
    if (!acc[section]) acc[section] = [];
    acc[section].push(link);
    return acc;
  }, {});

  return (
    <>
      {/* Custom CSS Injector to hide scrollbars cleanly */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hamburger - Mobile - Fully Theme Based & Adaptive */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-3 rounded-2xl shadow-xl bg-white dark:bg-zinc-900 text-[#1a4468] dark:text-[#029bd2] border border-zinc-200 dark:border-zinc-800 hover:scale-105 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-30 transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Compact and Thin (w-52) */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-52 flex flex-col justify-between z-40 transform transition-all duration-300 ease-in-out bg-white dark:bg-zinc-950 border-r border-zinc-200/50 dark:border-zinc-800/50 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Navigation Area with no-scrollbar */}
        <nav className="no-scrollbar flex-1 overflow-x-hidden overflow-y-auto py-5 px-2.5 space-y-5">
          {Object.entries(groupedLinks).map(([section, links]) => (
            <div key={section} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1.5">
                {section}
              </div>
              <div className="space-y-1">
                {links.map(({ label, href, icon, color, isLogout }) => (
                  <SidebarItem
                    key={label}
                    icon={icon}
                    label={label}
                    href={href}
                    color={color}
                    active={pathname === href}
                    onClick={() => {
                      setIsOpen(false);
                      if (isLogout) handleSignOut();
                    }}
                    isLogout={isLogout}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

const SidebarItem = ({
  icon,
  label,
  color,
  active,
  href,
  onClick,
  isLogout,
}) => {
  const Wrapper = isLogout ? "button" : Link;

  return (
    <Wrapper
      href={isLogout ? undefined : href}
      onClick={onClick}
      className={`group flex items-center space-x-2.5 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer w-full text-left relative overflow-hidden ${active
          ? "bg-gradient-to-r from-[#029bd2]/10 to-transparent dark:from-[#1a4468]/20 dark:to-transparent text-[#1a4468] dark:text-sky-300 font-bold border-l-4 border-[#029bd2] pl-3"
          : isLogout
            ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 pl-3 border-l-4 border-transparent hover:border-rose-500"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 hover:text-zinc-900 dark:hover:text-zinc-200 pl-3 border-l-4 border-transparent hover:border-[#029bd2]/50 hover:translate-x-1"
        }`}
    >
      <span className={`w-4 h-4 flex items-center justify-center transition-transform group-hover:scale-105 ${active
          ? "text-[#029bd2]"
          : isLogout
            ? "text-rose-500"
            : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
        }`}>
        {icon}
      </span>
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </Wrapper>
  );
};

export default Sidebar;
