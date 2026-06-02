import React from "react";
import { Phone } from "lucide-react"; // optional icon (install lucide-react if not already)
import Link from "next/link";

const Call = () => {
  return (
    <Link
      href="tel:+917479499718"
      aria-label="Call us"
      className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <Phone size={24} />
    </Link>
  );
};

export default Call;
