import type { Metadata } from "next";
import "./globals.css";

import { BASE_PATH, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VinMat Education Games",
    template: "%s | VinMat Education Games",
  },
  description:
    "Free printable card and board games that help children practise maths, logic and strategic thinking through play.",
  applicationName: "VinMat Education Games",
  authors: [{ name: "VinMat", url: "https://vinmat.eu" }],
  category: "education",
  icons: {
    icon: `${BASE_PATH}/favicon.png`,
    shortcut: `${BASE_PATH}/favicon.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          data-goatcounter="https://vinmat.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
