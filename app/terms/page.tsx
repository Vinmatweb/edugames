import type { Metadata } from "next";

import { LegalPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { legalCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description: legalCopy.terms.en.title,
  locale: "en",
  path: paths.terms.en,
  alternatePath: paths.terms.cs,
});

export default function Page() {
  return <LegalPage page="terms" locale="en" />;
}

