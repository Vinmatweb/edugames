import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { paths } from "@/lib/site";
import { wordRaceCopy } from "@/lib/word-race";
import { WordRacePage } from "@/components/word-race-page";

export const metadata: Metadata = pageMetadata({
  title: "VM Word Race – závodní hra na čtení",
  description: wordRaceCopy.cs.summary,
  locale: "cs",
  path: paths.wordRace.cs,
  alternatePath: paths.wordRace.en,
});

export default function Page() {
  return <WordRacePage locale="cs" />;
}
