import type { Metadata } from "next";

import { GamePage } from "@/components/game-page";
import { pageMetadata } from "@/lib/metadata";
import { games, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Racing Math – printable number-line game",
  description: games.racing.en.summary,
  locale: "en",
  path: paths.racing.en,
  alternatePath: paths.racing.cs,
});

export default function Page() {
  return <GamePage gameKey="racing" locale="en" />;
}

