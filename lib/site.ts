export const BASE_PATH = "/edugames";
export const SITE_URL = "https://vinmat.eu/edugames";

export type Locale = "en" | "cs";

export const paths = {
  home: { en: "/", cs: "/cs" },
  about: { en: "/about", cs: "/cs/o-projektu" },
  guide: { en: "/guides/print-and-play", cs: "/cs/pruvodce/tisk-a-hrani" },
  privacy: { en: "/privacy", cs: "/cs/ochrana-soukromi" },
  terms: { en: "/terms", cs: "/cs/podminky" },
  fantasy: {
    en: "/games/fantasy-battle",
    cs: "/cs/hry/fantasy-battle",
  },
  racing: {
    en: "/games/racing-math",
    cs: "/cs/hry/zavodni-matematika",
  },
} as const;

export function localPath(key: keyof typeof paths, locale: Locale) {
  return paths[key][locale];
}

export function assetPath(path: string) {
  return `${BASE_PATH}${path}`;
}

export const sharedCopy = {
  en: {
    navGames: "Games",
    navGuide: "Print & play guide",
    navAbout: "About",
    languageLabel: "Česky",
    languageCode: "CS",
    footerLine: "Free games for curious minds and busy family tables.",
    footerGames: "Games",
    footerGuide: "Print guide",
    footerAbout: "About the project",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerMain: "VinMat home",
    free: "Free",
    viewGame: "View game",
    players: "players",
    years: "years",
    minutes: "minutes",
    skip: "Skip to content",
  },
  cs: {
    navGames: "Hry",
    navGuide: "Návod k tisku",
    navAbout: "O projektu",
    languageLabel: "English",
    languageCode: "EN",
    footerLine: "Hry zdarma pro zvídavé děti a společné rodinné hraní.",
    footerGames: "Hry",
    footerGuide: "Návod k tisku",
    footerAbout: "O projektu",
    footerPrivacy: "Soukromí",
    footerTerms: "Podmínky",
    footerMain: "Hlavní web VinMat",
    free: "Zdarma",
    viewGame: "Zobrazit hru",
    players: "hráči",
    years: "let",
    minutes: "minut",
    skip: "Přejít na obsah",
  },
} as const;

export const homeCopy = {
  en: {
    eyebrow: "Free print-and-play games",
    title: "Learning happens at the table.",
    intro:
      "Short card and board games that turn arithmetic, comparison and strategic thinking into shared play. Choose a game, print it and start in a few minutes.",
    statGames: "original games",
    statAge: "designed for ages",
    statPrice: "to download",
    gamesTitle: "Choose today’s game",
    gamesIntro:
      "Every game focuses on a clear skill, keeps the rules short and offers an easier way to begin.",
    howTitle: "From screen to game night",
    steps: [
      {
        number: "01",
        title: "Choose",
        text: "Check the age, play time and skills before you download.",
      },
      {
        number: "02",
        title: "Print",
        text: "Use the simple print guide and materials you already have at home.",
      },
      {
        number: "03",
        title: "Play",
        text: "Start with the easiest mode, then raise the challenge when it feels right.",
      },
    ],
    whyTitle: "Built around real family play",
    whyText:
      "The games are tested at the table, not designed as disguised worksheets. Children make choices, tell the result out loud and see numbers change through the story of a battle or a race.",
    principles: [
      "One main learning goal per game",
      "Short rounds with a clear finish",
      "Difficulty that grows with the child",
      "No account, no paywall, no data collection",
    ],
    guideCta: "Read the print & play guide",
    nextTitle: "More games are on the workbench",
    nextText:
      "New card, board and travel games will join the library after they have been tested and the rules are ready for families and classrooms.",
  },
  cs: {
    eyebrow: "Hry k vytištění zdarma",
    title: "Učení patří ke společnému stolu.",
    intro:
      "Krátké karetní a deskové hry, které mění počítání, porovnávání i jednoduchou strategii ve společnou zábavu. Vyberte hru, vytiskněte ji a za pár minut můžete začít.",
    statGames: "originální hry",
    statAge: "určeno pro věk",
    statPrice: "ke stažení",
    gamesTitle: "Vyberte dnešní hru",
    gamesIntro:
      "Každá hra procvičuje konkrétní dovednost, má stručná pravidla a nabízí jednodušší variantu pro začátek.",
    howTitle: "Z obrazovky ke hraní",
    steps: [
      {
        number: "01",
        title: "Vyberte",
        text: "Před stažením zkontrolujte věk, délku hry a procvičované dovednosti.",
      },
      {
        number: "02",
        title: "Vytiskněte",
        text: "Použijte stručný návod a materiály, které už máte doma.",
      },
      {
        number: "03",
        title: "Hrajte",
        text: "Začněte nejlehčí variantou a obtížnost zvyšujte až ve správný čas.",
      },
    ],
    whyTitle: "Navrženo pro skutečné rodinné hraní",
    whyText:
      "Hry zkoušíme u stolu a nechceme z nich dělat pracovní listy v přestrojení. Děti se rozhodují, říkají výsledek nahlas a vidí, jak se čísla mění v příběhu bitvy nebo závodu.",
    principles: [
      "Jeden hlavní vzdělávací cíl v každé hře",
      "Krátká kola s jasným koncem",
      "Obtížnost, která roste spolu s dítětem",
      "Bez účtu, bez placené brány a bez sběru dat",
    ],
    guideCta: "Přečíst návod k tisku a hraní",
    nextTitle: "Další hry vznikají",
    nextText:
      "Knihovna se bude rozšiřovat o nové karetní, deskové i cestovní hry, jakmile projdou zkoušením a budou mít srozumitelná pravidla pro rodiny i školy.",
  },
} as const;

