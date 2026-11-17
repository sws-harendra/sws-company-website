"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import * as fpixel from "@/lib/fpixel";

function MetaPixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track route changes (SPA navigation)
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    fpixel.pageview();
  }, [pathname, searchParams]);

  // Global click delegate for WhatsApp and Phone links across the site
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // WhatsApp links
      if (href.includes("wa.me") || href.includes("api.whatsapp.com") || href.includes("whatsapp.com/send")) {
        fpixel.event("Contact", {
          method: "WhatsApp",
          url: href,
        });
        fpixel.customEvent("WhatsAppClick", {
          url: href,
        });
      }

      // Telephone links
      if (href.startsWith("tel:")) {
        fpixel.event("Contact", {
          method: "Phone Call",
          phone: href.replace("tel:", ""),
        });
        fpixel.customEvent("CallClick", {
          phone: href.replace("tel:", ""),
        });
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}

export default function MetaPixel() {
  const pathname = usePathname();

  // Safeguard: Never render or initialize Meta Pixel on admin panel
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fpixel.FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${fpixel.FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelTracker />
      </Suspense>
    </>
  );
}
