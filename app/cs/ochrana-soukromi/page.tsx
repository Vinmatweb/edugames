import type { Metadata } from "next";

import { LegalPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { legalCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Ochrana soukromí",
  description: legalCopy.privacy.cs.title,
  locale: "cs",
  path: paths.privacy.cs,
  alternatePath: paths.privacy.en,
});

export default function Page() {
  return <LegalPage page="privacy" locale="cs" />;
}

