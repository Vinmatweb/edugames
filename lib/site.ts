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
    statAge: "age range across the library",
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
      "No account, no paywall, no advertising trackers",
    ],
    guideCta: "Read the print & play guide",
  },
  cs: {
    eyebrow: "Hry k vytištění zdarma",
    title: "Učení patří ke společnému stolu.",
    intro:
      "Krátké karetní a deskové hry, které mění počítání, porovnávání i jednoduchou strategii ve společnou zábavu. Vyberte hru, vytiskněte ji a za pár minut můžete začít.",
    statGames: "originální hry",
    statAge: "věkové rozpětí her",
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
      "Bez účtu, bez placené brány a bez reklamního sledování",
    ],
    guideCta: "Přečíst návod k tisku a hraní",
  },
} as const;

export type GameKey = "fantasy" | "racing";

type GameTranslation = {
  title: string;
  shortTitle: string;
  tagline?: string;
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
    image: "/images/fantasy-battle-169.webp",
    players: "2–4",
    age: "4–10",
    time: "10–20",
    routeKey: "fantasy",
    accent: "fantasy",
    en: {
      title: "VM Fantasy Battle",
      shortTitle: "Fantasy Battle",
      category: "Card game · arithmetic",
      summary:
        "Build an army from number cards, launch attacks and call for support. Every move turns into a calculation the whole table can see.",
      status: "10 armies · 2 games · ready to print",
      coverAlt:
        "A knight, zombie, orc and goblin facing each other in a sunset arena",
      skills: [
        "Addition and subtraction within 20",
        "Building the same number in different ways",
        "Comparing values and making simple choices",
      ],
      overviewTitle: "A number line disguised as a fantasy battle",
      overview: [
        "Each unit card has a value. The cards in front of a player show the current size of that army. An ATTACK subtracts units, SUPPORT adds units and a patron can grant one carefully timed +5 boost.",
        "After every change, the player rebuilds the army with a new combination of cards. A total of 7 might be 5 + 2, 4 + 3 or a single 7. The arithmetic is visible, movable and easy for another player to check.",
        "Choose from ten armies: Knights, Zombies, Orcs, Goblins, Fairies, Wolves, Dwarves, Elves, Dragons and Trolls. With two or three players, everyone plays for themselves; four-player Battle uses two teams.",
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
      modesTitle: "Two games with one set of cards",
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
        "10 armies with +5 patron cards",
        "2 action card sets: ATTACK and SUPPORT",
        "Battle with 3 difficulty levels and a quick High Card Clash",
        "Rules in English and Czech",
        "Optional Battle Logs for written calculations",
      ],
      downloadTitle: "Download the free game",
      downloadText:
        "Download the rules, five army packs, action cards and optional Battle Logs separately. For two-player Battle, choose an army pack and one action set (I or II). For three or four players, use four armies and both action sets. Duel needs only army unit cards. Card labels and logs are in English; the Czech and English rule booklets are available separately.",
      primaryDownload: "Knights & Zombies · PDF",
      secondaryDownload: "Download universal rules · Czech PDF",
      primaryFile: "/downloads/vm-fantasy-battle-armies-knights-zombies.pdf",
      secondaryFile: "/downloads/vm-fantasy-battle-rules-cs-v2.pdf",
      pdfNote: "A4 · 100% scale · 2 army packs + 2 action sets",
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
          q: "Which files do four players need?",
          a: "Download both army packs (Knights & Zombies and Orcs & Goblins) and both action sets (I and II). Each player chooses one army; four-player Battle uses two teams and a total of 36 ATTACK and 18 SUPPORT cards.",
        },
      ],
      relatedEyebrow: "Try another kind of maths",
      relatedText:
        "Prefer a shared track to a head-to-head battle? VM Racing Challenge turns plus and minus into overtaking.",
    },
    cs: {
      title: "VM Fantasy Battle",
      shortTitle: "Fantasy Battle",
      category: "Karetní hra · počítání",
      summary:
        "Sestavte armádu z číselných karet, útočte a povolávejte posily. Každý tah se promění ve výpočet, který vidí celý stůl.",
      status: "10 armád · 2 hry · připraveno k tisku",
      coverAlt:
        "Rytíř, nemrtvý, ork a skřet proti sobě v aréně při západu slunce",
      skills: [
        "Sčítání a odčítání do 20",
        "Rozklad stejného čísla různými způsoby",
        "Porovnávání hodnot a jednoduché rozhodování",
      ],
      overviewTitle: "Číselná osa ukrytá ve fantasy bitvě",
      overview: [
        "Každá karta jednotek má hodnotu. Součet karet před hráčem udává velikost jeho armády. ATTACK jednotky ubírá, SUPPORT je přidává a patron může jednou za hru přinést dobře načasovaných +5.",
        "Po každé změně hráč sestaví armádu znovu v jiné kombinaci. Sedm může být 5 + 2, 4 + 3 nebo jedna karta 7. Výpočet je vidět, lze s ním pohybovat a ostatní ho snadno zkontrolují.",
        "Na výběr je deset armád: rytíři, nemrtví, orkové, skřeti, víly, vlci, trpaslíci, elfové, draci a trollové. Ve dvou a třech se hraje každý za sebe, ve čtyřech Bitva ve dvou týmech.",
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
      modesTitle: "Dvě hry s jednou sadou karet",
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
        "10 armád a jejich patroni +5",
        "2 série akčních karet ATTACK a SUPPORT",
        "Bitva se 3 obtížnostmi a rychlá Přebíjená",
        "Návody v češtině a angličtině",
        "Volitelné Battle Logy pro zápis výpočtů",
      ],
      downloadTitle: "Stáhněte si hru zdarma",
      downloadText:
        "Návod, pět balíků armád, akční karty a volitelné Battle Logy si stáhněte samostatně. Pro Bitvu ve dvou vyberte armádu a jednu akční sérii (I nebo II). Pro tři až čtyři hráče zvolte čtyři armády a použijte obě akční série. Na Souboj stačí jen karty jednotek. Popisky karet a logů jsou anglicky; záhlaví tiskových archů a návod jsou česky.",
      primaryDownload: "Rytíři a nemrtví · PDF",
      secondaryDownload: "Stáhnout univerzální pravidla · PDF",
      primaryFile: "/downloads/vm-fantasy-battle-armies-knights-zombies.pdf",
      secondaryFile: "/downloads/vm-fantasy-battle-rules-cs.pdf",
      pdfNote: "A4 · tisk 100 % · 2 balíky armád + 2 akční série",
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
          q: "Které soubory potřebují čtyři hráči?",
          a: "Stáhněte oba balíky armád (rytíře a nemrtvé i orky a skřety) a obě akční série (I a II). Každý hráč si vybere jednu armádu; Bitva ve čtyřech se hraje ve dvou týmech s celkem 36 kartami ATTACK a 18 kartami SUPPORT.",
        },
      ],
      relatedEyebrow: "Zkuste jiný druh počítání",
      relatedText:
        "Dáváte přednost společné trati před soubojem? VM Racing Challenge mění plus a minus v předjíždění.",
    },
  },
  racing: {
    key: "racing",
    image: "/images/racing-challenge-169.webp",
    players: "2–4",
    age: "6–8",
    time: "10–15",
    routeKey: "racing",
    accent: "racing",
    en: {
      title: "VM Racing Challenge",
      shortTitle: "VM Racing Challenge",
      tagline: "Race • Calculate • Overtake",
      category: "Board & card game · number line",
      summary:
        "Draw a racing event, calculate the new position and move your car through the field. Lower numbers mean you are closer to winning.",
      status: "20 cars · ready to print",
      coverAlt:
        "Red, blue, yellow and purple cars overtaking in a chicane, with position changes −1 and +1",
      skills: [
        "Adding and subtracting positions",
        "Orientation on a number line",
        "Attention, prediction and fair comparison",
      ],
      overviewTitle: "Every calculation changes the race",
      overview: [
        "The race ends when the shared action deck is empty. Overtaking moves a car towards a lower number; losing places moves it towards a higher number.",
        "A child says the full calculation before moving: for example, “8 − 2 = 6.” The position cards remain on the table, so the number line is always visible and can be followed with a finger.",
        "The printable set contains 20 different cars, fixed POSITION cards from 1st to 20th, 56 OVERTAKE / OVERTAKEN cards and a double-sided STARTING GRID / START / FINISH card. All cars follow the same rules.",
      ],
      learnTitle: "What children practise",
      learnIntro:
        "A race gives direction to plus and minus. Children can see why subtracting positions is good here: first place is the smallest number.",
      learningPoints: [
        {
          title: "Number-line movement",
          text: "Cars make each operation physical: move left for overtaking, right for losing places.",
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
        "The race continues until every action card has been used. Set out all 10 or 20 cars in unique positions; players control only their chosen cars.",
      steps: [
        {
          title: "Choose the race",
          text: "For a Short Race, use 10 cars, POSITION cards 1–10, and the 44 action cards from ±1 to ±3. For a Grand Prix, use all 20 cars and all 56 action cards.",
        },
        {
          title: "Draw the starting grid",
          text: "Each player chooses a different car. Shuffle all cars, including the chosen ones, and place them randomly behind START. Arrange them using STARTING GRID: one row for 10 cars or two staggered rows for 20.",
        },
        {
          title: "Race until the deck is empty",
          text: "The player whose car starts closest to 1st goes first, then play clockwise. Draw one action card, say the calculation and move your car. Shift each car you pass by one place; only the cars move, while POSITION cards stay fixed.",
        },
        {
          title: "Check the finish",
          text: "The race ends when the shared action deck is empty. The player whose car is in the best position wins. No two cars can occupy the same position.",
        },
      ],
      modesTitle: "Two race sizes",
      modes: [
        {
          title: "Small race · positions 1–10",
          text: "Best for a first game. Use 10 cars and 44 action cards with changes from ±1 to ±3.",
        },
        {
          title: "Grand Prix · positions 1–20",
          text: "Use all 20 cars and the full 56-card deck, with OVERTAKE and OVERTAKEN changes from 1 to 5 places.",
        },
        {
          title: "Track edges",
          text: "A car never moves beyond 1 or the last position. Count only the places still available and stop at the edge.",
        },
        {
          title: "Changes to other cars",
          text: "When you pass cars, shift each by one place. Their owners’ cars have changed position too, and those players still take their turns.",
        },
      ],
      contentsTitle: "Printable set",
      contents: [
        "20 different car cards",
        "20 fixed POSITION cards (1st–20th)",
        "56 OVERTAKE / OVERTAKEN cards",
        "Double-sided STARTING GRID / START / FINISH card",
        "Separate rules in English and Czech",
        "Optional Race Logs in English and Czech",
      ],
      downloadTitle: "Download the free game",
      downloadText:
        "Download the rules, cards and optional Race Log separately. The English page links the English manual, cards and log; the Czech page has the Czech versions.",
      primaryDownload: "Download cards · PDF",
      primaryFile: "/downloads/vm-racing-challenge-cards-en-v8.pdf",
      pdfNote: "A4 · print at 100% · booklet, cards and optional Race Log",
      faqTitle: "Common questions",
      faqs: [
        {
          q: "Why does overtaking subtract a number?",
          a: "Race positions run from 1st to last. Moving from 8th to 6th means overtaking two cars, so the calculation is 8 − 2 = 6.",
        },
        {
          q: "Can two cars stand on the same position?",
          a: "No. Each fixed POSITION card marks one place. Move your car to the new position and shift every car you pass by one place.",
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
      title: "VM Racing Challenge",
      shortTitle: "VM Racing Challenge",
      tagline: "Race • Calculate • Overtake",
      category: "Desková a karetní hra · číselná osa",
      summary:
        "Otočte závodní událost, spočítejte novou pozici a projeďte autem startovním polem. Čím nižší číslo, tím blíž jste vítězství.",
      status: "20 aut · připraveno k tisku",
      coverAlt:
        "Červené, modré, žluté a fialové auto předjíždějí v šikaně se změnami pořadí −1 a +1",
      skills: [
        "Sčítání a odčítání pozic",
        "Orientace na číselné ose",
        "Pozornost, odhad a férové porovnávání",
      ],
      overviewTitle: "Každý výpočet změní závod",
      overview: [
        "Závod končí, až když se doberou všechny závodní karty. Předjíždění posouvá auto k nižšímu číslu, ztráta míst k vyššímu.",
        "Dítě před pohybem řekne celý příklad, například „8 − 2 = 6“. Karty pořadí zůstávají na stole, takže je číselná osa stále vidět a lze po ní ukazovat prstem.",
        "Sada obsahuje 20 různých aut, pevné kartičky POSITION od 1. do 20. místa, 56 karet OVERTAKE / OVERTAKEN a oboustrannou kartu STARTING GRID / START / FINISH. Všechna auta mají stejná pravidla.",
      ],
      learnTitle: "Co si děti procvičí",
      learnIntro:
        "Závod dává plus a minus jasný směr. Děti vidí, proč je tady odčítání pozic výhodné: první místo má nejnižší číslo.",
      learningPoints: [
        {
          title: "Pohyb po číselné ose",
          text: "Auta převádějí operaci do pohybu: při předjíždění doleva, při ztrátě míst doprava.",
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
        "Závod pokračuje, dokud se nepoužijí všechny závodní karty. Vyložte všech 10 nebo 20 aut; hráči ovládají pouze svá vybraná auta.",
      steps: [
        {
          title: "Vyberte závod",
          text: "Pro Malý závod použijte 10 aut, kartičky POSITION 1–10 a 44 závodních karet se změnami ±1 až ±3. Pro Velkou cenu použijte všech 20 aut a všech 56 karet.",
        },
        {
          title: "Vylosujte start",
          text: "Každý si vybere jiné auto. Všechna auta včetně vybraných zamíchejte a náhodně rozložte za START. STARTING GRID ukazuje rozložení: 10 aut v jedné řadě, 20 ve dvou střídavých řadách.",
        },
        {
          title: "Závod až do dobrání balíčku",
          text: "Začíná hráč, jehož auto je nejblíže 1. místu; dále se hraje po směru hodin. Otočte závodní kartu, řekněte výpočet a přesuňte své auto. Auta, která předjedete, posuňte o jedno místo; kartičky POSITION zůstávají na místě.",
        },
        {
          title: "Zkontrolujte cíl",
          text: "Závod končí, když se doberou všechny závodní karty. Vyhrává hráč, jehož auto je na nejlepším místě. Na každé pozici může stát jen jedno auto.",
        },
      ],
      modesTitle: "Dvě délky tratě",
      modes: [
        {
          title: "Malý závod · pozice 1–10",
          text: "Nejlepší pro první partii. Použijte 10 aut a 44 závodních karet se změnami od ±1 do ±3.",
        },
        {
          title: "Velká cena · pozice 1–20",
          text: "Použijte všech 20 aut a celý balíček 56 karet OVERTAKE a OVERTAKEN se změnami o 1 až 5 míst.",
        },
        {
          title: "Okraje trati",
          text: "Auto se nikdy neposune před 1. místo ani za poslední pozici. Odpočítejte jen zbývající místa a na okraji zastavte.",
        },
        {
          title: "Změny pořadí ostatních",
          text: "Když předjedete ostatní auta, každé se posune o jedno místo. Změní se tak i pozice aut ovládaných soupeři, kteří přesto ve svém tahu pokračují.",
        },
      ],
      contentsTitle: "Obsah sady",
      contents: [
        "20 různých karet aut",
        "20 pevných kartiček POSITION (1.–20. místo)",
        "56 karet OVERTAKE / OVERTAKEN",
        "Oboustranná karta STARTING GRID / START / FINISH",
        "Samostatné návody v češtině a angličtině",
        "Volitelné Race Logy v češtině a angličtině",
      ],
      downloadTitle: "Stáhněte si hru zdarma",
      downloadText:
        "Návod, karty i volitelný Race Log si stáhněte samostatně. Česká stránka nabízí české verze dokumentů; na anglické najdete anglické.",
      primaryDownload: "Stáhnout karty · PDF",
      primaryFile: "/downloads/vm-racing-challenge-cards-cs-v3.pdf",
      pdfNote: "A4 · tisk 100 % · skládaný návod, karty a volitelný Race Log",
      faqTitle: "Časté otázky",
      faqs: [
        {
          q: "Proč se při předjíždění odčítá?",
          a: "Pořadí vede od prvního místa k poslednímu. Přesun z osmého na šesté místo znamená předjet dvě auta, tedy 8 − 2 = 6.",
        },
        {
          q: "Mohou dvě auta stát na stejné pozici?",
          a: "Ne. Každá pevná kartička POSITION označuje jedno místo. Přesuňte své auto na novou pozici a auta, která předjedete, posuňte o jedno místo.",
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
    eyebrow: "About VinMat Education Games",
    title: "Small games with a clear learning purpose.",
    lead:
      "VinMat Education Games is a free library of printable games for families, educators and children who learn best when numbers have a story and a reason.",
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
          "This site is written for the adults who choose and prepare the games, while the games themselves are made for children. No account is needed and the current version does not use advertising or analytics trackers. Technical hosting records and email enquiries are explained in the privacy notice.",
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
    eyebrow: "O VinMat Education Games",
    title: "Malé hry s jasným vzdělávacím cílem.",
    lead:
      "VinMat Education Games je bezplatná knihovna her k vytištění pro rodiny, pedagogy a děti, kterým se lépe učí, když mají čísla příběh a smysl.",
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
          "Web je napsaný pro dospělé, kteří hry vybírají a připravují, zatímco samotné hry jsou určeny dětem. Není potřeba účet a současná verze nepoužívá reklamní ani analytické sledování. Technické záznamy hostingu a e-mailové dotazy vysvětlují informace o soukromí.",
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
  "privacy": {
    "en": {
      "eyebrow": "VinMat Education Games",
      "title": "Privacy and cookies",
      "updated": "Last updated: 30 September 2026",
      "sections": [
        {
          "title": "Scope and contact",
          "text": "These notices apply to VinMat Education Games at vinmat.eu/edugames/, including its Czech and English pages and downloadable files. Other VinMat projects have their own notices. Contact VinMat about privacy at vinmat.sn@gmail.com.",
          "links": []
        },
        {
          "title": "Browsing and downloads",
          "text": "You can read the site and download games without an account or submitting a name or email address. There are no comments, newsletter sign-ups or payment forms. Downloads are served directly from this website.",
          "links": []
        },
        {
          "title": "Hosting and technical records",
          "text": "The site is hosted on GitHub Pages. GitHub records visitors’ IP addresses for security, including visitors without a GitHub account. Hosting infrastructure also processes the information needed to deliver requested pages and files. GitHub explains its processing, retention and safeguards in its privacy statement. VinMat does not use these records to profile children.",
          "links": [
            {
              "label": "GitHub privacy statement",
              "href": "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            }
          ]
        },
        {
          "title": "When you email us",
          "text": "Your email address, name if supplied, message and attachments are processed to answer your enquiry and follow up on reported issues. Providing them is voluntary; without a reply address we cannot respond. This processing relies on the legitimate interest in handling enquiries and protecting the project (Article 6(1)(f) GDPR). Email is handled through Gmail. Please do not send children’s personal details, photographs or sensitive information that is not needed to resolve your enquiry.",
          "links": [
            {
              "label": "Google privacy policy",
              "href": "https://policies.google.com/privacy"
            }
          ]
        },
        {
          "title": "Retention and service providers",
          "text": "Correspondence is kept for the time needed to resolve the enquiry and any related follow-up. If it is needed to establish, exercise or defend a legal claim, the relevant correspondence may be retained until that purpose ends. Hosting and email providers apply their own retention rules to their technical records. GitHub and Google may process data outside the EEA; their privacy notices describe the applicable transfer safeguards, including adequacy arrangements or standard contractual clauses. Data is not sold by VinMat.",
          "links": []
        },
        {
          "title": "Cookies and analytics — current status",
          "text": "This section of the website currently does not run AdSense, analytics or advertising trackers, and does not set advertising or analytics cookies. Reading pages and downloading files does not require consent to marketing. Your browser may cache website files as part of normal operation.",
          "links": []
        },
        {
          "title": "Advertising — planned, not active",
          "text": "Google AdSense may be introduced later. Advertising can involve Google and its partners processing IP addresses, cookies, device identifiers and information about displayed ads and interactions. Before activation, this notice will be updated to describe the actual services and purposes. Where consent is required, a consent-management interface will offer choices and a way to change or withdraw them. No advertising consent is being requested through this notice.",
          "links": [
            {
              "label": "How Google uses information from partner sites",
              "href": "https://policies.google.com/technologies/partner-sites"
            }
          ]
        },
        {
          "title": "Children and offline play",
          "text": "The website helps parents, teachers and other adults choose and prepare games for children. The printed games are played offline and do not send data to this website. Children do not need an account or to contact us. If a message unnecessarily includes a child’s personal data, contact us to request its removal. Any future advertising will require an assessment of the audience and appropriate child-directed treatment where applicable.",
          "links": []
        },
        {
          "title": "Your rights",
          "text": "Where GDPR applies, you may request access, correction, erasure or restriction of your personal data, and object to processing based on legitimate interests. Portability applies where its legal conditions are met. If processing is based on consent, you may withdraw it without affecting earlier lawful processing. Contact vinmat.sn@gmail.com; we may need proportionate information to verify your request. Requests are normally answered within one month; any lawful extension will be explained. You may complain to the Czech Office for Personal Data Protection or your local supervisory authority. VinMat does not make decisions with legal or similarly significant effects through automated processing.",
          "links": [
            {
              "label": "Czech Office for Personal Data Protection",
              "href": "https://uoou.gov.cz/"
            }
          ]
        },
        {
          "title": "External links and changes",
          "text": "Following an external link takes you to a service governed by its own privacy information. A link to a provider’s policy does not itself enable that provider’s advertising or analytics on this site. This notice will be updated when the way the website processes data changes; the revision date appears above.",
          "links": []
        }
      ]
    },
    "cs": {
      "eyebrow": "VinMat Education Games",
      "title": "Soukromí a cookies",
      "updated": "Poslední aktualizace: 30. září 2026",
      "sections": [
        {
          "title": "Rozsah a kontakt",
          "text": "Tyto informace platí pro VinMat Education Games na vinmat.eu/edugames/, včetně českých a anglických stránek a souborů ke stažení. Ostatní projekty VinMat mají vlastní informace. Ve věcech soukromí kontaktujte VinMat na vinmat.sn@gmail.com.",
          "links": []
        },
        {
          "title": "Prohlížení a stahování",
          "text": "Web můžete číst a hry stahovat bez účtu, zadání jména nebo e-mailu. Web neobsahuje komentáře, přihlášení k newsletteru ani platební formuláře. Soubory se stahují přímo z tohoto webu.",
          "links": []
        },
        {
          "title": "Hosting a technické záznamy",
          "text": "Web je provozován na GitHub Pages. GitHub zaznamenává IP adresy návštěvníků pro účely zabezpečení, a to i bez přihlášení k účtu GitHub. Hostingová infrastruktura dále zpracovává údaje potřebné k doručení požadovaných stránek a souborů. Zpracování, uchování a ochranu údajů GitHub popisuje ve svých zásadách. VinMat tyto záznamy nepoužívá k profilování dětí.",
          "links": [
            {
              "label": "Zásady ochrany soukromí GitHub",
              "href": "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            }
          ]
        },
        {
          "title": "Když nám napíšete e-mail",
          "text": "Vaši e-mailovou adresu, případně uvedené jméno, zprávu a přílohy zpracováváme k vyřízení dotazu a navazujícímu řešení oznámených problémů. Poskytnutí je dobrovolné; bez zpáteční adresy nemůžeme odpovědět. Základem je oprávněný zájem na vyřizování dotazů a ochraně projektu podle čl. 6 odst. 1 písm. f) GDPR. E-mailovou komunikaci zajišťuje Gmail. Neposílejte osobní údaje dětí, fotografie ani citlivé informace, které nejsou pro vyřízení dotazu potřebné.",
          "links": [
            {
              "label": "Zásady ochrany soukromí Google",
              "href": "https://policies.google.com/privacy"
            }
          ]
        },
        {
          "title": "Uchování údajů a poskytovatelé služeb",
          "text": "Korespondenci uchováváme po dobu potřebnou k vyřízení dotazu a související navazující komunikaci. Je-li potřebná k určení, výkonu nebo obhajobě právního nároku, může být příslušná komunikace uchována do skončení tohoto účelu. Poskytovatelé hostingu a e-mailu uplatňují na své technické záznamy vlastní pravidla uchování. GitHub a Google mohou zpracovávat údaje mimo EHP; použité záruky předávání, například rozhodnutí o odpovídající ochraně nebo standardní smluvní doložky, popisují ve svých zásadách. VinMat osobní údaje neprodává.",
          "links": []
        },
        {
          "title": "Cookies a analytika — současný stav",
          "text": "Tato část webu nyní nepoužívá AdSense, analytiku ani reklamní sledovací nástroje a nenastavuje reklamní ani analytické cookies. Čtení stránek a stahování nevyžaduje souhlas s marketingem. Prohlížeč může v rámci běžného provozu ukládat soubory webu do mezipaměti.",
          "links": []
        },
        {
          "title": "Reklama — plánovaná, zatím neaktivní",
          "text": "Do budoucna může být zapojen Google AdSense. Reklama může zahrnovat zpracování IP adres, cookies, identifikátorů zařízení a údajů o zobrazených reklamách a interakcích společností Google a jejími partnery. Před spuštěním tyto informace upravíme podle skutečných služeb a účelů. Tam, kde je vyžadován souhlas, nabídne rozhraní pro správu souhlasů volby a možnost je změnit nebo odvolat. Tímto textem se souhlas s reklamou nevyžaduje.",
          "links": [
            {
              "label": "Jak Google používá informace z partnerských webů",
              "href": "https://policies.google.com/technologies/partner-sites"
            }
          ]
        },
        {
          "title": "Děti a hraní mimo web",
          "text": "Web pomáhá rodičům, učitelům a dalším dospělým vybrat a připravit hry pro děti. Vytištěné hry se hrají mimo web a neposílají mu žádná data. Děti nepotřebují účet ani nás nemusí kontaktovat. Pokud zpráva zbytečně obsahuje osobní údaje dítěte, napište nám kvůli jejich odstranění. Případná budoucí reklama vyžaduje posouzení publika a odpovídající nastavení pro dětský obsah tam, kde je to nutné.",
          "links": []
        },
        {
          "title": "Vaše práva",
          "text": "V rozsahu GDPR můžete žádat o přístup, opravu, výmaz nebo omezení zpracování osobních údajů a vznést námitku proti zpracování na základě oprávněného zájmu. Právo na přenositelnost se uplatní při splnění zákonných podmínek. Je-li zpracování založeno na souhlasu, můžete jej odvolat bez vlivu na předchozí zákonné zpracování. Pište na vinmat.sn@gmail.com; k ověření žádosti můžeme potřebovat přiměřené informace. Žádosti obvykle vyřizujeme do jednoho měsíce; případné zákonné prodloužení vysvětlíme. Můžete podat stížnost Úřadu pro ochranu osobních údajů nebo příslušnému dozorovému úřadu ve své zemi. VinMat neprovádí automatizované rozhodování s právními nebo obdobně významnými účinky.",
          "links": [
            {
              "label": "Úřad pro ochranu osobních údajů",
              "href": "https://uoou.gov.cz/"
            }
          ]
        },
        {
          "title": "Externí odkazy a změny",
          "text": "Po přechodu na externí odkaz se uplatní informace o soukromí dané služby. Odkaz na zásady poskytovatele sám o sobě nezapíná jeho reklamu ani analytiku na tomto webu. Při změně způsobu zpracování údajů tyto informace aktualizujeme; datum revize je uvedeno výše.",
          "links": []
        }
      ]
    }
  },
  "terms": {
    "en": {
      "eyebrow": "VinMat Education Games",
      "title": "Terms of use",
      "updated": "Last updated: 30 September 2026",
      "sections": [
        {
          "title": "Project and scope",
          "text": "These terms cover VinMat Education Games at vinmat.eu/edugames/ and its printable game files. The project offers free educational materials for adults to prepare and use with children. Contact VinMat at vinmat.sn@gmail.com about use, errors or permissions. Other VinMat projects have their own terms.",
          "links": []
        },
        {
          "title": "Permitted use",
          "text": "You may download and print the files for personal, family, classroom and other non-commercial educational use. You may print copies for the group you directly teach or supervise. Downloading requires neither registration nor payment. You supply your own printing materials.",
          "links": []
        },
        {
          "title": "Sharing and other uses",
          "text": "Share the game page link so others can obtain the current files. Do not sell the files, re-upload them to another website, remove VinMat branding or present modified files as official editions. For redistribution, commercial use or permission beyond the uses above, contact VinMat in advance. These terms do not limit uses permitted by applicable law.",
          "links": []
        },
        {
          "title": "Attribution and third-party rights",
          "text": "The VinMat name and branding identify this project; downloading files does not transfer ownership of the materials. Where third-party names or materials appear, their respective rights remain unaffected. If you believe content infringes your rights, email the page or file URL and a description of the issue so it can be reviewed.",
          "links": []
        },
        {
          "title": "Versions and feedback",
          "text": "Rules and files may be corrected or updated. A file marked prototype or playtest edition is intended for testing. Check the game page before printing again. Suggestions do not transfer ownership of your own submitted material to VinMat; do not send content you are not entitled to share.",
          "links": []
        },
        {
          "title": "Preparation and educational use",
          "text": "An adult should prepare the components, supervise scissors and other cutting tools, and assess small pieces and the game’s difficulty for the children involved. Ages and playing times are approximate. The games are educational aids, not a guarantee of a particular learning outcome or a substitute for individual professional support.",
          "links": []
        },
        {
          "title": "Availability and responsibility",
          "text": "Files are provided in their current form. Compatibility with every printer or device, uninterrupted availability and error-free content cannot be guaranteed. Check a sample page before printing a full set and report problems by email. Nothing in these terms excludes or limits liability or rights that cannot lawfully be excluded or limited.",
          "links": []
        },
        {
          "title": "External services and updates",
          "text": "External links are governed by the relevant service’s terms. Any future advertising will be identified as advertising and does not imply endorsement of the advertised product by VinMat. Updated terms apply from the revision date shown above; they do not retroactively remove permissions already granted for previously downloaded versions.",
          "links": []
        }
      ]
    },
    "cs": {
      "eyebrow": "VinMat Education Games",
      "title": "Podmínky použití",
      "updated": "Poslední aktualizace: 30. září 2026",
      "sections": [
        {
          "title": "Projekt a rozsah",
          "text": "Tyto podmínky se vztahují na VinMat Education Games na vinmat.eu/edugames/ a jeho soubory her k tisku. Projekt nabízí bezplatné vzdělávací materiály, které dospělí připravují a používají s dětmi. S dotazy k použití, chybám nebo svolení kontaktujte VinMat na vinmat.sn@gmail.com. Ostatní projekty VinMat mají vlastní podmínky.",
          "links": []
        },
        {
          "title": "Povolené použití",
          "text": "Soubory můžete stahovat a tisknout pro osobní, rodinné, školní a jiné nekomerční vzdělávací použití. Lze vytisknout kopie pro skupinu, kterou přímo učíte nebo vedete. Stažení nevyžaduje registraci ani platbu. Materiál k tisku si zajišťujete sami.",
          "links": []
        },
        {
          "title": "Sdílení a další využití",
          "text": "Sdílejte odkaz na stránku hry, aby ostatní získali aktuální soubory. Soubory neprodávejte, nenahrávejte na jiný web, neodstraňujte označení VinMat a nevydávejte upravené soubory za oficiální edice. Pro další šíření, komerční využití nebo svolení nad rámec výše uvedeného kontaktujte VinMat předem. Podmínky neomezují použití dovolené platnými právními předpisy.",
          "links": []
        },
        {
          "title": "Označení a práva třetích stran",
          "text": "Název a označení VinMat identifikují tento projekt; stažením se nepřevádí vlastnictví materiálů. Případná práva k názvům či materiálům třetích stran zůstávají nedotčena. Pokud se domníváte, že obsah zasahuje do vašich práv, pošlete e-mailem odkaz na stránku nebo soubor a popis problému k prověření.",
          "links": []
        },
        {
          "title": "Verze a zpětná vazba",
          "text": "Pravidla a soubory mohou být opravovány a aktualizovány. Soubor označený jako prototyp nebo testovací verze slouží ke zkoušení. Před dalším tiskem zkontrolujte stránku hry. Odesláním námětu nepřevádíte na VinMat vlastnictví svého zaslaného materiálu; neposílejte obsah, který nejste oprávněni sdílet.",
          "links": []
        },
        {
          "title": "Příprava a vzdělávací použití",
          "text": "Komponenty má připravovat dospělý, který dohlédne na nůžky a další řezací nástroje a posoudí vhodnost malých dílků i obtížnosti pro konkrétní děti. Věk a délka hry jsou orientační. Hry jsou vzdělávací pomůcky, nikoli záruka konkrétního výsledku učení nebo náhrada individuální odborné podpory.",
          "links": []
        },
        {
          "title": "Dostupnost a odpovědnost",
          "text": "Soubory jsou poskytovány v aktuální podobě. Nelze zaručit kompatibilitu s každou tiskárnou či zařízením, nepřetržitou dostupnost ani bezchybnost obsahu. Před tiskem celé sady zkontrolujte zkušební stránku a případné problémy oznamte e-mailem. Těmito podmínkami se nevylučuje ani neomezuje odpovědnost nebo práva, které podle zákona vyloučit či omezit nelze.",
          "links": []
        },
        {
          "title": "Externí služby a aktualizace",
          "text": "Externí odkazy se řídí podmínkami příslušné služby. Případná budoucí reklama bude označena jako reklama a neznamená doporučení inzerovaného produktu ze strany VinMat. Aktualizované podmínky platí od data revize uvedeného výše; zpětně neruší již udělená oprávnění k dříve staženým verzím.",
          "links": []
        }
      ]
    }
  }
} as const;
