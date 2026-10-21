import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, UsersRound, Clock3, BookOpenCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { assetPath, localPath, type Locale } from "@/lib/site";

const content = {
  en: {
    back: "All games", title: "VM Word Race", sub: "Read • Race • Win", label: "Printable reading game",
    lead: "A calm, encouraging reading race for 1–4 children, played with a reader who can help sound out words. One player still needs a reading supervisor; this is not a self-guided game.",
    facts: [["Players","1–4"],["Age","about 6–8"],["Play time","about 5–15 min"],["Language","Czech"],["Format","Print and play"]],
    learnTitle:"What children practise", learn:"Recognising letters, saying their sounds, blending sounds into words, and noticing short and long vowels as part of reading, with no separate bonus. Reading speed gives no advantage.",
    howTitle:"How to play", steps:[
      "Prepare the chosen board, shuffle the word cards, and sort them into three piles by the printed move value: +1, +2 and +3. Players choose a car for the race track or a ship for the pirate route.",
      "The youngest player starts. Then turns continue from youngest to oldest. The child chooses a pile that feels right, turns over its top card, says the word one letter sound at a time, then says the whole word.",
      "If the word is read correctly, move the playing piece by the value printed on the card. Usually three-letter words are +1, four-letter words +2 and five-letter words +3. A harder word may be worth more; the printed value always decides.",
      "Special spaces activate only when a player ends their move there, unless the board marks or the agreed rules say otherwise."
    ],
    correctionTitle:"If a child makes a mistake", correction:"First invite the child to try to correct it. A self-correction earns the full move. If the child cannot correct it alone, help with the letters and let them say the whole word again. This practice try earns no movement. A mistake never takes away progress already made.",
    finishTitle:"Finish", finish:"The first player to reach the finish wins. Continue until everyone arrives and use the finish order for the remaining places. There is no timer and reading quickly brings no bonus.",
    mapsTitle:"Choose a map", maps:[
      ["Race track","Drive cars around the course, following the numbered spaces.","/images/word-race-track.webp","Race track board"],
      ["Pirate route","Sail ships. If a turn ends on a marked entry space, follow its shortcut or return route as shown.","/images/word-race-pirates.webp","Pirate board with route markings"],
    ],
    variantsTitle:"Variants", variants:"The child normally chooses a card pile. As a variant, the reader or another player may choose the pile instead.",
    downloadsTitle:"Available print files", downloadIntro:"These Czech files are ready to print. Each download is checked and links to an existing PDF.",
    downloads:[["Word cards (A4, double-sided)","/downloads/vm-word-race-cards-cs.pdf"],["Race track board (A3, 32 spaces)","/downloads/vm-word-race-track-a3-cs.pdf"],["Four folding cars (A4)","/downloads/vm-word-race-cars-a4-cs.pdf"],["Pirate route board (A3)","/downloads/vm-word-race-pirate-map-a3-cs.pdf"],["Pirate ships (A4)","/downloads/vm-word-race-pirate-ships-a4-cs.pdf"]],
    unavailable:"English word cards are not available yet; the included word cards are in Czech.",
    supervision:"Adult or older-child reading supervision is required for every game, including solo play.",
  },
  cs: {
    back:"Všechny hry", title:"VM Word Race", sub:"Čti • Závoď • Vyhraj", label:"Tisknutelná čtecí hra",
    lead:"Klidná a povzbuzující čtecí závodní hra pro 1–4 děti, které hrají s někým, kdo umí číst a pomůže s hláskováním. I při hře jednoho dítěte je čtenářský dohled nutný.",
    facts:[["Hráči","1–4"],["Věk","přibližně 6–8 let"],["Délka","přibližně 5–15 min"],["Jazyk","čeština"],["Formát","k vytištění"]],
    learnTitle:"Co si děti procvičí", learn:"Poznávání písmen, čtení hlásek, spojování hlásek do slov a rozlišování krátkých a dlouhých samohlásek jako součást čtení bez zvláštního bonusu. Rychlost čtení nepřináší výhodu.",
    howTitle:"Jak se hraje", steps:[
      "Připravte vybranou mapu, zamíchejte slovní karty a rozdělte je do tří hromádek podle vytištěné hodnoty pohybu: +1, +2 a +3. Hráči si podle mapy vyberou auto pro závodní okruh nebo loď pro pirátskou trasu.",
      "Začíná nejmladší hráč. Potom hrají ostatní od nejmladšího po nejstaršího. Dítě si vybere hromádku podle toho, na jakou obtížnost se cítí, otočí horní kartu, přečte slovo po jednotlivých hláskách a potom ho vysloví celé.",
      "Při správném přečtení posune figurku o hodnotu vytištěnou na kartě. Obvykle mají třípísmenná slova hodnotu +1, čtyřpísmenná +2 a pětipísmenná +3. Náročnější slovo může mít vyšší hodnotu; vždy rozhoduje číslo na kartě.",
      "Speciální políčko se aktivuje jen tehdy, když na něm hráč skončí svůj pohyb, pokud značení mapy nebo domluvená pravidla neurčují jinak."
    ],
    correctionTitle:"Když dítě udělá chybu", correction:"Čtenář nejprve dítě vyzve, aby se pokusilo opravit. Pokud se opraví samo, získá celý pohyb z karty. Když to samo nezvládne, čtenář mu pomůže s písmeny a dítě zkusí vyslovit celé slovo znovu. Tento procvičovací pokus už pohyb nepřidá. Chyba nikdy neubere dříve získaný postup.",
    finishTitle:"Konec hry", finish:"Vyhrává hráč, který dojede do cíle jako první. Hraje se dál, dokud nedorazí všichni; pořadí v cíli určí další umístění. Hra se nehraje na čas a rychlejší čtení nepřináší bonus.",
    mapsTitle:"Vyberte mapu", maps:[
      ["Závodní okruh","Hráči jedou auty po závodní trati a postupují po vyznačených políčkách.","/images/word-race-track.webp","Herní plán závodního okruhu"],
      ["Pirátská mapa","Hráči plují loděmi. Pokud tah skončí na označeném vstupním políčku, použijí zkratku nebo vracečku podle značení.","/images/word-race-pirates.webp","Pirátská mapa se značenou trasou"],
    ],
    variantsTitle:"Varianty", variants:"Základní pravidlo je, že si hromádku vybírá dítě. Ve variantě může hromádku určit čtenář nebo další hráč.",
    downloadsTitle:"Dostupné soubory k tisku", downloadIntro:"Tyto české soubory jsou připravené k tisku. Každý odkaz vede na existující PDF.",
    downloads:[["Slovní karty (A4, oboustranně)","/downloads/vm-word-race-cards-cs.pdf"],["Závodní okruh (A3, 32 políček)","/downloads/vm-word-race-track-a3-cs.pdf"],["Čtyři skládací autíčka (A4)","/downloads/vm-word-race-cars-a4-cs.pdf"],["Pirátská mapa (A3)","/downloads/vm-word-race-pirate-map-a3-cs.pdf"],["Pirátské lodě (A4)","/downloads/vm-word-race-pirate-ships-a4-cs.pdf"]],
    unavailable:"Anglické slovní karty zatím nejsou k dispozici; přiložené karty se slovy jsou v češtině.",
    supervision:"Dohled dospělého nebo staršího dítěte, které umí číst, je nutný při každé hře včetně hry jednoho dítěte.",
  }
} as const;

