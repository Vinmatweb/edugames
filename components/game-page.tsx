import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  PackageOpen,
  UsersRound,
} from "lucide-react";

import { AdSlot } from "@/components/ad-slot";
import { GameCard } from "@/components/game-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  assetPath,
  games,
  localPath,
  sharedCopy,
  type GameKey,
  type Locale,
} from "@/lib/site";

export function GamePage({ gameKey, locale }: { gameKey: GameKey; locale: Locale }) {
  const game = games[gameKey];
  const copy = game[locale];
  const shared = sharedCopy[locale];
  const otherKey: GameKey = gameKey === "fantasy" ? "racing" : "fantasy";
  const alternateLocale: Locale = locale === "en" ? "cs" : "en";

  return (
    <div className={`site-page game-theme game-theme--${game.accent}`}>
      <SiteHeader
        locale={locale}
        languageHref={localPath(game.routeKey, alternateLocale)}
      />

      <main id="main-content">
        <section className="game-hero shell">
          <div className="game-hero-copy">
            <Link className="back-link" href={`${localPath("home", locale)}#games`}>
              <ArrowLeft aria-hidden="true" />
              {locale === "en" ? "All games" : "Všechny hry"}
            </Link>
            <p className="eyebrow eyebrow--color">{copy.category}</p>
            <h1>{copy.title}</h1>
            <p className="game-lead">{copy.summary}</p>

            <ul className="game-fact-row" aria-label="Game facts">
              <li>
                <UsersRound aria-hidden="true" />
                <strong>{game.players}</strong>
                <span>{shared.players}</span>
              </li>
              <li>
                <GraduationCap aria-hidden="true" />
                <strong>{game.age}</strong>
                <span>{shared.years}</span>
              </li>
              <li>
                <Clock3 aria-hidden="true" />
                <strong>{game.time}</strong>
                <span>{shared.minutes}</span>
              </li>
            </ul>

            <div className="hero-actions">
              <a
                className={buttonVariants({
                  size: "lg",
                  className: "button-primary",
                })}
                href={assetPath(copy.primaryFile)}
                download
              >
                <Download aria-hidden="true" />
                {copy.primaryDownload}
              </a>
              <a className="text-link" href="#rules">
                {locale === "en" ? "Read the rules" : "Přečíst pravidla"}
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="game-hero-visual">
            <img src={assetPath(game.image)} alt={copy.coverAlt} />
            <Badge className="game-hero-status" variant="secondary">
              {copy.status}
            </Badge>
          </div>
        </section>

        <section className="game-overview shell section-block">
          <div className="content-column">
            <p className="eyebrow">{locale === "en" ? "The idea" : "Princip hry"}</p>
            <h2>{copy.overviewTitle}</h2>
            {copy.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="skill-card">
            <BrainCircuit aria-hidden="true" />
            <h2>{locale === "en" ? "Skills at a glance" : "Dovednosti v kostce"}</h2>
            <ul className="check-list">
              {copy.skills.map((skill) => (
                <li key={skill}>
                  <Check aria-hidden="true" />
                  {skill}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="learning-section section-block">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{locale === "en" ? "Learning through play" : "Učení hrou"}</p>
                <h2>{copy.learnTitle}</h2>
              </div>
              <p>{copy.learnIntro}</p>
            </div>
            <div className="learning-grid">
              {copy.learningPoints.map((point, index) => (
                <article key={point.title}>
                  <span>0{index + 1}</span>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rules" className="rules-section shell section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{locale === "en" ? "Four clear steps" : "Čtyři jasné kroky"}</p>
              <h2>{copy.rulesTitle}</h2>
            </div>
            <p>{copy.rulesIntro}</p>
          </div>
          <ol className="rules-grid">
            {copy.steps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <AdSlot placement="game-after-rules" />

        <section className="modes-section shell section-block">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow">{locale === "en" ? "Adjust the game" : "Přizpůsobte hru"}</p>
              <h2>{copy.modesTitle}</h2>
            </div>
          </div>
          <div className="mode-grid">
            {copy.modes.map((mode) => (
              <article key={mode.title}>
                <h3>{mode.title}</h3>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="download-section section-block">
          <div className="shell download-grid">
            <div className="download-copy">
              <p className="eyebrow">{shared.free}</p>
              <h2>{copy.downloadTitle}</h2>
              <p>{copy.downloadText}</p>
              <p className="file-note">
                <FileText aria-hidden="true" />
                {copy.pdfNote}
              </p>
              <div className="download-actions">
                <a
                  className={buttonVariants({
                    size: "lg",
                    className: "button-primary",
                  })}
                  href={assetPath(copy.primaryFile)}
                  download
                >
                  <Download aria-hidden="true" />
                  {copy.primaryDownload}
                </a>
                {copy.secondaryFile && copy.secondaryDownload ? (
                  <a
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "button-secondary",
                    })}
                    href={assetPath(copy.secondaryFile)}
                    download
                  >
                    <FileText aria-hidden="true" />
                    {copy.secondaryDownload}
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="contents-card">
              <PackageOpen aria-hidden="true" />
              <h3>{copy.contentsTitle}</h3>
              <ul>
                {copy.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="faq-section shell section-block">
          <div className="faq-heading">
            <p className="eyebrow">FAQ</p>
            <h2>{copy.faqTitle}</h2>
          </div>
          <Accordion className="faq-accordion" type="multiple">
            {copy.faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="related-section shell section-block">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow">{copy.relatedEyebrow}</p>
              <h2>{copy.relatedText}</h2>
            </div>
          </div>
          <div className="related-card-wrap">
            <GameCard gameKey={otherKey} locale={locale} />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
