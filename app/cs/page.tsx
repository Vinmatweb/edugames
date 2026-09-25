import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";
import { homeCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Vzdělávací hry pro děti zdarma k vytištění",
  description: homeCopy.cs.intro,
  locale: "cs",
  path: paths.home.cs,
  alternatePath: paths.home.en,
});

export default function Page() {
  return <HomePage locale="cs" />;
}

