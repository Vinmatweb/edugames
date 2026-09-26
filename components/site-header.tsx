import Link from "next/link";
import { Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  assetPath,
  localPath,
  sharedCopy,
  type Locale,
} from "@/lib/site";

type SiteHeaderProps = {
  locale: Locale;
  languageHref: string;
};

export function SiteHeader({ locale, languageHref }: SiteHeaderProps) {
  const copy = sharedCopy[locale];

  return (
    <>
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link
            className="brand-lockup"
            href={localPath("home", locale)}
            aria-label="VinMat Education Games"
          >
            <img
              className="brand-mark"
              src={assetPath("/favicon.png")}
              alt=""
              width="48"
              height="48"
            />
            <span className="brand-words">
              <strong>VinMat</strong>
              <span>Education Games</span>
            </span>
          </Link>

          <nav className="primary-nav" aria-label="Primary navigation">
            <Link href={`${localPath("home", locale)}#games`}>
              {copy.navGames}
            </Link>
            <Link href={localPath("guide", locale)}>{copy.navGuide}</Link>
            <Link href={localPath("about", locale)}>{copy.navAbout}</Link>
          </nav>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="language-button"
          >
            <Link href={languageHref} lang={locale === "en" ? "cs" : "en"}>
              <Globe2 aria-hidden="true" />
              <span className="language-long">{copy.languageLabel}</span>
              <span className="language-short">{copy.languageCode}</span>
            </Link>
          </Button>
        </div>
      </header>
    </>
  );
}

