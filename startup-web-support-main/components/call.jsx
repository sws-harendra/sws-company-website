import React from "react";
import { Phone } from "lucide-react"; // optional icon (install lucide-react if not already)
import Link from "next/link";

const Call = () => {
  return (
    <Link
      href="tel:+917479499718"
      className="fixed right-4 bottom-6 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-700 transition-all duration-300 z-50"
    >
      <Phone size={20} />
      <span className="font-medium">Call</span>
    </Link>
  );
};

export default Call;
