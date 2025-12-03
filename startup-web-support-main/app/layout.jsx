import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Head from "next/head";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Softwere Devlopment Company in Patna | Startup Web Support",
  description: "Softwere Devlopment Company",
  keywords: [
    "it company in patna",
    "software company in patna",
    "digital marketing agency Patna",
    "web development company Bihar",
    "best it company in patna",
    "mobile app development company",
    "software development company",
    "mobile app development company India",
    "app development agency",
    "web application development company",
    "custom web development services",
    "internship in patna",
    "internship training in patna",
    "industrial training Patna",
    "IT Internship Training In Patna",
    "IT Internship",
    "IT internship program",
    "IT internship training",
    "web development company in patna",
    "website development company in patna",
    "web development in patna",
    "Web development company Patna",
    "website development in patna",
    "Best web development company in Patna",
    "web development company",
    "website development",
    "web development services",
    "eCommerce Development",
    "ERP Development",
    "development services",
    "CMS Development",
    "domain hosting Patna",
    "domain registration Patna",
    "domain hosting",
    "domain hosting company India",
    "domain hosting services",
    "domain hosting with email",
    "domain hosting for small business",
    "domain registration & hosting",
    "web hosting & domain",
    "cheap domain hosting India",
    "domain and hosting services",
    "mobile app development in patna",
    "app developer in patna",
    "mobile app development company in Bihar",
    "Mobile App Development Company in Patna",
    "mobile app development",
    "Mobile App Development Company",
    "App Development Company",
    "Android App Development",
    "Flutter app development",
    "Mobile App Development Services",
    "iOS App Development",
    "Cross Platform App Development",
    "app development services",
    "React Native app development",
    "e-commerce app development",
    "custom mobile app development",
    "hybrid app development",
    "Native Mobile App Development",
    "Custom App Development Company",
    "mobile application development company",
    "Kotlin app development",
    "Cross-Platform Mobile App Development",
    "Swift app development",
    "education mobile apps",
    "cost-effective mobile app development",
    "finance app development",
    "enterprise mobile app solutions",
    "school management system",
    "school management software",
    "school ERP",
    "school ERP software",
    "school management software in India",
    "school information system",
    "school administration software",
    "school management system India",
    "parent teacher communication app",
    "online fee management system",
    "school management system with mobile app",
    "attendance tracking software for schools",
    "cloud-based school management system",
    "ITI institute website development",
    "ITI website development services",
    "school website design",
    "school website creation",
    "school website development",
    "features of a good school website",
    "school website CMS",
    "responsive school website",
    "hostel management system",
    "hostel management software",
    "hostel management application",
    "hostel software",
    "hostel attendance system",
    "hostel mess management software",
    "hostel system software",
    "Data science internship",
    "Machine learning internship",
    "Internship for BCA students",
    "Software development internship",
    "Internship for MCA students",
    "Web development internship",
    "Mobile app development internship",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11559226606"
        />

        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11559226606');
          `}
        </Script>

        {children}
        <Toaster />
      </body>
    </html>
  );
}
