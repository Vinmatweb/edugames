import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Shield } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assetPath, localPath, type Locale } from "@/lib/site";

const armies = [
  {
    id: "rytiri",
    name: { cs: "Rytíři", en: "Knights" },
    patron: { cs: "Strážný anděl", en: "Guardian Angel" },
    image: "army-knights.webp",
    thumbnail: "army-knights-thumb.webp",
    imageAlt: { cs: "Modře odění rytíři a jejich Strážný anděl nad nimi", en: "Blue-armoured knights beneath their Guardian Angel" },
    short: { cs: "Chrání své království silou, disciplínou a pevnou zbrojí.", en: "They defend their kingdom with strength, discipline and sturdy armour." },
    paragraphs: {
      cs: [
        "Odvážní rytíři chrání své království silou, disciplínou a pevnou zbrojí. Jejich patronem je anděl strážný, který nad armádou bdí.",
        "Strážný anděl může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty rytířů a nemrtvých včetně patronů; akční karty a pravidla se stahují zvlášť.",
      ],
      en: [
        "Brave knights defend their kingdom with strength, discipline and sturdy armour. Their Guardian Angel watches over the army.",
        "The Guardian Angel can add +5 once per Battle. This pack contains the Knights and Zombies cards, including their patrons; action cards and rules are downloaded separately.",
      ],
    },
    pack: { cs: "rytířů a nemrtvých", en: "Knights & Zombies" },
    downloadFile: "vm-fantasy-battle-armies-knights-zombies.pdf",
  },
  {
    id: "nemrtvi",
    name: { cs: "Nemrtví", en: "Zombies" },
    patron: { cs: "Nekromancer", en: "Necromancer" },
    image: "army-undead.webp",
    thumbnail: "army-undead-thumb.webp",
    imageAlt: { cs: "Řady nemrtvých bojovníků vedené Nekromancerem se zelenou magií", en: "Ranks of undead warriors led by a Necromancer and green magic" },
    short: { cs: "Neúnavně se valí vpřed pod vedením Nekromancera.", en: "They keep advancing under the Necromancer's command." },
    paragraphs: {
      cs: [
        "Nemrtví se pomalu, ale neúnavně valí vpřed. Vede je nekromant, který svou temnou magií povolává další bojovníky.",
        "Nekromancer může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty rytířů a nemrtvých včetně patronů; akční karty a pravidla se stahují zvlášť.",
      ],
      en: [
        "The Zombies advance slowly but relentlessly. Their Necromancer uses dark magic to call more fighters into the battle.",
        "The Necromancer can add +5 once per Battle. This pack contains the Knights and Zombies cards, including their patrons; action cards and rules are downloaded separately.",
      ],
    },
    pack: { cs: "rytířů a nemrtvých", en: "Knights & Zombies" },
    downloadFile: "vm-fantasy-battle-armies-knights-zombies.pdf",
  },
  {
    id: "orkove",
    name: { cs: "Orkové", en: "Orcs" },
    patron: { cs: "Orčí náčelník", en: "Orc Chieftain" },
    image: "army-orcs.webp",
    thumbnail: "army-orcs-thumb.webp",
    imageAlt: { cs: "Mohutná orčí armáda s korunovaným vůdcem vepředu", en: "A mighty Orc army with its crowned leader at the front" },
    short: { cs: "Síla, odolnost a neústupnost v čele s náčelníkem.", en: "Strength and resilience led by a determined chieftain." },
    paragraphs: {
      cs: [
        "Orčí bojovníci spoléhají na sílu, odolnost a neústupnost. Jejich náčelník stojí v čele armády a žene ji do bitvy.",
        "Orčí náčelník může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty orků a skřetů včetně patronů; akční karty a pravidla se stahují zvlášť.",
      ],
      en: [
        "Orc warriors rely on strength, resilience and determination. Their chieftain leads from the front and drives the army into battle.",
        "The Orc Chieftain can add +5 once per Battle. This pack contains the Orcs and Goblins cards, including their patrons; action cards and rules are downloaded separately.",
      ],
    },
    pack: { cs: "orků a skřetů", en: "Orcs & Goblins" },
    downloadFile: "vm-fantasy-battle-armies-orcs-goblins.pdf",
  },
  {
    id: "skreti",
    name: { cs: "Skřeti", en: "Goblins" },
    patron: { cs: "Gobliní šaman", en: "Goblin Shaman" },
    image: "army-goblins.webp",
    thumbnail: "army-goblins-thumb.webp",
    imageAlt: { cs: "Skřetí bojovníci vedení šamanem v kápi s magickou holí", en: "Goblin fighters led by a hooded shaman with a magical staff" },
    short: { cs: "Mrštní a mazaní bojovníci, které vede šaman.", en: "Quick and cunning fighters guided by their shaman." },
    paragraphs: {
      cs: [
        "Skřeti jsou mrštní a mazaní protivníci, kteří dokážou překvapit i silnější armádu. Jejich šaman je vede pomocí lstí a magie.",
        "Gobliní šaman může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty orků a skřetů včetně patronů; akční karty a pravidla se stahují zvlášť.",
      ],
      en: [
        "Goblins are nimble, cunning opponents who can surprise even a stronger army. Their shaman guides them with tricks and magic.",
        "The Goblin Shaman can add +5 once per Battle. This pack contains the Orcs and Goblins cards, including their patrons; action cards and rules are downloaded separately.",
      ],
    },
    pack: { cs: "orků a skřetů", en: "Orcs & Goblins" },
    downloadFile: "vm-fantasy-battle-armies-orcs-goblins.pdf",
  },
  {
    id: "vily",
    name: { cs: "Víly", en: "Fairies" },
    patron: { cs: "Smaragdová královna", en: "Emerald Queen" },
    image: "army-fairies.webp",
    thumbnail: "army-fairies-thumb.webp",
    imageAlt: { cs: "Smaragdová královna vede deset víl z kouzelného lesa", en: "The Emerald Queen leads ten fairies from an enchanted forest" },
    short: { cs: "Obratné bojovnice z kouzelného lesa vedené smaragdovou královnou.", en: "Agile forest fighters led by the Emerald Queen." },
    paragraphs: {
      cs: [
        "Víly z kouzelného lesa spojují rychlost, obratnost a magii. Jejich armádu vede smaragdová královna, která chrání svůj lid.",
        "Smaragdová královna může jednou za Bitvu podpořit armádu o +5. Karty víl a vlků včetně jejich patronů najdeš ve společném PDF balíku.",
      ],
      en: [
        "Fairies from the enchanted forest combine speed, agility and magic. The Emerald Queen leads the army and protects her people.",
        "The Emerald Queen can add +5 once per Battle. The Fairies and Wolves cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "víl a vlků", en: "Fairies & Wolves" },
    downloadFile: "vm-fantasy-battle-armies-fairies-wolves.pdf",
  },
  {
    id: "vlci",
    name: { cs: "Vlci", en: "Wolves" },
    patron: { cs: "Vlčí alfa", en: "Wolf Alpha" },
    image: "army-wolves.webp",
    thumbnail: "army-wolves-thumb.webp",
    imageAlt: { cs: "Vlčí smečku pod měsíční oblohou vede její alfa", en: "A wolf pack led by its Alpha beneath the moonlit sky" },
    short: { cs: "Smečka spoléhá na rychlost, souhru a instinkt.", en: "The pack relies on speed, teamwork and instinct." },
    paragraphs: {
      cs: [
        "Vlčí smečka spoléhá na rychlost, souhru a instinkt. Pod měsíční oblohou ji vede Alfa, který drží smečku pohromadě.",
        "Vlčí alfa může jednou za Bitvu podpořit armádu o +5. Karty vlků a víl včetně jejich patronů najdeš ve společném PDF balíku.",
      ],
      en: [
        "The wolf pack relies on speed, teamwork and instinct. Beneath the moonlit sky, its Alpha keeps the pack together.",
        "The Wolf Alpha can add +5 once per Battle. The Wolves and Fairies cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "víl a vlků", en: "Fairies & Wolves" },
    downloadFile: "vm-fantasy-battle-armies-fairies-wolves.pdf",
  },
  {
    id: "trpaslici",
    name: { cs: "Trpaslíci", en: "Dwarves" },
    patron: { cs: "Král pod horou", en: "Mountain King" },
    image: "army-dwarves.webp",
    thumbnail: "army-dwarves-thumb.webp",
    imageAlt: { cs: "Deset trpaslíků chrání horskou pevnost pod vedením krále", en: "Ten Dwarves defend their mountain fortress under their king" },
    short: { cs: "Houževnatí obránci horských pevností s králem v čele.", en: "Stout defenders of mountain strongholds, led by their king." },
    paragraphs: {
      cs: [
        "Trpaslíci z horských pevností spoléhají na pevné brnění, zkušenosti a vytrvalost. Král pod horou vede jejich obranu.",
        "Král pod horou může jednou za Bitvu podpořit armádu o +5. Karty trpaslíků a trollů včetně jejich patronů jsou v jednom PDF balíku.",
      ],
      en: [
        "Dwarves from the mountain strongholds rely on sturdy armour, experience and endurance. The Mountain King leads their defence.",
        "The Mountain King can add +5 once per Battle. The Dwarves and Trolls cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "trpaslíků a trollů", en: "Dwarves & Trolls" },
    downloadFile: "vm-fantasy-battle-armies-dwarves-trolls.pdf",
  },
  {
    id: "elfove",
    name: { cs: "Elfové", en: "Elves" },
    patron: { cs: "Elfí patron", en: "Elven Patron" },
    image: "army-elves.webp",
    thumbnail: "army-elves-thumb.webp",
    imageAlt: { cs: "Deset elfích bojovníků v tichém stříbrném lese", en: "Ten Elven fighters in a quiet silver forest" },
    short: { cs: "Přesní bojovníci, kteří čerpají sílu z lesní magie.", en: "Precise fighters drawing strength from forest magic." },
    paragraphs: {
      cs: [
        "Elfové spojují obratnost, přesné údery a kouzelnou sílu přírody. Ve stříbrném lese brání své území s rozvahou.",
        "Elfí patron může jednou za Bitvu podpořit armádu o +5. Karty elfů a draků včetně jejich patronů jsou v jednom PDF balíku.",
      ],
      en: [
        "Elves combine agility, precise strikes and the magic of nature. They defend their silver forest with patience and care.",
        "The Elven Patron can add +5 once per Battle. The Elves and Dragons cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "elfů a draků", en: "Elves & Dragons" },
    downloadFile: "vm-fantasy-battle-armies-elves-dragons.pdf",
  },
  {
    id: "draci",
    name: { cs: "Draci", en: "Dragons" },
    patron: { cs: "Dračí patron", en: "Dragon Patron" },
    image: "army-dragons.webp",
    thumbnail: "army-dragons-thumb.webp",
    imageAlt: { cs: "Deset draků stojí v údolí pod ochranou fialového patrona", en: "Ten dragons gather in a valley beneath their purple patron" },
    short: { cs: "Mocná letka draků s patronem, který chrání celé údolí.", en: "A mighty flight of dragons protected by their patron." },
    paragraphs: {
      cs: [
        "Draci ovládají bojiště svou silou, křídly a odvahou. V čele legie stojí mocný patron, který chrání celé dračí údolí.",
        "Dračí patron může jednou za Bitvu podpořit armádu o +5. Karty draků a elfů včetně jejich patronů jsou v jednom PDF balíku.",
      ],
      en: [
        "Dragons command the battlefield with their strength, wings and courage. Their powerful patron protects the whole legion.",
        "The Dragon Patron can add +5 once per Battle. The Dragons and Elves cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "elfů a draků", en: "Elves & Dragons" },
    downloadFile: "vm-fantasy-battle-armies-elves-dragons.pdf",
  },
  {
    id: "trollove",
    name: { cs: "Trollové", en: "Trolls" },
    patron: { cs: "Korunovaný šampion", en: "Crowned Champion" },
    image: "army-trolls.webp",
    thumbnail: "army-trolls-thumb.webp",
    imageAlt: { cs: "Mohutní trollové po boku svého korunovaného šampiona", en: "Mighty trolls stand beside their crowned champion" },
    short: { cs: "Mohutní a vytrvalí bojovníci vedení korunovaným šampionem.", en: "Mighty, resilient fighters led by their crowned champion." },
    paragraphs: {
      cs: [
        "Mohutní trollové se jen tak nezastaví. Do bitvy přinášejí hrubou sílu a vytrvalost; jejich korunovaný šampion stojí v čele.",
        "Korunovaný šampion může jednou za Bitvu podpořit armádu o +5. Karty trollů a trpaslíků včetně jejich patronů jsou v jednom PDF balíku.",
      ],
      en: [
        "Mighty trolls are hard to stop. They bring raw strength and endurance to battle, with their Crowned Champion at the front.",
        "The Crowned Champion can add +5 once per Battle. The Trolls and Dwarves cards, including their patrons, are in one shared PDF pack.",
      ],
    },
    pack: { cs: "trpaslíků a trollů", en: "Dwarves & Trolls" },
    downloadFile: "vm-fantasy-battle-armies-dwarves-trolls.pdf",
  },
] as const;

function galleryPath(locale: Locale) {
  return locale === "cs"
    ? "/cs/hry/fantasy-battle/armady"
    : "/games/fantasy-battle/armies";
}

function selectionHref(locale: Locale) {
  return localPath("fantasy", locale) + "#armady";
}

export function FantasyArmySelector({ locale }: { locale: Locale }) {
  return (
    <section id="armady" className="army-selector-section section-block">
      <div className="shell">
        <div className="section-heading section-heading--compact">
          <div>
            <p className="eyebrow">VM Fantasy Battle</p>
            <h2>{locale === "cs" ? "Vyber si armádu" : "Choose an army"}</h2>
          </div>
          <p>
            {locale === "cs"
              ? "Kliknutím na armádu se dozvíš víc o jejím příběhu, patronovi a kartách."
              : "Choose an army to learn about its story, patron and cards."}
          </p>
        </div>
        <div className="army-selector-grid">
          {armies.map((army) => (
            <Link
              key={army.id}
              href={galleryPath(locale) + "#" + army.id}
              className="army-selector-card"
            >
              <img
                src={assetPath("/images/fantasy-armies/" + army.thumbnail)}
                alt={army.imageAlt[locale]}
                width={320}
                height={400}
                loading="lazy"
              />
              <div className="army-selector-copy">
                <h3>{army.name[locale]}</h3>
                <p>{army.short[locale]}</p>
                <span className="army-selector-cta">
                  {locale === "cs" ? "Zjistit více" : "Learn more"}
                  <ArrowRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FantasyArmiesPage({ locale }: { locale: Locale }) {
  const isCs = locale === "cs";
  const otherLocale: Locale = isCs ? "en" : "cs";

  return (
    <div className="site-page game-theme game-theme--fantasy">
      <SiteHeader locale={locale} languageHref={galleryPath(otherLocale)} />
      <main id="main-content">
        <header className="army-directory-hero shell">
          <Link className="back-link" href={selectionHref(locale)}>
            <ArrowLeft aria-hidden="true" />
            {isCs ? "Zpět na výběr armád" : "Back to army selection"}
          </Link>
          <p className="eyebrow eyebrow--color">VM Fantasy Battle</p>
          <h1>{isCs ? "Poznej všech deset armád" : "Meet all ten armies"}</h1>
          <p>
            {isCs
              ? "Každá armáda má vlastní ilustraci a patrona. Všechny používají stejná pravidla; vyber si proto hlavně podle toho, za koho chceš hrát."
              : "Each army has its own illustration and patron. They all use the same rules, so choose the one you would most like to play."}
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
                    alt={army.imageAlt[locale]}
                    width={800}
                    height={1000}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="army-detail-copy">
                  <span className="army-detail-number">
                    {isCs ? "Armáda" : "Army"}{" "}
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2>{army.name[locale]}</h2>
                  <p className="army-patron">
                    <Shield aria-hidden="true" />
                    {isCs ? "Patron" : "Patron"}: {army.patron[locale]} · +5{" "}
                    {isCs ? "jednou za Bitvu" : "once per Battle"}
                  </p>
                  {army.paragraphs[locale].map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p className="army-pack-note">
                    {isCs
                      ? "PDF balík obsahuje karty " + army.pack.cs + " včetně patronů. Akční karty a pravidla se stahují zvlášť."
                      : "The PDF pack contains the " + army.pack.en + " cards, including their patrons. Download action cards and rules separately."}
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
                    {isCs
                      ? "Stáhnout karty " + army.pack.cs + " · PDF"
                      : "Download " + army.pack.en + " cards · PDF"}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="army-directory-return">
            <Link
              href={selectionHref(locale)}
              className={buttonVariants({
                size: "lg",
                className: "button-primary",
              })}
            >
              <ArrowLeft aria-hidden="true" />
              {isCs ? "Zpět na výběr armád" : "Back to army selection"}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
