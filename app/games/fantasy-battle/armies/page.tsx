import type { Metadata } from "next";

import { FantasyArmiesPage } from "@/components/fantasy-armies";
import { paths, SITE_URL } from "@/lib/site";

const canonical = SITE_URL + paths.fantasy.en + "/armies/";
const alternate = SITE_URL + paths.fantasy.cs + "/armady/";

export const metadata: Metadata = {
  title: "Ten VM Fantasy Battle Armies | VinMat Education Games",
  description:
    "Meet all ten VM Fantasy Battle armies. Browse their illustrations and patrons, then download the card packs.",
  alternates: { canonical, languages: { en: canonical, cs: alternate } },
  openGraph: {
    type: "website",
    title: "Ten VM Fantasy Battle Armies",
    description:
      "Browse all ten armies, their illustrations and patrons in VM Fantasy Battle.",
    url: canonical,
    siteName: "VinMat Education Games",
    locale: "en_US",
  },
};

export default function Page() {
  return <FantasyArmiesPage locale="en" />;
}
