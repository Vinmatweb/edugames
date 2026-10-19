import type { Metadata } from "next";

import { FantasyArmiesPage } from "@/components/fantasy-armies";
import { paths, SITE_URL } from "@/lib/site";

const canonical = SITE_URL + paths.fantasy.cs + "/armady/";
const alternate = SITE_URL + paths.fantasy.en + "/armies/";

export const metadata: Metadata = {
  title: "Devět armád VM Fantasy Battle | VinMat Education Games",
  description:
    "Poznej devět armád ve hře VM Fantasy Battle. Prohlédni si jejich ilustrace, patrony a stáhni balíky karet.",
  alternates: { canonical, languages: { cs: canonical, en: alternate } },
  openGraph: {
    type: "website",
    title: "Devět armád VM Fantasy Battle",
    description:
      "Prohlédni si devět armád, jejich ilustrace a patrony ve hře VM Fantasy Battle.",
    url: canonical,
    siteName: "VinMat Education Games",
    locale: "cs_CZ",
  },
};

export default function Page() {
  return <FantasyArmiesPage locale="cs" />;
}
