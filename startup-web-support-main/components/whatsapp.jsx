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
      className="fixed right-4 bottom-20 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center"
    >
      <BsWhatsapp size={24} />
    </Link>
  );
};

export default WhatsAppButton;
