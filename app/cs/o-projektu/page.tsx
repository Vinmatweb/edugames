import type { Metadata } from "next";

import { AboutPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { aboutCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "O projektu",
  description: aboutCopy.cs.lead,
  locale: "cs",
  path: paths.about.cs,
  alternatePath: paths.about.en,
});

export default function Page() {
  return <AboutPage locale="cs" />;
}

