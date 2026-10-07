import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Shield } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assetPath, localPath } from "@/lib/site";

const armies = [
  {
    id: "rytiri",
    name: "Rytíři",
    patron: "Strážný anděl",
    image: "army-knights.webp",
    thumbnail: "army-knights-thumb.webp",
    imageAlt: "Modře odění rytíři a jejich Strážný anděl nad nimi",
    short: "Modrá zbroj, štíty a Strážný anděl.",
    paragraphs: [
      "Rytířskou armádu poznáš podle modrých plášťů, štítů a praporů. Nad řadami bojovníků stojí Strážný anděl, který je chrání a dodává celé armádě její slavnostní podobu.",
      "Patronem rytířů je Strážný anděl. V Bitvě ho můžeš jednou použít jako podporu +5. V balíčku karet najdeš 18 jednotkových karet rytířů a jejich kartu patrona.",
    ],
    pack: "rytířů a zombií",
    downloadFile: "vm-fantasy-battle-armies-knights-zombies.pdf",
  },
  {
    id: "zombie",
    name: "Zombie",
    patron: "Nekromancer",
    image: "army-undead.webp",
    thumbnail: "army-undead-thumb.webp",
    imageAlt: "Řady nemrtvých bojovníků vedené Nekromancerem se zelenou magií",
    short: "Nemrtvá armáda pod vedením Nekromancera.",
    paragraphs: [
      "Nemrtvé bojovníky obklopují zříceniny a fialové světlo. V jejich čele stojí Nekromancer, jehož zelená magie spojuje temnou atmosféru celé armády.",
      "Nekromancer je patronem zombií. V Bitvě může jednou podpořit svou armádu o +5. Balíček karet obsahuje 18 jednotkových karet zombií a kartu patrona.",
    ],
    pack: "rytířů a zombií",
    downloadFile: "vm-fantasy-battle-armies-knights-zombies.pdf",
  },
  {
    id: "orkove",
    name: "Orkové",
    patron: "Orčí vůdce",
    image: "army-orcs.webp",
    thumbnail: "army-orcs-thumb.webp",
    imageAlt: "Mohutná orčí armáda s korunovaným vůdcem vepředu",
    short: "Mohutní válečníci s korunovaným vůdcem.",
    paragraphs: [
      "Orčí armáda působí mohutně a neústupně. Její bojovníci nesou těžkou výzbroj a v čele stojí korunovaný vůdce, který udává tón celé družině.",
      "Orčí vůdce je patronem armády a v Bitvě může jednou přidat +5. V balíčku najdeš 18 jednotkových karet orků a kartu patrona.",
    ],
    pack: "orků a goblinů",
    downloadFile: "vm-fantasy-battle-armies-orcs-goblins.pdf",
  },
  {
    id: "skreti",
    name: "Goblini",
    patron: "Skřetí šaman",
    image: "army-goblins.webp",
    thumbnail: "army-goblins-thumb.webp",
    imageAlt: "Skřetí bojovníci vedení šamanem v kápi s magickou holí",
    short: "Skřetí družina s tajemným šamanem.",
    paragraphs: [
      "Gobliní armáda má vlastní podobu i náladu: její bojovníci nosí modrozelené prvky a do bitvy je vede šaman v kápi s magickou holí.",
      "Skřetí šaman je patronem goblinů. V Bitvě může jednou posílit svou armádu o +5. Balíček obsahuje 18 jednotkových karet goblinů a kartu patrona.",
    ],
    pack: "orků a goblinů",
    downloadFile: "vm-fantasy-battle-armies-orcs-goblins.pdf",
  },
] as const;

const selectionHref = localPath("fantasy", "cs") + "#armady";

export function FantasyArmySelector() {
  return (
    <section id="armady" className="army-selector-section section-block">
      <div className="shell">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">VM Fantasy Battle</p>
            <h2>Vyber si armádu</h2>
          </div>
          <p>
            Kliknutím na armádu se dozvíš víc o jejím příběhu, patronovi a kartách.
          </p>
        </div>
        <div className="army-selector-grid">
          {armies.map((army) => (
            <Link
              key={army.id}
              href={"/cs/hry/fantasy-battle/armady#" + army.id}
              className="army-selector-card"
            >
              <img
                src={assetPath("/images/fantasy-armies/" + army.thumbnail)}
                alt={army.imageAlt}
                width={320}
                height={400}
                loading="lazy"
              />
              <div className="army-selector-copy">
                <h3>{army.name}</h3>
                <p>{army.short}</p>
                <span className="army-selector-cta">
                  Zjistit více <ArrowRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FantasyArmiesPage() {
  return (
    <div className="site-page game-theme game-theme--fantasy">
      <SiteHeader
        locale="cs"
        languageHref={localPath("fantasy", "en")}
      />
      <main id="main-content">
        <header className="army-directory-hero shell">
          <Link className="back-link" href={selectionHref}>
            <ArrowLeft aria-hidden="true" />
            Zpět na výběr armád
          </Link>
          <p className="eyebrow eyebrow--color">VM Fantasy Battle</p>
          <h1>Poznej čtyři armády</h1>
          <p>
            Každá armáda má vlastní ilustraci a patrona. Všechny používají stejná
            pravidla; při výběru proto rozhoduje hlavně to, za koho chceš hrát.
          </p>
        </header>

        <section className="army-details-section shell section-block">
          <div className="army-detail-list">
            {armies.map((army, index) => (
              <article
                id={army.id}
                key={army.id}
                className={
                  "army-detail-card" +
                  (index % 2 === 1 ? " army-detail-card--reverse" : "")
                }
              >
                <div className="army-detail-image">
                  <img
                    src={assetPath("/images/fantasy-armies/" + army.image)}
                    alt={army.imageAlt}
                    width={800}
                    height={1000}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="army-detail-copy">
                  <span className="army-detail-number">
                    Armáda {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{army.name}</h2>
                  <p className="army-patron">
                    <Shield aria-hidden="true" />
                    Patron: {army.patron} · +5 jednou za Bitvu
                  </p>
                  {army.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="army-pack-note">
                    PDF obsahuje balík karet {army.pack} včetně patronů. Akční
                    karty a pravidla se stahují zvlášť.
                  </p>
                  <a
                    className={buttonVariants({
                      variant: "outline",
                      className: "button-secondary",
                    })}
                    href={assetPath("/downloads/" + army.downloadFile)}
                    download
                  >
                    <Download aria-hidden="true" />
                    Stáhnout balík karet {army.pack} · PDF
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="army-directory-return">
            <Link
              href={selectionHref}
              className={buttonVariants({
                size: "lg",
                className: "button-primary",
              })}
            >
              <ArrowLeft aria-hidden="true" />
              Zpět na výběr armád
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale="cs" />
    </div>
  );
}
