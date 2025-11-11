"use client";

import React, { useState } from "react";
import { LayoutDashboard, User, LogIn, X, Menu } from "lucide-react";
import { PiComputerTowerFill, PiFlagBanner } from "react-icons/pi";
import { BiStats } from "react-icons/bi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoCreate } from "react-icons/io5";
import { MdCallToAction, MdReviews } from "react-icons/md";
import { FaCriticalRole } from "react-icons/fa";
import { CheckLine, User2 } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard /> },
  { label: "Hero Section", href: "/admin/banner", icon: <PiFlagBanner /> },
  { label: "Blogs", href: "/admin/blogs", icon: <BiStats /> },
  { label: "Our Clients", href: "/admin/our-clients", icon: <CheckLine /> },
  { label: "Invoices", href: "/admin/invoices", icon: <IoCreate /> },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: <PiComputerTowerFill />,
  },
  // { label: "Products", href: "/admin/final-cta", icon: <MdCallToAction /> },
  { label: "Admin Users", href: "/admin/users", icon: <User2 /> },
  { label: "Roles", href: "/admin/role", icon: <FaCriticalRole /> },
  // { label: "Permissions", href: "/admin/permission", icon: <MdCallToAction /> },
  { label: "Contacts", href: "/admin/contacted", icon: <MdCallToAction /> },
  { label: "Testimonial", href: "/admin/testimonial", icon: <MdReviews /> },
  // {
  //   label: "Career Management",
  //   href: "/admin/career-management",
  //   icon: <MdCallToAction />,
  // },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: <User />,
    section: "Account Pages",
  },
  {
    label: "Sign Out",
    href: "#",
    icon: <LogIn />,
    section: "Account Pages",
    isLogout: true, // 👈 add flag
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  // ✅ Logout handler
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/admin/login");
  };

  const groupedLinks = sidebarLinks.reduce((acc, link) => {
    const section = link.section || "Main";
    if (!acc[section]) acc[section] = [];
    acc[section].push(link);
    return acc;
  }, {});

  return (
    <>
      {/* Hamburger - Mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md bg-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static bg-gray-100 top-0 left-0 h-full w-64 shadow-md flex flex-col justify-between rounded-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center space-x-2 p-5">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-semibold">Admin SWS</span>
        </div>
        <hr className="border-gray-200 my-2" />

        {/* Navigation */}
        <nav className="flex-1 overflow-x-hidden overflow-y-auto">
          {Object.entries(groupedLinks).map(([section, links]) => (
            <div key={section}>
              {section !== "Main" && (
                <div className="mt-6 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section}
                </div>
              )}
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
  const Wrapper = isLogout ? "button" : Link; // 👈 Use button for logout

  return (
    <Wrapper
      href={isLogout ? undefined : href}
      onClick={onClick}
      className={`flex items-center space-x-3 px-5 py-2 rounded-xl mx-2 transition-colors cursor-pointer w-full text-left ${
        active
          ? "bg-indigo-50 text-indigo-700 font-semibold"
          : "text-foreground hover:bg-background"
      }`}
    >
      <span className={`${color || "text-gray-500"} w-5 h-5`}>{icon}</span>
      <span className="text-sm">{label}</span>
    </Wrapper>
  );
};

export default Sidebar;
