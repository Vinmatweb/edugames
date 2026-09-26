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
                href={gameKey === "fantasy" ? "#downloads" : assetPath(copy.primaryFile)}
                download={gameKey === "fantasy" ? undefined : true}
              >
                <Download aria-hidden="true" />
                {gameKey === "fantasy" ? (locale === "cs" ? "Soubory ke stažení" : "Download files") : copy.primaryDownload}
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
          {gameKey === "fantasy" ? (
            <div className="mode-grid">
              <article>
                <h3>{locale === "cs" ? "Bitva · počítání" : "Battle · arithmetic"}</h3>
                <p>{locale === "cs" ? "Útoky a posily procvičují sčítání a odčítání. Vyberte jednu ze tří obtížností:" : "Attacks and support practise addition and subtraction. Choose one of three difficulty levels:"}</p>
                <ul className="battle-levels">
                  {copy.modes.slice(0, 3).map((mode) => <li key={mode.title}><h4>{mode.title}</h4><p>{mode.text}</p></li>)}
                </ul>
              </article>
              <article>
                <h3>{locale === "cs" ? "Souboj · porovnávání (přebíjená)" : "Duel · comparing numbers (high-card game)"}</h3>
                <p>{copy.modes[3].text}</p>
                <p>{locale === "cs" ? "Každý hráč použije 18 karet jedné armády. Karty ATTACK, SUPPORT a patroni zůstanou stranou. Jakmile někdo na začátku kola nemůže otočit kartu, hra končí. Dojdou-li karty při remíze, za poslední kolo se bod neuděluje." : "Each player uses the 18 cards of one army. Leave ATTACK, SUPPORT and patron cards aside. The game ends when a player cannot reveal a card at the start of a round. If cards run out during a tie, no point is awarded for that last round."}</p>
              </article>
            </div>
          ) : (
            <div className="mode-grid">
              {copy.modes.map((mode) => <article key={mode.title}><h3>{mode.title}</h3><p>{mode.text}</p></article>)}
            </div>
          )}
        </section>

        <section id="downloads" className="download-section section-block">
          <div className="shell download-grid">
            <div className="download-copy">
              <p className="eyebrow">{shared.free}</p>
              <h2>{copy.downloadTitle}</h2>
              <p>{copy.downloadText}</p>
              <p className="file-note">
                <FileText aria-hidden="true" />
                {copy.pdfNote}
              </p>
              {gameKey === "fantasy" ? (
                <div className="battle-downloads">
                  {[
                    {file: "vm-fantasy-battle-rules-cs.pdf", title: locale === "cs" ? "Návod" : "Rules", text: locale === "cs" ? "Český návod pro 2–4 hráče: Bitva i Souboj. Formát A5, tisk na A4." : "Czech rules for 2–4 players: Battle and Duel. A5 booklet on A4 sheets."},
                    {file: "vm-fantasy-battle-knights-zombies.pdf", title: locale === "cs" ? "Karty rytířů a zombií" : "Knights & Zombies cards", text: locale === "cs" ? "Dvě armády, útoky, posily a patroni. 16 stran A4, včetně rubů." : "Two armies, attacks, support and patrons. 16 A4 pages, including card backs."},
                    {file: "vm-fantasy-battle-orcs-goblins.pdf", title: locale === "cs" ? "Karty orků a goblinů" : "Orcs & Goblins cards", text: locale === "cs" ? "Další dvě armády, útoky, posily a patroni. 16 stran A4, včetně rubů." : "Two more armies, attacks, support and patrons. 16 A4 pages, including card backs."},
                    {file: "vm-fantasy-battle-logs.pdf", title: "Battle Logy / Battle Logs", text: locale === "cs" ? "Volitelné záznamové listy pro počítání na papír. Do MY ARMY zapisujte změny vlastní armády, do ENEMY ARMY své útoky s iniciálou soupeřovy armády, například O: 10 − 2 = 8. Vhodné pro všechny čtyři armády." : "Optional worksheets for doing the arithmetic on paper. Record changes to your army under MY ARMY and your attacks under ENEMY ARMY, adding the target army’s initial, for example O: 10 − 2 = 8. Suitable for all four armies."},
                  ].map((file) => <div className="battle-download" key={file.file}>
                    <h3>{file.file.includes("logs") ? (locale === "cs" ? "Battle Logy" : "Battle Logs") : file.title}</h3>
                    <p>{file.text}</p>
                    <a className={buttonVariants({variant: "outline", className: "button-secondary"})} href={assetPath(`/downloads/${file.file}`)} download><Download aria-hidden="true" />{locale === "cs" ? "Stáhnout PDF" : "Download PDF"}</a>
                  </div>)}
                </div>
              ) : (
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
              )}
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
