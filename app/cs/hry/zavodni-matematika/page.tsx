import type { Metadata } from "next";

import { GamePage } from "@/components/game-page";
import { pageMetadata } from "@/lib/metadata";
import { games, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Závodní matematika – hra na číselnou osu",
  description: games.racing.cs.summary,
  locale: "cs",
  path: paths.racing.cs,
  alternatePath: paths.racing.en,
});

export default function Page() {
  return <GamePage gameKey="racing" locale="cs" />;
}

