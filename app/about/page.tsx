import type { Metadata } from "next";

import { AboutPage } from "@/components/info-pages";
import { pageMetadata } from "@/lib/metadata";
import { aboutCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About the project",
  description: aboutCopy.en.lead,
  locale: "en",
  path: paths.about.en,
  alternatePath: paths.about.cs,
});

export default function Page() {
  return <AboutPage locale="en" />;
}

