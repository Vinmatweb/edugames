import Link from "next/link";
import { ArrowRight, Clock3, UsersRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  assetPath,
  games,
  localPath,
  sharedCopy,
  type GameKey,
  type Locale,
} from "@/lib/site";
import { wordRaceCopy } from "@/lib/word-race";

export function GameCard({ gameKey, locale }: { gameKey: GameKey | "wordRace"; locale: Locale }) {
  const isWordRace = gameKey === "wordRace";
  const baseGame = isWordRace ? null : games[gameKey];
  const copy = isWordRace ? wordRaceCopy[locale] : baseGame![locale];
  const shared = sharedCopy[locale];
  const route = isWordRace ? "wordRace" : baseGame!.routeKey;
  const accent = isWordRace ? "word-race" : baseGame!.accent;
  const image = isWordRace ? "/images/word-race-track.webp" : baseGame!.image;
  const players = isWordRace ? (locale === "cs" ? "1–4 hráči" : "1–4 players") : `${baseGame!.players} ${shared.players}`;
  const age = isWordRace ? "6–8" : baseGame!.age;
  const time = isWordRace ? "5–15" : baseGame!.time;

  return (
    <article className={`game-card game-card--${accent}`}>
      <Link
        className="game-card-image-link"
        href={localPath(route, locale)}
        aria-label={`${shared.viewGame}: ${copy.title}`}
      >
        <img
          className="game-card-image"
          src={assetPath(image)}
          alt={copy.coverAlt}
          loading="lazy"
        />
        <Badge className="game-status" variant="secondary">
          {copy.status}
        </Badge>
      </Link>

      <div className="game-card-body">
        <p className="eyebrow">{copy.category}</p>
        <h3>
          <Link href={localPath(route, locale)}>{copy.title}</Link>
        </h3>
        {copy.tagline && <p className="game-tagline">{copy.tagline}</p>}
        <p className="game-card-summary">{copy.summary}</p>

        <ul className="game-meta" aria-label={locale === "cs" ? "Údaje o hře" : "Game facts"}>
          <li>
            <UsersRound aria-hidden="true" />
            {gameKey === "fantasy" ? (locale === "cs" ? "Bitva 2–4 · Přebíjená 2–9" : "Battle 2–4 · High Card 2–9") : players}
          </li>
          <li>
            <span className="meta-age" aria-hidden="true">
              {age}
            </span>
            {age} {shared.years}
          </li>
          <li>
            <Clock3 aria-hidden="true" />
            {time} {shared.minutes}
          </li>
        </ul>

        <Link className="text-link" href={localPath(route, locale)}>
          {shared.viewGame}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

