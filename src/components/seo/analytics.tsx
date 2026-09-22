import Script from "next/script";

/**
 * Google Analytics (GA4) — replace GA_MEASUREMENT_ID with your real ID.
 * Get it from https://analytics.google.com
 * Format: G-XXXXXXXXXX
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "GA_MEASUREMENT_ID";

export function GoogleAnalytics() {
  if (GA_ID === "GA_MEASUREMENT_ID") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
