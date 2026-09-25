import type { Metadata } from "next";

import { GuidePage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { guideCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Návod k tisku a hraní",
  description: guideCopy.cs.lead,
  locale: "cs",
  path: paths.guide.cs,
  alternatePath: paths.guide.en,
});

export default function Page() {
  return <GuidePage locale="cs" />;
}