export type GameKey = "fantasy" | "racing";

type GameTranslation = {
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  status: string;
  coverAlt: string;
  skills: string[];
  overviewTitle: string;
  overview: string[];
  learnTitle: string;
  learnIntro: string;
  learningPoints: { title: string; text: string }[];
  rulesTitle: string;
  rulesIntro: string;
  steps: { title: string; text: string }[];
  modesTitle: string;
  modes: { title: string; text: string }[];
  contentsTitle: string;
  contents: string[];
  downloadTitle: string;
  downloadText: string;
  primaryDownload: string;
  secondaryDownload?: string;
  primaryFile: string;
  secondaryFile?: string;
  pdfNote: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  relatedEyebrow: string;
  relatedText: string;
};

type Game = {
  key: GameKey;
  image: string;
  players: string;
  age: string;
  time: string;
  routeKey: "fantasy" | "racing";
  accent: "fantasy" | "racing";
  en: GameTranslation;
  cs: GameTranslation;
};

export const games: Record<GameKey, Game> = {
  fantasy: {
    key: "fantasy",
    image: "/images/fantasy-battle-cover.png",
    players: "2–4",
    age: "6–9",
    time: "10–20",
    routeKey: "fantasy",
    accent: "fantasy",
    en: {
      title: "VM Fantasy Battle",
      shortTitle: "Fantasy Battle",
      category: "Card game · arithmetic",
      summary:
        "Build an army from number cards, launch attacks and call for support. Every move turns into a calculation the whole table can see.",
      status: "Knights vs Undead · ready to print",
      coverAlt:
        "A friendly fantasy angel and knight facing a young necromancer and cartoon undead in a castle courtyard",
      skills: [
        "Addition and subtraction within 20",
        "Building the same number in different ways",
        "Comparing values and making simple choices",
      ],
      overviewTitle: "A number line disguised as a fantasy battle",
      overview: [
        "Each unit card has a value. The cards in front of a player show the current size of that army. An ATTACK subtracts units, SUPPORT adds units and a patron can grant one carefully timed +5 boost.",
        "After every change, the player rebuilds the army with a new combination of cards. A total of 7 might be 5 + 2, 4 + 3 or a single 7. The arithmetic is visible, movable and easy for another player to check.",
        "The current printable pack contains Knights and Undead for two players. The universal rules also describe free-for-all and team play for three or four players when additional army sets are available.",
      ],
      learnTitle: "What children practise",
      learnIntro:
        "The calculation has an immediate purpose: it decides what happens to an army. That context makes repeated practice feel like part of the game.",
      learningPoints: [
        {
          title: "Mental arithmetic",
          text: "Attack and support cards repeatedly practise small additions and subtractions without a worksheet.",
        },
        {
          title: "Number composition",
          text: "Rebuilding an army shows that one total can be made from several different combinations.",
        },
        {
          title: "Decision making",
          text: "Players choose between attacking, taking support or saving their one-use patron for later.",
        },
      ],
      rulesTitle: "How to play the main battle",
      rulesIntro:
        "Begin at 10 units for the easiest game. Move to 15 or 20 only when every player is comfortable with the range.",
      steps: [
        {
          title: "Build the armies",
          text: "Each player chooses an army, places unit cards worth 10, 15 or 20 in front of them and keeps the remaining unit cards as a reserve. Put the +5 patron face up.",
        },
        {
          title: "Choose one action",
          text: "On a turn, draw one ATTACK against an opponent, draw one SUPPORT for your own army, or use your patron once for +5.",
        },
        {
          title: "Say the calculation",
          text: "Work out the new total aloud, then rebuild the affected army from any matching combination of its unit cards.",
        },
        {
          title: "Reach zero",
          text: "An army at 0 is defeated. With two or three players, the last army wins; with four players, the surviving team wins.",
        },
      ],
      modesTitle: "Choose the right challenge",
      modes: [
        {
          title: "Beginner · start at 10",
          text: "Use attacks −1 to −3 and support +1 to +3. Agree on 10 as the highest total if you want a firm ceiling.",
        },
        {
          title: "Adventurer · start at 15",
          text: "Use attacks −1 to −5 and support +1 to +5. The larger range creates more ways to rebuild an army.",
        },
        {
          title: "Hero · start at 20",
          text: "Use the whole deck, including −6 attacks. Play without a ceiling when everyone is ready.",
        },
        {
          title: "High-card clash",
          text: "For a faster second game, every player flips one army card. The highest value wins the round; tied leaders flip again. Most won rounds wins.",
        },
      ],
      contentsTitle: "Current free set",
      contents: [
        "18 Knight unit cards",
        "18 Undead unit cards",
        "18 ATTACK cards",
        "9 SUPPORT cards",
        "2 patron cards (+5)",
        "Battle Logs and Czech rules",
      ],
      downloadTitle: "Download the free game",
      downloadText:
        "The illustrated cards are a Czech first edition. The complete English rules are available on this page; an English printable pack will follow after playtesting.",
      primaryDownload: "Download cards · Czech PDF",
      secondaryDownload: "Download universal rules · Czech PDF",
      primaryFile: "/downloads/vm-fantasy-battle-cards-cs-v1.pdf",
      secondaryFile: "/downloads/vm-fantasy-battle-rules-cs.pdf",
      pdfNote: "A4 · 100% scale · illustrated two-player set",
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Does a child need to calculate alone?",
          a: "No. Let the child point to cards or count along the number range. Another player can help, then ask the child to say the complete calculation aloud.",
        },
        {
          q: "What happens if support goes above the agreed maximum?",
          a: "Calculate the result together, discard that support card and leave the army unchanged. Use the patron only when its full +5 fits.",
        },
        {
          q: "Do unit cards disappear after an attack?",
          a: "No. Unit cards move between the table and that player's reserve. Only the army total changes; the cards remain available for rebuilding.",
        },
        {
          q: "Can four children play with the current download?",
          a: "The current illustrated set contains two armies. A four-player team game needs four distinct army sets, so keep this edition to two players unless you print or create two clearly distinguishable extra armies.",
        },
      ],
      relatedEyebrow: "Try another kind of maths",
      relatedText:
        "Prefer a shared track to a head-to-head battle? Racing Math turns plus and minus into overtaking.",
    },
    cs: {
      title: "VM Fantasy Battle",
      shortTitle: "Fantasy Battle",
      category: "Karetní hra · počítání",
      summary:
        "Sestavte armádu z číselných karet, útočte a povolávejte posily. Každý tah se promění ve výpočet, který vidí celý stůl.",
      status: "Rytíři vs. Nemrtví · připraveno k tisku",
      coverAlt:
        "Přátelský fantasy archanděl a rytíř proti mladému nekromantovi a kresleným nemrtvým na nádvoří hradu",
      skills: [
        "Sčítání a odčítání do 20",
        "Rozklad stejného čísla různými způsoby",
        "Porovnávání hodnot a jednoduché rozhodování",
      ],
      overviewTitle: "Číselná osa ukrytá ve fantasy bitvě",
      overview: [
        "Každá karta jednotek má hodnotu. Součet karet před hráčem udává velikost jeho armády. ATTACK jednotky ubírá, SUPPORT je přidává a patron může jednou za hru přinést dobře načasovaných +5.",
        "Po každé změně hráč sestaví armádu znovu v jiné kombinaci. Sedm může být 5 + 2, 4 + 3 nebo jedna karta 7. Výpočet je vidět, lze s ním pohybovat a ostatní ho snadno zkontrolují.",
        "Aktuální sada obsahuje rytíře a nemrtvé pro dva hráče. Univerzální pravidla už popisují také hru každý za sebe a týmovou hru pro tři až čtyři hráče s dalšími armádami.",
      ],
      learnTitle: "Co si děti procvičí",
      learnIntro:
        "Výpočet má okamžitý smysl: rozhoduje o osudu armády. Opakované počítání proto působí jako součást hry, ne jako pracovní list.",
      learningPoints: [
        {
          title: "Počítání zpaměti",
          text: "Útoky a posily opakovaně procvičují malé příklady na sčítání a odčítání.",
        },
        {
          title: "Rozklad čísla",
          text: "Přestavování armády ukazuje, že stejný součet lze složit z různých kombinací.",
        },
        {
          title: "Rozhodování",
          text: "Hráč volí mezi útokem, posilou a patronem, kterého lze použít jen jednou.",
        },
      ],
      rulesTitle: "Jak se hraje hlavní bitva",
      rulesIntro:
        "Pro první partii začněte s 10 jednotkami. Na 15 nebo 20 přejděte, až když tento rozsah bezpečně zvládnou všichni hráči.",
      steps: [
        {
          title: "Připravte armády",
          text: "Každý si vybere armádu, vyloží jednotky v hodnotě 10, 15 nebo 20 a zbytek nechá v zásobě. Patrona +5 položí lícem nahoru.",
        },
        {
          title: "Vyberte jednu akci",
          text: "V tahu otočte ATTACK proti soupeři, SUPPORT pro vlastní armádu, nebo jednou za hru použijte patrona +5.",
        },
        {
          title: "Řekněte výpočet",
          text: "Nový počet spočítejte nahlas a zasaženou armádu znovu sestavte z libovolné správné kombinace jejích karet.",
        },
        {
          title: "Dostaňte soupeře na nulu",
          text: "Armáda na 0 vypadává. Ve dvou nebo třech vyhrává poslední armáda; ve čtyřech tým, kterému alespoň jedna armáda zůstala.",
        },
      ],
      modesTitle: "Zvolte správnou obtížnost",
      modes: [
        {
          title: "Začátečník · start 10",
          text: "Použijte útoky −1 až −3 a posily +1 až +3. Pokud chcete pevný strop, domluvte maximum 10.",
        },
        {
          title: "Dobrodruh · start 15",
          text: "Použijte útoky −1 až −5 a posily +1 až +5. Větší rozsah nabízí více způsobů, jak armádu sestavit.",
        },
        {
          title: "Hrdina · start 20",
          text: "Použijte celý balíček včetně útoků −6. Bez stropu hrajte až ve chvíli, kdy jsou všichni připraveni.",
        },
        {
          title: "Přebíjená",
          text: "Pro rychlou druhou hru všichni otočí kartu armády. Nejvyšší hodnota vyhraje kolo; hráči ve shodě otočí další kartu. Vítězí nejvíce vyhraných kol.",
        },
      ],
      contentsTitle: "Aktuální sada zdarma",
      contents: [
        "18 karet jednotek rytířů",
        "18 karet jednotek nemrtvých",
        "18 karet ATTACK",
        "9 karet SUPPORT",
        "2 karty patronů (+5)",
        "Battle Logy a česká pravidla",
      ],
      downloadTitle: "Stáhněte si hru zdarma",
      downloadText:
        "Ilustrované karty jsou hotovou první českou edicí. Samostatně si můžete stáhnout také univerzální pravidla se hrou pro 2–4 hráče a variantou Přebíjená.",
      primaryDownload: "Stáhnout karty · české PDF",
      secondaryDownload: "Stáhnout univerzální pravidla · PDF",
      primaryFile: "/downloads/vm-fantasy-battle-cards-cs-v1.pdf",
      secondaryFile: "/downloads/vm-fantasy-battle-rules-cs.pdf",
      pdfNote: "A4 · tisk 100 % · ilustrovaná sada pro dva hráče",
      faqTitle: "Časté otázky",
      faqs: [
        {
          q: "Musí dítě počítat úplně samo?",
          a: "Nemusí. Nechte ho ukazovat na karty nebo počítat po číselné řadě. Jiný hráč může pomoci, ale dítě pak řekne celý příklad nahlas.",
        },
        {
          q: "Co když posila překročí domluvené maximum?",
          a: "Výsledek společně spočítejte, kartu posily odložte a armádu neměňte. Patrona použijte až tehdy, když se jeho celých +5 vejde.",
        },
        {
          q: "Mizí jednotkové karty po útoku?",
          a: "Ne. Karty jednotek se přesouvají mezi stolem a zásobou stejného hráče. Mění se pouze síla armády; všechny karty zůstávají k dispozici pro další přestavování.",
        },
        {
          q: "Mohou se současným souborem hrát čtyři děti?",
          a: "Aktuální ilustrovaná sada obsahuje dvě armády. Pro týmovou hru ve čtyřech jsou potřeba čtyři odlišitelné armády, proto tuto edici zatím používejte pro dva hráče.",
        },
      ],
      relatedEyebrow: "Zkuste jiný druh počítání",
      relatedText:
        "Dáváte přednost společné trati před soubojem? Závodní matematika mění plus a minus v předjíždění.",
    },
  },
  racing: {
    key: "racing",
    image: "/images/racing-math-cover.png",
    players: "2–4",
    age: "6–8",
    time: "10–15",
    routeKey: "racing",
    accent: "racing",
    en: {
      title: "Racing Math",
      shortTitle: "Racing Math",
      category: "Board & card game · number line",
      summary:
        "Draw a racing event, calculate the new position and move your car through the field. Lower numbers mean you are closer to the finish.",
      status: "Playtest edition · Czech printable",
      coverAlt:
        "Six colourful racing cars including a prototype, roadster, rally car, buggy and retro streamliner",
      skills: [
        "Adding and subtracting positions",
        "Orientation on a number line",
        "Attention, prediction and fair comparison",
      ],
      overviewTitle: "Every calculation changes the race",
      overview: [
        "Players start on positions 1–10 or 1–20 and draw one racing card in each of five rounds. Overtaking moves a token towards a lower number; losing places moves it towards a higher number.",
        "A child says the full calculation before moving: for example, “8 − 2 = 6.” The position cards remain on the table, so the number line is always visible and can be followed with a finger.",
        "The playtest PDF contains twenty named cars, matching tokens, start positions and fifty racing cards. All cars play equally—the different styles simply make choosing one more fun.",
      ],
      learnTitle: "What children practise",
      learnIntro:
        "A race gives direction to plus and minus. Children can see why subtracting positions is good here: first place is the smallest number.",
      learningPoints: [
        {
          title: "Number-line movement",
          text: "Tokens make each operation physical: move left for overtaking, right for losing places.",
        },
        {
          title: "Arithmetic in context",
          text: "Short calculations from 1 to 10 or 1 to 20 have an immediate result on the track.",
        },
        {
          title: "Flexible difficulty",
          text: "The small race removes the largest changes; the Grand Prix uses the complete range and deck.",
        },
      ],
      rulesTitle: "How to run the race",
      rulesIntro:
        "The game lasts five rounds, so everyone knows when the finish is coming. Empty places represent cars in the rest of the field.",
      steps: [
        {
          title: "Choose the race",
          text: "Use positions 1–10 for the small race or all positions 1–20 for the Grand Prix. Remove ±4 and ±5 cards from the small-race deck.",
        },
        {
          title: "Draw the starting grid",
          text: "Each player chooses a car and its matching token, then draws a start card and places the token on that position.",
        },
        {
          title: "Race for five rounds",
          text: "Starting with the best grid position, players take turns drawing one card, saying the calculation and moving the token.",
        },
        {
          title: "Check the finish",
          text: "After round five, the lowest position number wins. Tied leaders share the win; more than one token may occupy a position.",
        },
      ],
      modesTitle: "Two race sizes",
      modes: [
        {
          title: "Small race · positions 1–10",
          text: "Best for a first game. Remove changes ±4 and ±5; the remaining 34-card deck keeps every calculation within a shorter number line.",
        },
        {
          title: "Grand Prix · positions 1–20",
          text: "Use all twenty positions and the complete 50-card deck, including larger overtakes, pit stops, a yellow flag and Turbo.",
        },
        {
          title: "Track edges",
          text: "A car never moves beyond 1 or the last position. Count only the places still available and stop at the edge.",
        },
        {
          title: "Special events",
          text: "Yellow flag means no movement. Turbo immediately draws another card; chained Turbo cards remain one turn.",
        },
      ],
      contentsTitle: "Playtest pack",
      contents: [
        "20 car cards and 20 matching tokens",
        "20 position cards",
        "20 starting-position cards",
        "40 overtaking and position-loss cards",
        "10 special event cards",
        "Czech rules for both race sizes",
      ],
      downloadTitle: "Download the playtest edition",
      downloadText:
        "This is the complete Czech prototype used for rule testing. Artwork and card layout may still change; the English rules on this page match the current version.",
      primaryDownload: "Download playtest · Czech PDF",
      primaryFile: "/downloads/racing-math-print-and-play-cs-v1.pdf",
      pdfNote: "A4 · prototype v1 · 20 cars and 50 race cards",
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Why does overtaking subtract a number?",
          a: "Race positions run from 1st to last. Moving from 8th to 6th means overtaking two cars, so the calculation is 8 − 2 = 6.",
        },
        {
          q: "Can two cars stand on the same position?",
          a: "Yes. They share that position. If they also share the best position after round five, they share the victory.",
        },
        {
          q: "What if a card would move a car beyond the track?",
          a: "Stop at 1st place when overtaking or at the last position when losing places. Do not continue into zero or negative numbers.",
        },
        {
          q: "Do the twenty car types have different powers?",
          a: "No. Every car follows the same rules. Names, colours and shapes help players find a favourite without adding an advantage.",
        },
      ],
      relatedEyebrow: "Want more strategy?",
      relatedText:
        "VM Fantasy Battle adds choices, visible number combinations and a little friendly confrontation.",
    },
    cs: {
      title: "Závodní matematika",
      shortTitle: "Závodní matematika",
      category: "Desková a karetní hra · číselná osa",
      summary:
        "Otočte závodní událost, spočítejte novou pozici a projeďte autem startovním polem. Čím nižší číslo, tím blíž jste vítězství.",
      status: "Testovací verze · české PDF",
      coverAlt:
        "Šest barevných závodních aut včetně prototypu, roadsteru, rally auta, buggy a retro speciálu",
      skills: [
        "Sčítání a odčítání pozic",
        "Orientace na číselné ose",
        "Pozornost, odhad a férové porovnávání",
      ],
      overviewTitle: "Každý výpočet změní závod",
      overview: [
        "Hráči startují na pozicích 1–10 nebo 1–20 a v každém z pěti kol otočí jednu závodní kartu. Předjíždění posouvá žeton k nižšímu číslu, ztráta míst k vyššímu.",
        "Dítě před pohybem řekne celý příklad, například „8 − 2 = 6“. Karty pořadí zůstávají na stole, takže je číselná osa stále vidět a lze po ní ukazovat prstem.",
        "Testovací PDF obsahuje dvacet pojmenovaných aut, odpovídající žetony, startovní pozice a padesát závodních karet. Všechna auta hrají stejně; rozdílný vzhled jen zpříjemňuje výběr.",
      ],
      learnTitle: "Co si děti procvičí",
      learnIntro:
        "Závod dává plus a minus jasný směr. Děti vidí, proč je tady odčítání pozic výhodné: první místo má nejnižší číslo.",
      learningPoints: [
        {
          title: "Pohyb po číselné ose",
          text: "Žetony převádějí operaci do pohybu: při předjíždění doleva, při ztrátě míst doprava.",
        },
        {
          title: "Počítání v souvislostech",
          text: "Krátké příklady od 1 do 10 nebo do 20 okamžitě mění situaci na trati.",
        },
        {
          title: "Přizpůsobená obtížnost",
          text: "Malý závod vynechává největší změny; Velká cena používá celý rozsah i balíček.",
        },
      ],
      rulesTitle: "Jak závod probíhá",
      rulesIntro:
        "Hra trvá pět kol, takže všichni vědí, kdy se blíží cíl. Prázdná místa představují ostatní auta v závodním poli.",
      steps: [
        {
          title: "Vyberte závod",
          text: "Pro Malý závod použijte pozice 1–10, pro Velkou cenu 1–20. Z balíčku Malého závodu vyjměte změny ±4 a ±5.",
        },
        {
          title: "Vylosujte start",
          text: "Každý si vybere auto a odpovídající žeton, poté otočí startovní kartu a umístí žeton na vylosovanou pozici.",
        },
        {
          title: "Jeďte pět kol",
          text: "Začne nejlepší startovní pozice. Hráči postupně otáčejí kartu, řeknou výpočet a přesunou svůj žeton.",
        },
        {
          title: "Zkontrolujte cíl",
          text: "Po pátém kole vítězí nejnižší číslo. Hráči na stejné nejlepší pozici vítězí společně a více žetonů může stát na jednom místě.",
        },
      ],
      modesTitle: "Dvě délky tratě",
      modes: [
        {
          title: "Malý závod · pozice 1–10",
          text: "Nejlepší pro první partii. Vyjměte změny ±4 a ±5; zbývajících 34 karet udrží příklady na kratší číselné ose.",
        },
        {
          title: "Velká cena · pozice 1–20",
          text: "Použijte všech dvacet pozic a celý balíček 50 karet včetně většího předjíždění, pit stopů, žluté vlajky a Turba.",
        },
        {
          title: "Okraje trati",
          text: "Auto se nikdy neposune před 1. místo ani za poslední pozici. Odpočítejte jen zbývající místa a na okraji zastavte.",
        },
        {
          title: "Zvláštní události",
          text: "Žlutá vlajka znamená bez pohybu. Turbo okamžitě otáčí další kartu; i několik Turb za sebou zůstává jedním tahem.",
        },
      ],
      contentsTitle: "Obsah testovací sady",
      contents: [
        "20 karet aut a 20 odpovídajících žetonů",
        "20 karet pořadí",
        "20 startovních karet",
        "40 karet předjíždění a ztráty pozic",
        "10 karet zvláštních událostí",
        "Česká pravidla pro oba závody",
      ],
      downloadTitle: "Stáhněte testovací verzi",
      downloadText:
        "Toto je kompletní český prototyp určený pro zkoušení pravidel. Grafika a rozložení karet se ještě mohou měnit, pravidla na této stránce odpovídají aktuální verzi.",
      primaryDownload: "Stáhnout prototyp · české PDF",
      primaryFile: "/downloads/racing-math-print-and-play-cs-v1.pdf",
      pdfNote: "A4 · prototyp v1 · 20 aut a 50 závodních karet",
      faqTitle: "Časté otázky",
      faqs: [
        {
          q: "Proč se při předjíždění odčítá?",
          a: "Pořadí vede od prvního místa k poslednímu. Přesun z osmého na šesté místo znamená předjet dvě auta, tedy 8 − 2 = 6.",
        },
        {
          q: "Mohou dvě auta stát na stejné pozici?",
          a: "Ano, tuto pozici sdílejí. Pokud po pátém kole sdílejí i nejlepší pozici, vítězí společně.",
        },
        {
          q: "Co když by karta posunula auto mimo trať?",
          a: "Při předjíždění zastavte nejpozději na prvním místě, při ztrátě na poslední pozici. Nepokračujte do nuly ani záporných čísel.",
        },
        {
          q: "Mají jednotlivá auta různé schopnosti?",
          a: "Ne. Všechna auta používají stejná pravidla. Názvy, barvy a tvary pouze pomáhají vybrat si oblíbené auto bez herní výhody.",
        },
      ],
      relatedEyebrow: "Chcete více rozhodování?",
      relatedText:
        "VM Fantasy Battle přidává volbu akcí, skládání čísel a trochu přátelského soupeření.",
    },
  },
};

