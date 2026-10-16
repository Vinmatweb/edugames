import Script from "next/script";

const publisherId = "ca-pub-4310805868565928";

export function AdsenseLoader() {
  return (
    <Script
      id="vinmat-adsense-loader"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}
