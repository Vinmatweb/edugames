import type { Metadata } from "next";

import { SITE_URL, type Locale } from "@/lib/site";

function absolute(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}/`;
}

export function pageMetadata({
  title,
  description,
  locale,
  path,
  alternatePath,
}: {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  alternatePath: string;
}): Metadata {
  const enPath = locale === "en" ? path : alternatePath;
  const csPath = locale === "cs" ? path : alternatePath;

  return {
    title,
    description,
    alternates: {
      canonical: absolute(path),
      languages: {
        en: absolute(enPath),
        cs: absolute(csPath),
        "x-default": absolute(enPath),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: absolute(path),
      siteName: "VinMat School Games",
      locale: locale === "en" ? "en_US" : "cs_CZ",
      alternateLocale: locale === "en" ? ["cs_CZ"] : ["en_US"],
    },
  };
}

