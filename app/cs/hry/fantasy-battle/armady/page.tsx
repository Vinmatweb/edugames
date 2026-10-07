import type { Metadata } from "next";

import { FantasyArmiesPage } from "@/components/fantasy-armies";
import { paths, SITE_URL } from "@/lib/site";

const canonical = SITE_URL + paths.fantasy.cs + "/armady/";

export const metadata: Metadata = {
  title: "Armády VM Fantasy Battle | VinMat Education Games",
  description:
    "Poznej rytíře, zombie, orky a gobliny ve hře VM Fantasy Battle. Prohlédni si ilustrace, patrony a stáhni balíky karet.",
  alternates: { canonical },
  openGraph: {
    type: "website",
    title: "Armády VM Fantasy Battle",
    description:
      "Prohlédni si čtyři armády, jejich ilustrace a patrony ve hře VM Fantasy Battle.",
    url: canonical,
    siteName: "VinMat Education Games",
    locale: "cs_CZ",
  },
};

export default function Page() {
  return <FantasyArmiesPage />;
}