export function WordRacePage({ locale }: { locale: Locale }) {
  const c = content[locale];
  return <div className="site-page"><SiteHeader locale={locale} languageHref={localPath("wordRace", locale === "cs" ? "en" : "cs")} />
    <main id="main-content" className="word-race-page">
      <div className="shell word-race-shell">
        <Link className="text-link wr-back" href={localPath("home",locale)}><ArrowLeft aria-hidden="true"/>{c.back}</Link>
        <header className="wr-hero"><div><p className="eyebrow">{c.label}</p><h1>{c.title}</h1><p className="wr-subtitle">{c.sub}</p><p className="wr-lead">{c.lead}</p><ul className="wr-facts">{c.facts.map(([k,v])=><li key={k}><strong>{k}</strong><span>{v}</span></li>)}</ul></div><img src={assetPath("/images/word-race-track.webp")} alt={locale==="cs"?"Náhled závodního okruhu":"Race track preview"} /></header>
        <section className="wr-learn"><BookOpenCheck aria-hidden="true"/><div><h2>{c.learnTitle}</h2><p>{c.learn}</p></div></section>
        <section className="wr-section"><h2>{c.howTitle}</h2><ol className="wr-steps">{c.steps.map((x,i)=><li key={x}><span>{i+1}</span><p>{x}</p></li>)}</ol><aside className="wr-note"><h3>{c.correctionTitle}</h3><p>{c.correction}</p></aside><aside className="wr-note"><h3>{c.finishTitle}</h3><p>{c.finish}</p></aside></section>
        <section className="wr-section"><h2>{c.mapsTitle}</h2><div className="wr-maps">{c.maps.map(([title,desc,img,alt])=><article className="wr-map" key={title}><img src={assetPath(img)} alt={alt}/><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>
        <section className="wr-section wr-variants"><h2>{c.variantsTitle}</h2><p>{c.variants}</p></section>
        <section className="wr-section" id="downloads"><h2>{c.downloadsTitle}</h2><p>{c.downloadIntro}</p><ul className="wr-downloads">{c.downloads.map(([title,href])=><li key={href}><a href={assetPath(href)} download><Download aria-hidden="true"/><span>{title}</span><ArrowRight aria-hidden="true"/></a></li>)}</ul><p className="wr-unavailable">{c.unavailable}</p></section>
        <p className="wr-supervision"><UsersRound aria-hidden="true"/>{c.supervision}</p>
      </div>
    </main><SiteFooter locale={locale}/></div>;
}
