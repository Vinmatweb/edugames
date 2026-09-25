import Link from "next/link";
import {
  ArrowRight,
  Check,
  Download,
  HeartHandshake,
  Layers3,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AdSlot } from "@/components/ad-slot";
import { GameCard } from "@/components/game-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  homeCopy,
  localPath,
  type Locale,
} from "@/lib/site";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = homeCopy[locale];
  const languageHref = localPath("home", locale === "en" ? "cs" : "en");

  return (
    <div className="site-page">
      <SiteHeader locale={locale} languageHref={languageHref} />

      <main id="main-content">
        <section className="home-hero shell">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--color">
              <Sparkles aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h1>{copy.title}</h1>
            <p className="hero-intro">{copy.intro}</p>
            <div className="hero-actions">
              <Link
                href="#games"
                className={buttonVariants({
                  size: "lg",
                  className: "button-primary",
                })}
              >
                {locale === "en" ? "Explore the games" : "Prohlédnout hry"}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href={localPath("guide", locale)}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "button-secondary",
                })}
              >
                <Download aria-hidden="true" />
                {locale === "en" ? "How printing works" : "Jak na tisk"}
              </Link>
            </div>
          </div>

          <dl className="hero-stats" aria-label="Library at a glance">
            <div>
              <dt>2</dt>
              <dd>{copy.statGames}</dd>
            </div>
            <div>
              <dt>6–9</dt>
              <dd>{copy.statAge}</dd>
            </div>
            <div>
              <dt>100%</dt>
              <dd>{copy.statPrice}</dd>
            </div>
          </dl>
        </section>

        <section id="games" className="games-section shell section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{locale === "en" ? "Game library" : "Knihovna her"}</p>
              <h2>{copy.gamesTitle}</h2>
            </div>
            <p>{copy.gamesIntro}</p>
          </div>
          <div className="game-grid">
            <GameCard gameKey="fantasy" locale={locale} />
            <GameCard gameKey="racing" locale={locale} />
          </div>
        </section>

        <section className="how-section section-block">
          <div className="shell">
            <div className="section-heading section-heading--compact">
              <div>
                <p className="eyebrow">{locale === "en" ? "Simple by design" : "Záměrně jednoduché"}</p>
                <h2>{copy.howTitle}</h2>
              </div>
            </div>
            <ol className="process-grid">
              {copy.steps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <AdSlot placement="home-between-sections" />

        <section className="why-section shell section-block">
          <div className="why-panel">
            <div className="why-icon" aria-hidden="true">
              <HeartHandshake />
            </div>
            <div className="why-copy">
              <p className="eyebrow">{locale === "en" ? "Our approach" : "Náš přístup"}</p>
              <h2>{copy.whyTitle}</h2>
              <p>{copy.whyText}</p>
            </div>
            <ul className="check-list">
              {copy.principles.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="text-link why-link" href={localPath("guide", locale)}>
              {copy.guideCta}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="next-section shell section-block">
          <div className="next-panel">
            <Layers3 aria-hidden="true" />
            <div>
              <h2>{copy.nextTitle}</h2>
              <p>{copy.nextText}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}

