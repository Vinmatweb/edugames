import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Shield } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AdsenseLoader } from "@/components/adsense-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { assetPath, localPath, type Locale } from "@/lib/site";

const armies = [
  {
    "id": "rytiri",
    "name": {
      "cs": "Rytíři",
      "en": "Knights"
    },
    "patron": {
      "cs": "Strážný anděl",
      "en": "Guardian Angel"
    },
    "image": "army-knights.webp",
    "thumbnail": "army-knights-thumb.webp",
    "imageAlt": {
      "cs": "Modře odění rytíři a jejich Strážný anděl nad nimi",
      "en": "Blue-armoured knights beneath their Guardian Angel"
    },
    "short": {
      "cs": "Chrání své království silou, disciplínou a pevnou zbrojí.",
      "en": "They defend their kingdom with strength, discipline and sturdy armour."
    },
    "paragraphs": {
      "cs": [
        "Odvážní rytíři chrání své království silou, disciplínou a pevnou zbrojí. Jejich patronem je anděl strážný, který nad armádou bdí.",
        "Strážný anděl může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty rytířů a zombíků včetně patronů; akční karty a pravidla se stahují zvlášť."
      ],
      "en": [
        "Brave knights defend their kingdom with strength, discipline and sturdy armour. Their Guardian Angel watches over the army.",
        "The Guardian Angel can add +5 once per Battle. This pack contains the Knights and Zombies cards, including their patrons; action cards and rules are downloaded separately."
      ]
    },
    "pack": {
      "cs": "rytířů a zombíků",
      "en": "Knights & Zombies"
    },
    "downloadFile": "vm-fantasy-battle-armies-knights-zombies.pdf",
    "patronImage": null
  },
  {
    "id": "nemrtvi",
    "name": {
      "cs": "Zombíci",
      "en": "Zombies"
    },
    "patron": {
      "cs": "Nekromancer",
      "en": "Necromancer"
    },
    "image": "army-undead.webp",
    "thumbnail": "army-undead-thumb.webp",
    "imageAlt": {
      "cs": "Řady nemrtvých bojovníků vedené Nekromancerem se zelenou magií",
      "en": "Ranks of undead warriors led by a Necromancer and green magic"
    },
    "short": {
      "cs": "Neúnavně se valí vpřed pod vedením Nekromancera.",
      "en": "They keep advancing under the Necromancer's command."
    },
    "paragraphs": {
      "cs": [
        "Nemrtví se pomalu, ale neúnavně valí vpřed. Vede je nekromant, který svou temnou magií povolává další bojovníky.",
        "Nekromancer může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty rytířů a zombíků včetně patronů; akční karty a pravidla se stahují zvlášť."
      ],
      "en": [
        "The Zombies advance slowly but relentlessly. Their Necromancer uses dark magic to call more fighters into the battle.",
        "The Necromancer can add +5 once per Battle. This pack contains the Knights and Zombies cards, including their patrons; action cards and rules are downloaded separately."
      ]
    },
    "pack": {
      "cs": "rytířů a zombíků",
      "en": "Knights & Zombies"
    },
    "downloadFile": "vm-fantasy-battle-armies-knights-zombies.pdf",
    "patronImage": null
  },
  {
    "id": "orkove",
    "name": {
      "cs": "Orkové",
      "en": "Orcs"
    },
    "patron": {
      "cs": "Orčí náčelník",
      "en": "Orc Chieftain"
    },
    "image": "army-orcs.webp",
    "thumbnail": "army-orcs-thumb.webp",
    "imageAlt": {
      "cs": "Mohutná orčí armáda s korunovaným vůdcem vepředu",
      "en": "A mighty Orc army with its crowned leader at the front"
    },
    "short": {
      "cs": "Síla, odolnost a neústupnost v čele s náčelníkem.",
      "en": "Strength and resilience led by a determined chieftain."
    },
    "paragraphs": {
      "cs": [
        "Orčí bojovníci spoléhají na sílu, odolnost a neústupnost. Jejich náčelník stojí v čele armády a žene ji do bitvy.",
        "Orčí náčelník může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty orků a skřetů včetně patronů; akční karty a pravidla se stahují zvlášť."
      ],
      "en": [
        "Orc warriors rely on strength, resilience and determination. Their chieftain leads from the front and drives the army into battle.",
        "The Orc Chieftain can add +5 once per Battle. This pack contains the Orcs and Goblins cards, including their patrons; action cards and rules are downloaded separately."
      ]
    },
    "pack": {
      "cs": "orků a skřetů",
      "en": "Orcs & Goblins"
    },
    "downloadFile": "vm-fantasy-battle-armies-orcs-goblins.pdf",
    "patronImage": null
  },
  {
    "id": "skreti",
    "name": {
      "cs": "Skřeti",
      "en": "Goblins"
    },
    "patron": {
      "cs": "Gobliní šaman",
      "en": "Goblin Shaman"
    },
    "image": "army-goblins.webp",
    "thumbnail": "army-goblins-thumb.webp",
    "imageAlt": {
      "cs": "Skřetí bojovníci vedení šamanem v kápi s magickou holí",
      "en": "Goblin fighters led by a hooded shaman with a magical staff"
    },
    "short": {
      "cs": "Mrštní a mazaní bojovníci, které vede šaman.",
      "en": "Quick and cunning fighters guided by their shaman."
    },
    "paragraphs": {
      "cs": [
        "Skřeti jsou mrštní a mazaní protivníci, kteří dokážou překvapit i silnější armádu. Jejich šaman je vede pomocí lstí a magie.",
        "Gobliní šaman může jednou za Bitvu podpořit armádu o +5. Balík obsahuje karty orků a skřetů včetně patronů; akční karty a pravidla se stahují zvlášť."
      ],
      "en": [
        "Goblins are nimble, cunning opponents who can surprise even a stronger army. Their shaman guides them with tricks and magic.",
        "The Goblin Shaman can add +5 once per Battle. This pack contains the Orcs and Goblins cards, including their patrons; action cards and rules are downloaded separately."
      ]
    },
    "pack": {
      "cs": "orků a skřetů",
      "en": "Orcs & Goblins"
    },
    "downloadFile": "vm-fantasy-battle-armies-orcs-goblins.pdf",
    "patronImage": null
  },
  {
    "id": "vily",
    "name": {
      "cs": "Víly",
      "en": "Fairies"
    },
    "patron": {
      "cs": "Smaragdová královna",
      "en": "Emerald Queen"
    },
    "image": "cards-fairies-10.webp",
    "thumbnail": "cards-fairies-10-thumb.webp",
    "imageAlt": {
      "cs": "Karta 10 armády Víly",
      "en": "Card 10 from the Fairies army"
    },
    "short": {
      "cs": "Bojovnice i bojovníci s křídly a kouzly pod ochranou své královny.",
      "en": "Agile forest fighters led by the Emerald Queen."
    },
    "paragraphs": {
      "cs": [
        "Víly z kouzelného lesa spojují rychlost, obratnost a magii. Jejich armádu vede smaragdová královna, která chrání svůj lid.",
        "Smaragdová královna může jednou za Bitvu podpořit armádu o +5. Karty víl a zvířat včetně jejich patronů najdeš ve společném PDF balíku."
      ],
      "en": [
        "Fairies from the enchanted forest combine speed, agility and magic. The Emerald Queen leads the army and protects her people.",
        "The Emerald Queen can add +5 once per Battle. The Fairies and Animals cards, including their patrons, are in one shared PDF pack."
      ]
    },
    "pack": {
      "cs": "víl a zvířat",
      "en": "Fairies & Animals"
    },
    "downloadFile": "vm-fantasy-battle-armies-fairies-animals-v7.pdf",
    "patronImage": "cards-fairies-patron.webp"
  },
  {
    "id": "zvirata",
    "name": {
      "cs": "Zvířata",
      "en": "Animals"
    },
    "patron": {
      "cs": "Král zvířat",
      "en": "King of Beasts"
    },
    "image": "cards-animals-10.webp",
    "thumbnail": "cards-animals-patron-thumb.webp",
    "patronImage": "cards-animals-patron.webp",
    "imageAlt": {
      "cs": "Drak na kartě zvířecí armády s hodnotou 10",
      "en": "The dragon on the Animals army card with a strength of 10"
    },
    "short": {
      "cs": "Od bojové krysy po draka. Sílu pomáhají spočítat zlaté stopy.",
      "en": "From a battle rat to a dragon. Golden paw prints help count each card’s strength."
    },
    "paragraphs": {
      "cs": [
        "Zvířecí armáda spoléhá na sílu zubů, klů a drápů. Každá karta představuje jedno zvíře v brnění, od malé krysy až po draka s hodnotou 10.",
        "Číslo vyjadřuje sílu zvířete, nikoli počet zvířat na obrázku. Na kartách od 2 výše pomáhá hodnotu spočítat stejný počet zlatých stop. Lev patří výhradně patronovi: mohutnému Králi zvířat.",
        "Král zvířat přidává jednou za Bitvu +5. V přebíjené je patron nejsilnější kartou. Zvířata nahrazují původní vlky a sdílejí balík s vílami."
      ],
      "en": [
        "The Animals army draws its power from teeth, tusks and claws. Each card shows one armoured animal, from a small rat to a dragon with a strength of 10.",
        "The number shows the animal’s strength, not how many animals are pictured. On cards from 2 upwards, a matching number of golden paw prints helps children count the value. The lion appears only as the mighty King of Beasts patron.",
        "The King of Beasts adds +5 once per Battle. In High Card Battle, a patron beats every numbered card. Animals replace the original Wolves army and share a pack with the Fairies."
      ]
    },
    "pack": {
      "cs": "víl a zvířat",
      "en": "Fairies & Animals"
    },
    "downloadFile": "vm-fantasy-battle-armies-fairies-animals-v7.pdf"
  },
  {
    "id": "trpaslici",
    "name": {
      "cs": "Trpaslíci",
      "en": "Dwarves"
    },
    "patron": {
      "cs": "Král pod horou",
      "en": "Mountain King"
    },
    "image": "cards-dwarves-10.webp",
    "thumbnail": "cards-dwarves-10-thumb.webp",
    "imageAlt": {
      "cs": "Karta 10 armády Trpaslíci",
      "en": "Card 10 from the Dwarves army"
    },
    "short": {
      "cs": "Houževnatí obránci horských pevností s králem v čele.",
      "en": "Stout defenders of mountain strongholds, led by their king."
    },
    "paragraphs": {
      "cs": [
        "Trpaslíci z horských pevností spoléhají na pevné brnění, zkušenosti a vytrvalost. Král pod horou vede jejich obranu.",
        "Král pod horou může jednou za Bitvu podpořit armádu o +5. Karty trpaslíků a kostlivců včetně jejich patronů jsou v jednom PDF balíku."
      ],
      "en": [
        "Dwarves from the mountain strongholds rely on sturdy armour, experience and endurance. The Mountain King leads their defence.",
        "The Mountain King can add +5 once per Battle. The Dwarves and Skeletons cards, including their patrons, are in one shared PDF pack."
      ]
    },
    "pack": {
      "cs": "trpaslíků a kostlivců",
      "en": "Dwarves & Skeletons"
    },
    "downloadFile": "vm-fantasy-battle-armies-dwarves-skeletons-v1.pdf",
    "patronImage": "cards-dwarves-patron.webp"
  },
  {
    "id": "elfove",
    "name": {
      "cs": "Elfové",
      "en": "Elves"
    },
    "patron": {
      "cs": "Elfí patronka",
      "en": "Elven Queen"
    },
    "image": "cards-elves-10.webp",
    "thumbnail": "cards-elves-10-thumb.webp",
    "imageAlt": {
      "cs": "Karta 10 armády Elfové",
      "en": "Card 10 from the Elves army"
    },
    "short": {
      "cs": "Přesní bojovníci, kteří čerpají sílu z lesní magie.",
      "en": "Precise fighters drawing strength from forest magic."
    },
    "paragraphs": {
      "cs": [
        "Elfové spojují obratnost, přesné údery a kouzelnou sílu přírody. Ve stříbrném lese brání své území s rozvahou.",
        "Elfí patronka se zářivou aurou chrání celou armádu. Jednou za Bitvu může přidat +5; v přebíjené poráží každou číselnou kartu."
      ],
      "en": [
        "Elves combine agility, precise strikes and the magic of nature. They defend their silver forest with patience and care.",
        "The Elven Queen radiates a protective aura. Once per Battle, she can add +5; in High Card Battle, her card beats every numbered card."
      ]
    },
    "pack": {
      "cs": "elfů a draků",
      "en": "Elves & Dragons"
    },
    "downloadFile": "vm-fantasy-battle-armies-elves-dragons-v3.pdf",
    "patronImage": "cards-elves-patron.webp"
  },
  {
    "id": "draci",
    "name": {
      "cs": "Draci",
      "en": "Dragons"
    },
    "patron": {
      "cs": "Dračí patron",
      "en": "Dragon Patron"
    },
    "image": "cards-dragons-10.webp",
    "thumbnail": "cards-dragons-10-thumb.webp",
    "imageAlt": {
      "cs": "Karta 10 armády Draci",
      "en": "Card 10 from the Dragons army"
    },
    "short": {
      "cs": "Mocná letka draků s patronem, který chrání celé údolí.",
      "en": "A mighty flight of dragons protected by their patron."
    },
    "paragraphs": {
      "cs": [
        "Draci ovládají bojiště svou silou, křídly a odvahou. V čele legie stojí mocný patron, který chrání celé dračí údolí.",
        "Dračí patron může jednou za Bitvu podpořit armádu o +5. Karty draků a elfů včetně jejich patronů jsou v jednom PDF balíku."
      ],
      "en": [
        "Dragons command the battlefield with their strength, wings and courage. Their powerful patron protects the whole legion.",
        "The Dragon Patron can add +5 once per Battle. The Dragons and Elves cards, including their patrons, are in one shared PDF pack."
      ]
    },
    "pack": {
      "cs": "elfů a draků",
      "en": "Elves & Dragons"
    },
    "downloadFile": "vm-fantasy-battle-armies-elves-dragons-v3.pdf",
    "patronImage": "cards-dragons-patron.webp"
  },
  {
    "id": "kostlivci",
    "name": {
      "cs": "Kostlivci",
      "en": "Skeletons"
    },
    "patron": {
      "cs": "Král kostlivců",
      "en": "Skeleton King"
    },
    "image": "cards-skeletons-10.webp",
    "thumbnail": "cards-skeletons-10-thumb.webp",
    "patronImage": "cards-skeletons-patron.webp",
    "imageAlt": {
      "cs": "Deset kostlivých bojovníků na kartě s hodnotou 10",
      "en": "Ten skeletal warriors on the card with a value of 10"
    },
    "short": {
      "cs": "Kostlivá legie v prastaré zbroji pod velením svého krále.",
      "en": "A skeletal legion in ancient armour, commanded by its king."
    },
    "paragraphs": {
      "cs": [
        "Kostlivci vyrážejí ze starých pevností v oprýskané zbroji. Na každé kartě stojí různě vyzbrojení bojovníci a jejich počet odpovídá hodnotě karty.",
        "Král kostlivců září temnou magií a drží celou legii pohromadě. Jednou za Bitvu může přidat +5; v přebíjené jeho karta poráží každé číslo. Kostní béžovošedá barva odlišuje armádu od ostatních."
      ],
      "en": [
        "Skeletons march from ancient strongholds in weathered armour. Each card features distinct warriors, and their count matches the card’s value.",
        "The Skeleton King radiates dark magic and holds the legion together. Once per Battle, he can add +5; in High Card Battle, his card beats every number. Bone-grey beige makes this army easy to recognise."
      ]
    },
    "pack": {
      "cs": "trpaslíků a kostlivců",
      "en": "Dwarves & Skeletons"
    },
    "downloadFile": "vm-fantasy-battle-armies-dwarves-skeletons-v1.pdf"
  }
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
                alt={army.id === "zvirata" ? army.patron[locale] : army.imageAlt[locale]}
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
      <AdsenseLoader />
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
              ? "Deset armád, pět balíků karet a dva způsoby hraní. Bitva je pro 2–4 hráče, přebíjená pro 2–10. Zvířata nahradila vlky a kostlivci sdílejí balík s trpaslíky."
              : "Ten armies, five card packs and two ways to play. Battle is for 2–4 players and High Card Battle for 2–10. Animals replace Wolves, and Skeletons share a pack with Dwarves."}
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
                <div className={"army-detail-image" + (army.patronImage ? " army-detail-image--pair" : "")}>
                  {army.patronImage ? <>
                    <figure><img src={assetPath("/images/fantasy-armies/" + army.image)} alt={army.imageAlt[locale]} width={744} height={1008} loading="lazy" /><figcaption>{isCs ? "Karta 10" : "Card 10"}</figcaption></figure>
                    <figure><img src={assetPath("/images/fantasy-armies/" + army.patronImage)} alt={army.patron[locale]} width={744} height={1008} loading="lazy" /><figcaption>{army.patron[locale]} · +5</figcaption></figure>
                  </> : <img src={assetPath("/images/fantasy-armies/" + army.image)} alt={army.imageAlt[locale]} width={800} height={1000} loading={index === 0 ? "eager" : "lazy"} />}
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
