import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/PopupContactus";
import Call from "@/components/call";
import WhatsAppButton from "@/components/whatsapp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* export const metadata = {
  title: "Softwere Devlopment Company in Patna | Startup Web Support",
  description: "Softwere Devlopment Company",
  keywords:"it company in patna, software company in patna, digital marketing agency in patna, web development in patna , website company in patna, India , top 5 company in patna , best company in patna ,top 5 mobile app development company in patna, software development, web development, mobile app development, custom software solutions, e-commerce development, digital marketing, SEO services, IT consulting",
};
 */
export default function RootLayout({ children }) {
  return (
    <div>
      <Call />
      <WhatsAppButton />
      <Header />
      {/* <ContactFormModal /> */}
      {children}
      <Footer />
    </div>
  );
}
