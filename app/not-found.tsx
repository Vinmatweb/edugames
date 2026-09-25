import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-page">
      <SiteHeader locale="en" languageHref="/cs" />
      <main id="main-content" className="legal-hero shell">
        <p className="eyebrow eyebrow--color">404</p>
        <h1>This game piece is missing.</h1>
        <p>Return to the game library and choose a printable adventure.</p>
        <Link
          className={buttonVariants({ size: "lg", className: "button-primary" })}
          href="/"
        >
          <ArrowLeft aria-hidden="true" />
          Back to all games
        </Link>
      </main>
      <SiteFooter locale="en" />
    </div>
  );
}

