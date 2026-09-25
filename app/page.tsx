import type { Metadata } from "next";

import { HomePage } from "@/components/home-page";
import { pageMetadata } from "@/lib/metadata";
import { homeCopy, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Free printable learning games for children",
  description: homeCopy.en.intro,
  locale: "en",
  path: paths.home.en,
  alternatePath: paths.home.cs,
});

export default function Page() {
  return <HomePage locale="en" />;
}

