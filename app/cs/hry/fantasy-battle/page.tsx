import type { Metadata } from "next";

import { GamePage } from "@/components/game-page";
import { pageMetadata } from "@/lib/metadata";
import { games, paths } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "VM Fantasy Battle – matematická karetní hra",
  description: games.fantasy.cs.summary,
  locale: "cs",
  path: paths.fantasy.cs,
  alternatePath: paths.fantasy.en,
});

export default function Page() {
  return <GamePage gameKey="fantasy" locale="cs" />;
}

