import type { Metadata } from "next";

import { GamePage } from "@/components/game-page";
import { pageMetadata } from "@/lib/metadata";
import { games, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "VM Fantasy Battle – printable maths card game",
  description: games.fantasy.en.summary,
  locale: "en",
  path: paths.fantasy.en,
  alternatePath: paths.fantasy.cs,
});

export default function Page() {
  return <GamePage gameKey="fantasy" locale="en" />;
}

