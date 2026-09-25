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

export function GameCard({ gameKey, locale }: { gameKey: GameKey; locale: Locale }) {
  const game = games[gameKey];
  const copy = game[locale];
  const shared = sharedCopy[locale];

  return (
    <article className={`game-card game-card--${game.accent}`}>
      <Link
        className="game-card-image-link"
        href={localPath(game.routeKey, locale)}
        aria-label={`${shared.viewGame}: ${copy.title}`}
      >
        <img
          className="game-card-image"
          src={assetPath(game.image)}
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
          <Link href={localPath(game.routeKey, locale)}>{copy.title}</Link>
        </h3>
        <p className="game-card-summary">{copy.summary}</p>

        <ul className="game-meta" aria-label="Game facts">
          <li>
            <UsersRound aria-hidden="true" />
            {game.players} {shared.players}
          </li>
          <li>
            <span className="meta-age" aria-hidden="true">
              {game.age}
            </span>
            {game.age} {shared.years}
          </li>
          <li>
            <Clock3 aria-hidden="true" />
            {game.time} {shared.minutes}
          </li>
        </ul>

        <Link className="text-link" href={localPath(game.routeKey, locale)}>
          {shared.viewGame}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

