import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Eye,
  FileCheck2,
  Printer,
  Scissors,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import {
  aboutCopy,
  assetPath,
  guideCopy,
  legalCopy,
  localPath,
  type Locale,
} from "@/lib/site";

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = aboutCopy[locale];
  const other: Locale = locale === "en" ? "cs" : "en";

  return (
    <div className="site-page">
      <SiteHeader locale={locale} languageHref={localPath("about", other)} />
      <main id="main-content">
        <section className="info-hero shell">
          <div>
            <p className="eyebrow eyebrow--color">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="info-lead">{copy.lead}</p>
          </div>
          <div className="about-mark" aria-hidden="true">
            <img src={assetPath("/images/vinmat-logo.png")} alt="" />
          </div>
        </section>

        <section className="article-layout shell section-block">
          <div className="article-content">
            {copy.sections.map((section, index) => (
              <section key={section.title} className="article-section">
                <span className="article-number">0{index + 1}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <aside className="sticky-note-card">
            <FileCheck2 aria-hidden="true" />
            <h2>{copy.valuesTitle}</h2>
            <ul className="check-list">
              {copy.values.map((value) => (
                <li key={value}>
                  <Check aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="info-cta shell section-block">
          <div>
            <h2>{locale === "en" ? "Ready to choose a game?" : "Chcete vybrat hru?"}</h2>
            <p>
              {locale === "en"
                ? "See the age, playing time and learning goal before you print."
                : "Před tiskem si prohlédněte věk, délku partie a vzdělávací cíl."}
            </p>
          </div>
          <Link
            href={`${localPath("home", locale)}#games`}
            className={buttonVariants({ size: "lg", className: "button-primary" })}
          >
            {locale === "en" ? "Browse games" : "Prohlédnout hry"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function GuidePage({ locale }: { locale: Locale }) {
  const copy = guideCopy[locale];
  const other: Locale = locale === "en" ? "cs" : "en";

  return (
    <div className="site-page">
      <SiteHeader locale={locale} languageHref={localPath("guide", other)} />
      <main id="main-content">
        <section className="info-hero info-hero--guide shell">
          <div>
            <p className="eyebrow eyebrow--color">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="info-lead">{copy.lead}</p>
          </div>
          <div className="guide-visual" aria-hidden="true">
            <Printer />
            <span />
            <Scissors />
          </div>
        </section>

        <section className="guide-steps shell section-block">
          {copy.sections.map((section) => (
            <article key={section.number}>
              <span>{section.number}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="guide-panels shell section-block">
          <div className="guide-tip-card">
            <FileCheck2 aria-hidden="true" />
            <h2>{copy.tipsTitle}</h2>
            <ul className="check-list">
              {copy.tips.map((tip) => (
                <li key={tip}>
                  <Check aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="guide-access-card">
            <Eye aria-hidden="true" />
            <h2>{copy.accessibilityTitle}</h2>
            <p>{copy.accessibilityText}</p>
          </div>
        </section>

        <section className="info-cta shell section-block">
          <div>
            <h2>{locale === "en" ? "Pick your first game" : "Vyberte první hru"}</h2>
            <p>
              {locale === "en"
                ? "Both downloads are free and include an easier way to begin."
                : "Obě hry jsou zdarma a nabízejí jednodušší variantu pro začátek."}
            </p>
          </div>
          <Link
            href={`${localPath("home", locale)}#games`}
            className={buttonVariants({ size: "lg", className: "button-primary" })}
          >
            {locale === "en" ? "Choose a game" : "Vybrat hru"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export function LegalPage({
  locale,
  page,
}: {
  locale: Locale;
  page: "privacy" | "terms";
}) {
  const copy = legalCopy[page][locale];
  const other: Locale = locale === "en" ? "cs" : "en";
  const icon = page === "privacy" ? <ShieldCheck /> : <FileCheck2 />;

  return (
    <div className="site-page">
      <SiteHeader locale={locale} languageHref={localPath(page, other)} />
      <main id="main-content">
        <section className="legal-hero shell">
          <div className="legal-icon" aria-hidden="true">
            {icon}
          </div>
          <p className="eyebrow eyebrow--color">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.updated}</p>
        </section>

        <article className="legal-content shell section-block">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <div className="legal-contact">
            <h2>{locale === "en" ? "Project contact" : "Kontakt k projektu"}</h2>
            <p>
              {locale === "en"
                ? "For questions about the project, visit the main VinMat website."
                : "S dotazy k projektu se můžete obrátit na hlavní web VinMat."}
            </p>
            <a className="text-link" href="https://vinmat.eu">
              vinmat.eu
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

