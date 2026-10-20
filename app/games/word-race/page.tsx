import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { paths } from "@/lib/site";
import { wordRaceCopy } from "@/lib/word-race";
import { WordRacePage } from "@/components/word-race-page";

export const metadata: Metadata = pageMetadata({
  title: "VM Word Race – printable reading game",
  description: wordRaceCopy.en.summary,
  locale: "en",
  path: paths.wordRace.en,
  alternatePath: paths.wordRace.cs,
});

export default function Page() {
  return <WordRacePage locale="en" />;
}