export const aboutCopy = {
  en: {
    eyebrow: "About VinMat School Games",
    title: "Small games with a clear learning purpose.",
    lead:
      "VinMat School Games is a free library of printable games for families, educators and children who learn best when numbers have a story and a reason.",
    sections: [
      {
        title: "Play comes first",
        paragraphs: [
          "A learning game still has to feel like a game. Players need choices, surprise, a goal and a finish they can understand. The calculation should move the story forward instead of interrupting it.",
          "That is why one title becomes a fantasy battle and another a motor race. The theme gives every number a job: units are added and removed, or a car changes its place in the field.",
        ],
      },
      {
        title: "Designed for a mixed table",
        paragraphs: [
          "Children rarely arrive with exactly the same confidence. Each game therefore starts with a smaller range or a reduced deck. Adults can help by pointing, counting or checking without taking the turn away from the child.",
          "Short games make it easy to try again. Raising the difficulty between rounds feels natural and does not require a completely different set of rules.",
        ],
      },
      {
        title: "Free, useful and honest",
        paragraphs: [
          "The printable content stays free for personal and educational use. Each download is labelled with its current stage, so a playtest prototype is not presented as a finished edition.",
          "This site is written for the adults who choose and prepare the games, while the games themselves are made for children. No account is needed and the current version does not collect personal data.",
        ],
      },
    ],
    valuesTitle: "The design checklist",
    values: [
      "The child can explain what a turn does.",
      "The main skill appears repeatedly without slowing the game.",
      "A simpler first game uses the same core rules.",
      "Components can be printed and understood at home.",
      "The end of the game is visible and arrives soon enough.",
      "Rules say clearly what is finished and what is still being tested.",
    ],
  },
  cs: {
    eyebrow: "O VinMat School Games",
    title: "Malé hry s jasným vzdělávacím cílem.",
    lead:
      "VinMat School Games je bezplatná knihovna her k vytištění pro rodiny, pedagogy a děti, kterým se lépe učí, když mají čísla příběh a smysl.",
    sections: [
      {
        title: "Hra je na prvním místě",
        paragraphs: [
          "I vzdělávací hra musí zůstat hrou. Hráči potřebují volbu, překvapení, srozumitelný cíl a konec. Výpočet má posouvat děj, ne ho přerušovat.",
          "Proto se z jedné hry stala fantasy bitva a z druhé automobilový závod. Téma dává číslům úkol: jednotky přibývají a ubývají nebo se auto posouvá v pořadí.",
        ],
      },
      {
        title: "Pro děti s různou zkušeností",
        paragraphs: [
          "Děti málokdy přicházejí ke stolu se stejnou jistotou. Každá hra proto začíná menším rozsahem nebo omezeným balíčkem. Dospělý může ukazovat, počítat nebo kontrolovat, aniž by dítěti vzal jeho tah.",
          "Krátkou hru lze snadno zopakovat. Zvýšení obtížnosti mezi partiemi působí přirozeně a nevyžaduje úplně nová pravidla.",
        ],
      },
      {
        title: "Zdarma, užitečně a otevřeně",
        paragraphs: [
          "Materiály zůstávají zdarma pro osobní a vzdělávací použití. U každého souboru je uveden aktuální stav, takže testovací prototyp nevydáváme za hotovou edici.",
          "Web je napsaný pro dospělé, kteří hry vybírají a připravují, zatímco samotné hry jsou určeny dětem. Není potřeba účet a současná verze neshromažďuje osobní údaje.",
        ],
      },
    ],
    valuesTitle: "Kontrolní seznam každé hry",
    values: [
      "Dítě dokáže vysvětlit, co jeho tah udělá.",
      "Hlavní dovednost se opakuje, ale nezpomaluje hru.",
      "Jednodušší první partie používá stejná základní pravidla.",
      "Komponenty lze doma vytisknout a pochopit.",
      "Konec hry je vidět a přijde ve správný čas.",
      "Pravidla otevřeně uvádějí, co je hotové a co se ještě testuje.",
    ],
  },
} as const;

