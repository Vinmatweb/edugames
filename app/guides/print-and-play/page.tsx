import type { Metadata } from "next";

import { GuidePage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { guideCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Print & play guide",
  description: guideCopy.en.lead,
  locale: "en",
  path: paths.guide.en,
  alternatePath: paths.guide.cs,
});

export default function Page() {
  return <GuidePage locale="en" />;
}

