import React from "react";
import { MessageCircle } from "lucide-react"; // WhatsApp-like icon
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = () => {
  const phoneNumber = "7479499718"; // replace with your WhatsApp number (without +)
  const message = "Hello! I’d like to know more about your services."; // prefilled message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp" // <-- important for screen readers
      className="bg-green-500 text-white p-4 rounded-full shadow-lg
                 hover:bg-green-600 transition-all duration-300 flex items-center justify-center
                 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      <BsWhatsapp size={24} aria-hidden="true" /> {/* hide icon from screen readers */}
    </Link>
  );
  
};

export default WhatsAppButton;