export const guideCopy = {
  en: {
    eyebrow: "Print & play guide",
    title: "Good components without special equipment.",
    lead:
      "A home printer, ordinary scissors and a few minutes are enough. Start with a test page before printing a full deck.",
    sections: [
      {
        number: "01",
        title: "Check the file",
        text: "Download the PDF to your device and open it in a dedicated PDF reader. Browser print dialogs sometimes change scaling without making it obvious.",
      },
      {
        number: "02",
        title: "Print at actual size",
        text: "Choose A4 paper and 100% or Actual size. Turn off Fit, Shrink and borderless enlargement. Print one component page first and check its size before continuing.",
      },
      {
        number: "03",
        title: "Choose the material",
        text: "Ordinary office paper works for a quick test. For repeated play, use roughly 160–220 gsm paper, laminate the sheets or slide cut cards into sleeves with spare playing cards behind them.",
      },
      {
        number: "04",
        title: "Handle two-sided pages",
        text: "When a file contains fronts and backs, choose double-sided printing and flip on the long edge unless that PDF says otherwise. Test one pair first because printers feed paper differently.",
      },
      {
        number: "05",
        title: "Cut and organise",
        text: "Cut on the marked lines. Keep each deck in a labelled envelope or small zip bag; add the rules and note which difficulty cards were removed.",
      },
    ],
    tipsTitle: "Make the first game easier",
    tips: [
      "Read the goal and one turn before showing every exception.",
      "Play the first two turns face up and solve them together.",
      "Use the smaller number range even when the child is older.",
      "Let children point, move pieces and say the complete calculation.",
      "Stop after the planned short game; replaying is better than stretching it.",
    ],
    accessibilityTitle: "Colour is helpful, not the only signal",
    accessibilityText:
      "Important actions are also written with words, numbers and symbols. If colour is difficult to distinguish or you print in greyscale, read the action label and the + or − sign rather than relying on the card colour alone.",
  },
  cs: {
    eyebrow: "Návod k tisku a hraní",
    title: "Dobré herní komponenty i bez zvláštního vybavení.",
    lead:
      "Stačí domácí tiskárna, obyčejné nůžky a několik minut. Před tiskem celého balíčku vždy začněte jednou zkušební stranou.",
    sections: [
      {
        number: "01",
        title: "Zkontrolujte soubor",
        text: "PDF stáhněte do zařízení a otevřete v samostatné čtečce. Tiskové dialogy prohlížečů někdy nenápadně mění měřítko.",
      },
      {
        number: "02",
        title: "Tiskněte ve skutečné velikosti",
        text: "Zvolte papír A4 a měřítko 100 % nebo Skutečná velikost. Vypněte přizpůsobení, zmenšení i zvětšení bez okrajů. Nejdřív vytiskněte jednu stranu a zkontrolujte rozměr.",
      },
      {
        number: "03",
        title: "Vyberte materiál",
        text: "Na rychlou zkoušku stačí kancelářský papír. Pro opakované hraní použijte přibližně 160–220g papír, archy zalaminujte nebo vložte vystřižené karty do obalů se starou hrací kartou jako výztuhou.",
      },
      {
        number: "04",
        title: "Pohlídejte oboustranný tisk",
        text: "Obsahuje-li soubor líce a ruby, zvolte oboustranný tisk a převrácení přes delší stranu, pokud dané PDF neříká jinak. Nejprve vyzkoušejte jednu dvojici stran, protože každá tiskárna podává papír trochu jinak.",
      },
      {
        number: "05",
        title: "Vystřihněte a uložte",
        text: "Stříhejte podle vyznačených linií. Každý balíček uložte do popsané obálky nebo sáčku; přidejte pravidla a poznamenejte, které karty jste pro danou obtížnost vyřadili.",
      },
    ],
    tipsTitle: "Usnadněte první partii",
    tips: [
      "Nejdřív vysvětlete cíl a jeden tah, teprve potom výjimky.",
      "První dva tahy odehrajte odkrytě a vyřešte je společně.",
      "Menší číselný rozsah použijte klidně i u staršího dítěte.",
      "Nechte děti ukazovat, posouvat dílky a říkat celý příklad.",
      "Skončete po domluvené krátké partii; opakování je lepší než protahování.",
    ],
    accessibilityTitle: "Barva pomáhá, ale není jediným vodítkem",
    accessibilityText:
      "Důležité akce jsou napsané také slovy, čísly a symboly. Při horším rozlišování barev nebo černobílém tisku se řiďte názvem akce a znaménkem + nebo −, ne pouze barvou karty.",
  },
} as const;

