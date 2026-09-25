import type { Metadata } from "next";

import { LegalPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { legalCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: legalCopy.privacy.en.title,
  locale: "en",
  path: paths.privacy.en,
  alternatePath: paths.privacy.cs,
});

export default function Page() {
  return <LegalPage page="privacy" locale="en" />;
}

