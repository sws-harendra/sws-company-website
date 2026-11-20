import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormModal from "@/components/PopupContactus";
import Call from "@/components/call";
import WhatsAppButton from "@/components/whatsapp";
import MetaPixel from "@/components/MetaPixel";
import TopBar from "@/components/TopBar";

export default function UserLayout({ children }) {
  return (
    <div>
      <MetaPixel />
      <div className="fixed right-4 bottom-10 z-50 flex flex-col items-end gap-4">
        <Call />
        <WhatsAppButton />
      </div>
      <TopBar />
      <Header />
      <ContactFormModal />
      {children}
      <Footer />
    </div>
  );
}