export const legalCopy = {
  privacy: {
    en: {
      eyebrow: "Privacy",
      title: "A simple site with minimal data.",
      updated: "Last updated: 25 September 2026",
      sections: [
        {
          title: "Current site",
          text: "VinMat School Games does not require an account, does not offer comments and does not intentionally collect personal information. Printable files are downloaded directly from this website.",
        },
        {
          title: "Technical records",
          text: "The hosting provider may process basic server records such as an IP address, requested page, time and browser information to deliver the site, maintain security and diagnose errors. These records are not used here to build a child profile.",
        },
        {
          title: "Cookies and advertising",
          text: "The current version does not place advertising or analytics cookies. If contextual advertising or audience measurement is added later, this policy and the consent controls will be updated before those services are enabled. Child-appropriate and age-restricted ad treatment will be used where required.",
        },
        {
          title: "External links",
          text: "Links to the main VinMat website or other external services are governed by those services' own privacy information. Adults should supervise children when leaving this site.",
        },
      ],
    },
    cs: {
      eyebrow: "Ochrana soukromí",
      title: "Jednoduchý web s minimem údajů.",
      updated: "Poslední aktualizace: 25. září 2026",
      sections: [
        {
          title: "Současná verze webu",
          text: "VinMat School Games nevyžaduje účet, nenabízí komentáře a záměrně neshromažďuje osobní údaje. Soubory k tisku se stahují přímo z tohoto webu.",
        },
        {
          title: "Technické záznamy",
          text: "Poskytovatel hostingu může zpracovávat základní serverové záznamy, například IP adresu, navštívenou stránku, čas a údaje o prohlížeči, aby web doručil, chránil a mohl řešit chyby. Tyto záznamy zde neslouží k vytváření profilu dítěte.",
        },
        {
          title: "Cookies a reklama",
          text: "Současná verze nepoužívá reklamní ani analytické cookies. Pokud později přibude kontextová reklama nebo měření návštěvnosti, budou před zapnutím upraveny tyto zásady i volby souhlasu. Tam, kde je to nutné, bude nastaven režim odpovídající obsahu určenému dětem a omezení podle věku.",
        },
        {
          title: "Externí odkazy",
          text: "Odkazy na hlavní web VinMat nebo jiné externí služby se řídí jejich vlastními pravidly ochrany soukromí. Při odchodu z webu by na děti měl dohlížet dospělý.",
        },
      ],
    },
  },
  terms: {
    en: {
      eyebrow: "Terms of use",
      title: "Free to play, clear to share.",
      updated: "Last updated: 25 September 2026",
      sections: [
        {
          title: "Permitted use",
          text: "You may download and print the games for personal, family, classroom and non-commercial educational use. You may print enough copies for the group you directly teach or supervise.",
        },
        {
          title: "Please link instead of re-uploading",
          text: "Do not sell the files, remove VinMat branding, publish modified versions as official editions or upload the PDFs to another website. Share a link to the relevant game page so players receive the current rules and files.",
        },
        {
          title: "Playtest material",
          text: "A file labelled prototype or playtest edition may change after testing. Check the game page before printing again. Feedback can improve later editions, but submitting feedback does not transfer ownership of the game or its artwork.",
        },
        {
          title: "Adult preparation",
          text: "An adult should prepare printed components, supervise cutting tools and decide whether small pieces are suitable for the children playing. Stop using damaged or unsafe components.",
        },
        {
          title: "No guarantee",
          text: "The games are provided as-is for voluntary use. VinMat cannot guarantee compatibility with every printer, device, curriculum or individual learning need.",
        },
      ],
    },
    cs: {
      eyebrow: "Podmínky použití",
      title: "Hraní zdarma a jasná pravidla sdílení.",
      updated: "Poslední aktualizace: 25. září 2026",
      sections: [
        {
          title: "Povolené použití",
          text: "Hry můžete stahovat a tisknout pro osobní, rodinné, školní a jiné nekomerční vzdělávací použití. Lze vytisknout tolik kopií, kolik potřebuje skupina, kterou přímo učíte nebo vedete.",
        },
        {
          title: "Sdílejte odkaz, ne kopii souboru",
          text: "Soubory neprodávejte, neodstraňujte označení VinMat, nevydávejte upravené verze za oficiální edice a nenahrávejte PDF na jiný web. Sdílejte odkaz na stránku hry, aby ostatní získali aktuální pravidla i soubory.",
        },
        {
          title: "Testovací materiály",
          text: "Soubor označený jako prototyp nebo testovací verze se může po zkoušení změnit. Před dalším tiskem zkontrolujte stránku hry. Zpětná vazba může zlepšit další edice, jejím odesláním se však nepřevádí vlastnictví hry ani grafiky.",
        },
        {
          title: "Příprava dospělou osobou",
          text: "Tištěné komponenty má připravovat dospělý, který dohlédne na práci s nůžkami a posoudí vhodnost malých dílků pro konkrétní děti. Poškozené nebo nebezpečné komponenty dále nepoužívejte.",
        },
        {
          title: "Bez záruky",
          text: "Hry jsou poskytovány tak, jak jsou, pro dobrovolné použití. VinMat nemůže zaručit kompatibilitu s každou tiskárnou, zařízením, školním plánem ani individuální vzdělávací potřebou.",
        },
      ],
    },
  },
} as const;
