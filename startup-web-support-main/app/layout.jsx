import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Head from "next/head";
import Script from "next/script";
import BackgroundPattern from "@/components/BackgroundPattern";
import SecurityInterceptor from "@/components/SecurityInterceptor";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Dancing+Script:wght@500;700&family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Lato:wght@300;400;700&family=Merriweather:ital,wght@0,300;0,400;0,700;1,300&family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SecurityInterceptor />
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
