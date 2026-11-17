"use client";

import React from "react";
import { Phone } from "lucide-react";
import Link from "next/link";
import * as fpixel from "@/lib/fpixel";

const Call = () => {
  const handleClick = () => {
    fpixel.event("Contact", {
      method: "Phone Call",
      content_name: "Floating Call Button",
    });
    fpixel.customEvent("CallClick", {
      phone: "+917479499718",
    });
  };

  return (
    <Link
      href="tel:+917479499718"
      onClick={handleClick}
      aria-label="Call us"
      className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <Phone size={24} />
    </Link>
  );
};

export default Call;
