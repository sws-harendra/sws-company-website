import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Head from "next/head";
import Script from "next/script";
import BackgroundPattern from "@/components/BackgroundPattern";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Software Devlopment Company in Patna & IT Company in Patna ",
//   description: "Softwere Devlopment Company",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackgroundPattern />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GTM-TP28PFB8"
        />

        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-TP28PFB8');
          `}
        </Script>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
