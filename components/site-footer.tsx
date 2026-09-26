import Link from "next/link";

import {
  assetPath,
  localPath,
  sharedCopy,
  type Locale,
} from "@/lib/site";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = sharedCopy[locale];

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={assetPath("/favicon.png")} alt="" width="52" height="52" />
          <div>
            <strong>VinMat Education Games</strong>
            <p>{copy.footerLine}</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link href={`${localPath("home", locale)}#games`}>
            {copy.footerGames}
          </Link>
          <Link href={localPath("guide", locale)}>{copy.footerGuide}</Link>
          <Link href={localPath("about", locale)}>{copy.footerAbout}</Link>
          <Link href={localPath("privacy", locale)}>{copy.footerPrivacy}</Link>
          <Link href={localPath("terms", locale)}>{copy.footerTerms}</Link>
        </nav>

        <div className="footer-meta">
          <a href="https://vinmat.eu">{copy.footerMain}</a>
          <span>© 2026 VinMat</span>
        </div>
      </div>
    </footer>
  );
}

