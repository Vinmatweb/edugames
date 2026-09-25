import type { Metadata } from "next";

import { LegalPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { legalCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Podmínky použití",
  description: legalCopy.terms.cs.title,
  locale: "cs",
  path: paths.terms.cs,
  alternatePath: paths.terms.en,
});

export default function Page() {
  return <LegalPage page="terms" locale="cs" />;
}

