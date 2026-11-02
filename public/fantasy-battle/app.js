import {createGame,shuffleDeck,begin,expectedPlayer,reveal,comparison,resolve,next,totals,valid} from './engine.mjs?v=4';
import {patronName,normalizeNames,changeArmy} from './patron-names.mjs?v=5';
import {ArmyAudio} from './audio.mjs?v=4';
const locale=document.documentElement.lang==='cs'?'cs':'en';
const T=(en,cs)=>locale==='cs'?cs:en;
const asset=n=>new URL(`./assets/${n}`,import.meta.url).href;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const armies=[
 {id:'knights',name:T('Knights','Rytíři'),image:'army-knights-thumb.webp'},
 {id:'undead',name:T('Zombies','Zombíci'),image:'army-undead-thumb.webp'},
 {id:'orcs',name:T('Orcs','Orkové'),image:'army-orcs-thumb.webp'},
 {id:'goblins',name:T('Goblins','Skřeti'),image:'army-goblins-thumb.webp'},
 {id:'fairies',name:T('Fairies','Víly'),image:'army-fairies-v2-thumb.webp'},
 {id:'dwarves',name:T('Dwarves','Trpaslíci'),image:'army-dwarves-v2-thumb.webp'},
 {id:'skeletons',name:T('Skeletons','Kostlivci'),image:'army-skeletons-v1-thumb.webp'},
 {id:'elves',name:T('Elves','Elfové'),image:'army-elves-v2-thumb.webp'},
 {id:'dragons',name:T('Dragons','Draci'),image:'army-dragons-v2-thumb.webp'}
];
const army=id=>armies.find(a=>a.id===id);
const app=document.querySelector('#app'),dialog=document.querySelector('#dialog');
const storageKey='vm-fantasy-prebijena-v1',draftKey='vm-fantasy-config-v2';
const sound=new ArmyAudio();
let arenaPreference=null;
let config={mode:'solo',armies:['knights','orcs'],names:[T('Commander','Velitel'),T('Player 2','Hráč 2')],practice:true,firstPlayer:0};
let state=null,view='setup',saved=null,feedback='',gmTimer=null,roundTimer=null,missTimer=null;
let shuffleBusy=[false,false],shuffleTimers=[null,null],faceSerial=0;
let resumeOnLanguageChange=false;
try {
 const draft=JSON.parse(localStorage.getItem(draftKey));
 if(draft&&['solo','duo'].includes(draft.mode)&&draft.armies?.length===2&&draft.armies.every(id=>army(id))&&draft.armies[0]!==draft.armies[1]&&draft.names?.length===2&&draft.names.every(n=>typeof n==='string'&&n.length<=24))config={...config,...draft};
 const x=JSON.parse(localStorage.getItem(storageKey));
 if(valid(x)&&x.config.armies?.length===2&&x.config.armies.every(id=>army(id))&&x.config.names?.length===2&&x.config.names.every(n=>typeof n==='string'&&n.length<80)){if(x.config.mode==='solo')x.config.practice=true;saved=x;}
 sound.enabled=localStorage.getItem('vm-fantasy-sound-v2')==='on';
 resumeOnLanguageChange=sessionStorage.getItem('vm-fantasy-switch-language')==='yes';sessionStorage.removeItem('vm-fantasy-switch-language');
} catch {}
normalizeNames(config,locale);if(saved)normalizeNames(saved.config,locale);
if(config.mode==='solo')config.practice=true;
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));saved=structuredClone(state);}catch{}}
function saveDraft(){try{localStorage.setItem(draftKey,JSON.stringify(config));}catch{}}
function clearSave(){saved=null;try{localStorage.removeItem(storageKey);}catch{}}
function playerName(i,c=config){return c.names[i];}
const name=i=>playerName(i,state.config);
const value=n=>n===11?'♛':n;
const cardCount=n=>T(`${n} ${n===1?'card':'cards'}`,`${n} ${n===1?'karta':n>=2&&n<=4?'karty':'karet'}`);
const firstPlayer=()=>state.config.mode==='solo'?0:state.config.firstPlayer===1?1:0;
function announce(text){document.querySelector('#announcer').textContent=text;}
function play(event,i=0){sound.play(event,(view==='setup'?config:state?.config||config).armies[i]);}
function setText(id,text){document.getElementById(id).textContent=text;}
function setScreen(screen,html){app.dataset.screen=screen;app.innerHTML=html;}
function modal(html){document.querySelector('#dialog-content').innerHTML=html;dialog.showModal();}
function rules(){modal(`<p class="eyebrow">${T('HIGH CARD BATTLE · RULES','PRAVIDLA PŘEBÍJENÉ')}</p><h2 id="dialog-title">${T('The higher card wins.','Vyšší karta bere vše.')}</h2><ol>
 <li><strong>${T('Pick your armies and shuffle.','Vyberte armády a zamíchejte.')}</strong> ${T('Each player gets the same 18 number cards and one patron. Tap your deck to shuffle as many times as you like. Each human player shuffles at least once; the Gamemaster shuffles automatically.','Každý dostane stejných 18 číselných karet a jednoho patrona. Klepni na svůj balíček a zamíchej, kolikrát chceš. Každý hráč zamíchá alespoň jednou; Gamemaster míchá automaticky.')}</li>
 <li><strong>${T('Tap your own deck to play.','Vylož kliknutím na svůj balíček.')}</strong> ${T('The higher number wins. A patron ♛ beats every number. Two patrons are a tie. The Gamemaster always plays second. In 1v1, the chosen order applies in every round and tiebreak.','Vyšší číslo vyhrává. Patron ♛ poráží každé číslo. Dva patroni znamenají shodu. Gamemaster vždy vykládá druhý. Ve hře 1v1 platí zvolené pořadí v každém kole i rozstřelu.')}</li>
 <li><strong>${T('Say who won.','Urči výsledek.')}</strong> ${T('Tap the winning card, or Tie in the middle. A wrong answer lets you try again without losing points. A correct answer prepares the next round automatically; you still tap your deck to play the next card.','Klepni na vítěznou kartu, nebo na Remízu uprostřed. Při chybě můžeš odpověď opravit; body se nestrhávají. Správná odpověď automaticky připraví další kolo; další kartu opět vyložíš kliknutím na svůj balíček.')}</li>
 <li><strong>${T('A tie starts a tiebreak.','Při shodě následuje rozstřel.')}</strong> ${T('Play another card each. The winner takes every card on the table. Captured cards stay in a separate pile and never go back into the deck.','Oba vyloží další kartu. Vítěz získá všechny karty na stole. Získané karty se odkládají stranou a do balíčku se nevracejí.')}</li>
 <li><strong>${T('Most cards wins the game.','Vyhrává nejvíc karet.')}</strong> ${T('Count captured cards plus any left in your deck. If both decks run out during a tied tiebreak, the unresolved table cards do not count. Equal totals are a draw.','Počítají se získané karty i ty zbývající v balíčku. Pokud v nerozhodnutém rozstřelu dojdou karty oběma, karty ze stolu se nepočítají. Při stejném skóre je remíza.')}</li>
 </ol><p>${T('In 1v1 you can turn off manual comparison in setup. Patrons are the highest cards in this variant, not +5 reinforcements. No action cards or time limits.','Ve hře 1v1 lze určování výsledku při přípravě vypnout. Patron v této variantě znamená nejvyšší kartu, nikoli posilu +5. Akční karty se nepoužívají. Žádný časový limit.')}</p>`);}
function armySelection(i){
 const selected=army(config.armies[i]);
 return `<section class="army-selection" aria-label="${T('Army','Armáda')}: ${esc(playerName(i))}">
 <div class="army-selection-title">${i===1&&config.mode==='solo'?T('Gamemaster’s army','Armáda Gamemastera'):config.mode==='solo'?T('Your army','Tvoje armáda'):i===0?T('Player 1’s army','Armáda hráče 1'):T('Player 2’s army','Armáda hráče 2')}</div>
 <button class="army-preview" data-action="pick-army" data-player="${i}" aria-label="${T('Choose army','Vybrat armádu')}: ${esc(playerName(i))}"><img src="${asset(selected.image)}" alt="${selected.name}"><span>${T('Choose army','Vybrat armádu')} <b>↗</b></span></button>
 <label class="sr-only" for="army${i}">${T('Army selection','Výběr armády')}: ${esc(playerName(i))}</label>
 <select class="army-select" id="army${i}" data-army-select="${i}">${armies.map(a=>`<option value="${a.id}" ${a.id===selected.id?'selected':''} ${a.id===config.armies[1-i]?'disabled':''}>${a.name}${a.id===config.armies[1-i]?T(' (opponent)',' (soupeř)'):''}</option>`).join('')}</select></section>`;
}
function setup(){
 setScreen('setup',`${saved&&saved.phase!=='done'?`<div class="resume"><span>✦ ${T('You have a saved game.','Máš rozehranou partii.')}</span><button class="secondary" data-action="resume">${T('Continue','Pokračovat')} →</button></div>`:''}
 <div class="setup-layout"><section><p class="eyebrow">${T('CARD DUEL · 1–2 PLAYERS','KARETNÍ SOUBOJ · 1–2 HRÁČI')}</p><h1>${T('Small cards.','Malé karty.')}<br><em>${T('Epic battles.','Velká bitva.')}</em></h1><p class="intro">${T('Choose your army, shuffle for luck and challenge fate. Face the Gamemaster or a friend in High Card Battle from the world of VM Fantasy Battle.','Vyber si armádu, zamíchej si pro štěstí a vyzvi osud. Poraz Gamemastera, nebo se utkej s kamarádem v přebíjené ze světa VM Fantasy Battle.')}</p>
 <div class="badge-row"><span class="pill">${T('9 fantasy armies','9 fantasy armád')}</span><span class="pill">${T('Original game cards','Původní herní karty')}</span><span class="pill">${T('No time limit','Bez časového limitu')}</span></div>
 <figure class="intro-art"><img src="${asset('fantasy-battle-169.webp')}" alt="${T('A knight, zombie, orc and goblin ready for battle','Rytíř, zombík, ork a skřet připravení na fantasy bitvu')}"><figcaption><small>VM FANTASY BATTLE</small>${T('Every army has a chance to win.','Každá armáda má šanci zvítězit.')}</figcaption></figure>
 <div class="facts"><span>♜ <b>${T('19 cards','19 karet')}</b> ${T('each','na hráče')}</span><span>✦ <b>${T('Ages 4–10','4–10 let')}</b></span><span>◷ <b>${T('3–5 minutes','3–5 minut')}</b></span></div>
 <div class="note-box"><span>♛</span><p>${T('Higher numbers win. <b>A patron beats every number.</b><br>Matching cards start a tiebreak.','Vyšší číslo vítězí. <b>Patron porazí každé číslo.</b><br>Při shodě se rozhodne v rozstřelu.')}</p></div></section>
 <section class="setup-panel" aria-label="${T('New game setup','Nastavení nové hry')}"><div class="section-label"><span class="step">1</span> ${T('How would you like to play?','Jak chceš hrát?')}</div>
 <div class="mode-tabs"><button class="mode ${config.mode==='solo'?'active':''}" data-action="mode" data-mode="solo" aria-pressed="${config.mode==='solo'}"><span>♟</span><div><strong>${T('Against the Gamemaster','Proti Gamemasterovi')}</strong><small>${T('One player · automatic opponent','Jeden hráč · soupeř hraje sám')}</small></div></button><button class="mode ${config.mode==='duo'?'active':''}" data-action="mode" data-mode="duo" aria-pressed="${config.mode==='duo'}"><span>⚔</span><div><strong>${T('1v1 duel','Souboj 1v1')}</strong><small>${T('Two players · one device','Dva hráči · jedno zařízení')}</small></div></button></div>
 <div class="names">${[0,1].map(i=>`<label>${i===1&&config.mode==='solo'?T('Gamemaster’s name','Jméno Gamemastera'):i===0?T('Your name / patron','Tvoje jméno / patron'):T('Opponent’s name / patron','Jméno soupeře / patron')}<input class="name-input" id="name${i}" maxlength="24" value="${esc(config.names[i])}" placeholder="${esc(patronName(config.armies[i],locale))}" autocomplete="off"></label>`).join('')}</div>
 <div class="section-label"><span class="step">2</span> ${T('An army for each side','Vyber armádu každému')}</div><div class="army-selections">${armySelection(0)}${armySelection(1)}</div>
 ${config.mode==='duo'?`<label class="first-player-label" for="first-player">${T('Who plays first in every round?','Kdo v každém kole vyloží první?')}</label><select class="army-select first-player-select" id="first-player"><option value="0" ${config.firstPlayer!==1?'selected':''}>${T('Player 1','Hráč 1')} · ${esc(config.names[0])}</option><option value="1" ${config.firstPlayer===1?'selected':''}>${T('Player 2','Hráč 2')} · ${esc(config.names[1])}</option></select><div class="setup-bottom"><label class="check-label"><input id="practice" type="checkbox" ${config.practice?'checked':''}> ${T('Players choose the result','Hráči určují výsledek porovnání')}</label></div>`:`<div class="setup-bottom"><p class="welcome-note"><b>${T('You play first. The Gamemaster follows.','Ty vykládáš první, Gamemaster hned po tobě.')}</b><br>${T('Then tap the winning card, or Tie in the middle.','Pak klepneš na vítěznou kartu, nebo na Remízu uprostřed.')}</p></div>`}
 <button class="primary wide" data-action="start"><span>${T('Continue to shuffling','Pokračovat k míchání')}</span><span>→</span></button><p class="hint">${T('Before the battle, shuffle your own deck as many times as you like.','Před hrou si každý hráč zamíchá svůj balíček, kolikrát chce.')}</p></section></div>`);
}
function pickArmy(i){modal(`<p class="eyebrow">${T('CHOOSE AN ARMY','VÝBĚR ARMÁDY')}</p><h2 id="dialog-title">${esc(playerName(i))}</h2><div class="army-grid army-dialog">${armies.map(a=>{
 const selected=config.armies[i]===a.id,other=config.armies[1-i]===a.id;
 return `<button class="army ${selected?'selected':''} ${other?'other':''}" data-pick-army="${a.id}" data-player="${i}" aria-label="${a.name}${other?T(', selected by opponent',', vybral soupeř'):''}" aria-pressed="${selected}" ${other?'disabled':''}><img src="${asset(a.image)}" alt=""><strong>${a.name}</strong>${selected?'<span class="badge">✓</span>':''}</button>`;
 }).join('')}</div><p class="hint">${T('All armies have the same card values.','Obě armády mají stejné hodnoty karet.')}</p>`);}
function shufflePanel(i){
 const auto=i===1&&state.config.mode==='solo',count=state.shuffles[i],busy=shuffleBusy[i];
 return `<section class="shuffle-player"><div class="player-title"><span class="dot"></span><strong>${esc(name(i))}</strong></div><div class="army-name">${army(state.config.armies[i]).name}</div>
 <button class="shuffle-stack ${busy?'is-shuffling':''} ${i===1?'purple-stack':''}" data-action="shuffle" data-player="${i}" aria-label="${T('Shuffle cards','Zamíchat karty')}: ${esc(name(i))}" ${auto||busy?'disabled':''}>${Array.from({length:7},(_,n)=>`<span class="shuffle-leaf" aria-hidden="true" style="--i:${n}"><span>♜</span>${n===6?'<b>FANTASY<br>BATTLE</b><small>VINMAT</small>':''}</span>`).join('')}</button>
 <p class="shuffle-count" role="status">${busy?T('Shuffling…','Míchám karty…'):count?`${T('Shuffled','Zamícháno')} <strong>${count}×</strong>${count===3?T(' · for luck ✦',' · pro štěstí ✦'):''}`:T('Not shuffled yet','Ještě nezamícháno')}</p>
 ${auto?`<p class="shuffle-auto">${busy?T('The Gamemaster is shuffling.','Gamemaster míchá svůj balíček.'):T('The Gamemaster is ready.','Gamemaster je připraven.')}</p>`:`<button class="secondary shuffle-button" data-action="shuffle" data-player="${i}" ${busy?'disabled':''}>${count?T('Shuffle again','Zamíchat znovu'):T('Shuffle','Zamíchat')} ↻</button>`}
 <span class="shuffle-deck-info">${T('18 number cards + 1 patron','18 číselných karet + 1 patron')}</span></section>`;
}
function mixing(){
 const ready=state.shuffles.every(n=>n>0)&&!shuffleBusy.some(Boolean);
 setScreen('shuffle',`<div class="game-heading"><div><p class="eyebrow">${T('GET READY · SHUFFLE YOUR CARDS','PŘÍPRAVA BITVY · MÍCHÁNÍ KARET')}</p><h1>${T('Shuffle','Zamíchej')} <span style="color:var(--gold)">${T('for luck.','pro štěstí.')}</span></h1></div><button class="secondary" data-action="shuffle-back">${T('Change armies','Změnit armády')}</button></div>
 <section class="arena shuffle-arena" aria-label="${T('Card shuffling','Míchání karet')}"><p class="shuffle-intro">${T('Tap your deck to shuffle as many times as you like. Maybe three times for luck.','Klepni na svůj balíček a zamíchej, kolikrát chceš. Třeba třikrát pro štěstí.')}<br><span class="mix-order">${T('First to play','První vykládá')}: <b>${esc(name(firstPlayer()))}</b></span></p><div class="battle-grid">${shufflePanel(0)}<div class="middle"><div class="vs-medal"><span>vs</span></div></div>${shufflePanel(1)}</div><div class="shuffle-launch"><p>${ready?T('Ready! Shuffle again or start the battle.','Balíčky jsou připravené. Můžeš míchat dál, nebo začít hrát.'):shuffleBusy.some(Boolean)?T('Wait for the shuffle to finish.','Počkej, než se karty domíchají.'):state.config.mode==='duo'?T('Both players need to shuffle at least once.','Oba hráči si nejdřív alespoň jednou zamíchají.'):T('Shuffle your cards at least once first.','Nejdřív si alespoň jednou zamíchej.')}</p><button class="primary" data-action="launch" ${ready?'':'disabled'}>${T('Start battle','Začít bitvu')} →</button></div></section>`);
}
function gameShell(){
 setScreen('game',`<div class="game-heading"><div><p class="eyebrow" id="mode-label"></p><h1>Fantasy <span style="color:var(--gold)">Battle</span></h1></div><div class="battle-meta"><span id="round-label"></span><button class="secondary" data-action="arena-mode">${T('Mobile table','Mobilní stůl')}</button><button class="secondary" data-action="new">${T('Change game','Změnit hru')}</button></div></div>
 <div class="arena-toolbar"><button class="secondary" data-action="new">${T('Menu','Menu')}</button><strong id="compact-round"></strong><button class="secondary" data-action="fullscreen" aria-label="${T('Full screen','Celá obrazovka')}">⛶</button><button class="secondary" data-action="arena-mode">${T('Exit','Zavřít')}</button></div>
 <div class="rotate-hint"><span>↻</span><h2>${T('Turn your device sideways','Otoč zařízení na ležato')}</h2><p>${T('Your battle fits on one screen.','Celý herní stůl se vejde na jednu obrazovku.')}</p></div>
 <div id="result-area"></div><section class="arena" aria-label="${T('Battle table','Herní stůl')}"><div class="arena-top" id="arena-title"></div>
 <div class="battle-grid">${[0,1].map(i=>`${i===1?`<div class="middle"><div class="compare" id="comparison" aria-label="${T('Card comparison','Porovnání karet')}"></div><button class="vs-medal tie-control" id="tie-control" data-action="answer" data-answer="0" disabled><span>VS</span></button><div class="pot">${T('ON THE TABLE','NA STOLE')}<b id="pot-count">0</b><span id="pot-unit"></span></div></div>`:''}
 <div class="player"><div class="player-title"><span class="dot"></span><strong id="player-name-${i}"></strong></div><div class="army-name" id="army-name-${i}"></div><div class="card-slot" id="slot-${i}"></div><div class="player-stats"><div><strong id="deck-count-${i}"></strong>${T('in deck','v balíčku')}</div><div class="points"><strong id="score-${i}"></strong>${T('captured','získáno')}</div></div></div>`).join('')}</div>
 <div class="controls" id="controls"></div><div class="combat-feedback" id="combat-feedback" hidden aria-hidden="true"><div class="miss-art"><svg class="miss-trail" viewBox="0 0 240 180" aria-hidden="true"><path d="M25 146Q65 12 210 35"/><path d="M44 154Q92 40 218 52"/></svg><img class="miss-sword" src="${asset('sword.svg')}" alt=""></div><strong>${T('Wrong!','Špatně!')}</strong><span>${T('Try again','Zkus to znovu')}</span></div>
 <div class="progress-track" id="progress" role="progressbar" aria-label="${T('Cards played','Otočené karty')}" aria-valuemin="0" aria-valuemax="38"><span id="progress-fill"></span></div><div class="progress-label"><span id="progress-label"></span><span id="comparison-mode"></span></div></section>
 <div class="below-arena"><span>♛ &nbsp; ${T('<strong>Patrons</strong> beat every number. Two patrons = a tiebreak.','<strong>Patron</strong> porazí každé číslo. Dva patroni = rozstřel.')}</span><span id="score-note"></span></div>
 <details class="log" id="log"><summary id="log-heading"></summary><ol class="log-list" id="log-list"></ol></details>`);
}
function updateCard(i){
 const slot=document.getElementById(`slot-${i}`),c=state.cards[i],shown=state.revealed[i],a=army(state.config.armies[i]);
 const key=`${state.round}:${state.duel}:${i}:${shown?c:'back'}`;
 // Crucially: never replace or reattach a card already on the table.
 // Opponent reveals, score changes and feedback only update their own DOM nodes.
 if(slot.dataset.cardKey!==key){
  slot.dataset.cardKey=key;
  slot.innerHTML=shown?`<button class="card-wrap face" data-face-id="${++faceSerial}" data-action="answer" data-answer="${i===0?-1:1}" aria-label="${esc(name(i))}: ${c===11?T('Patron','Patron'):c}. ${T('Choose as winner','Vybrat jako vítěze')}"><img src="${asset(`${a.id}-${c}.webp`)}" alt=""></button>`:
   `<button class="card-wrap" data-action="flip" data-player="${i}" aria-label="${T('Play card','Vyložit kartu')}: ${esc(name(i))}"><span class="card-back ${i===1?'opponent':''}"><span class="crest">♜</span><strong>FANTASY<br>BATTLE</strong><small>VINMAT</small><span class="turn-label"></span></span></button>`;
 }
 const wrap=slot.firstElementChild;
 if(shown){wrap.disabled=state.phase!=='compare';wrap.classList.toggle('can-choose',state.phase==='compare');wrap.classList.toggle('winner',state.result?.kind==='win'&&state.result.winner===i);return;}
 const active=expectedPlayer(state)===i&&!(i===1&&state.config.mode==='solo');
 wrap.disabled=!active;wrap.classList.toggle('your-turn',active);
 wrap.querySelector('.turn-label').textContent=i===1&&state.config.mode==='solo'?(state.revealed[0]?T('Gamemaster is playing…','Gamemaster vykládá…'):T('Gamemaster is waiting','Gamemaster čeká')):active?T('Tap to play','Klepni a vylož'):T('Wait for your turn','Počkej na svůj tah');
}
function controls(){
 if(state.phase==='done')return '';
 if(state.phase==='draw'){
  const turn=expectedPlayer(state),gm=state.config.mode==='solo'&&turn===1;
  return `<div class="status-title">${gm?T('Gamemaster is playing…','Gamemaster vykládá…'):`${T('Your turn','Na tahu')}: ${esc(name(turn))}`}</div><p class="status-copy">${gm?T('The Gamemaster plays after you.','Teď je řada na Gamemasterovi.'):T('Tap your own deck to play the next card.','Klepni na svůj balíček a vylož horní kartu.')}${state.duel>1?' '+T('The winner takes every card on the table.','Vítěz rozstřelu získá všechny karty na stole.'):''}</p>`;
 }
 if(state.phase==='compare')return `<div class="status-title">${T('Tap the winning card · or Tie in the middle','Klepni na vítěznou kartu · nebo na Remízu uprostřed')}</div><div class="feedback" id="answer-feedback" role="status">${feedback}</div>`;
 if(state.phase==='tie')return `<div class="status-title">${T('A tie! Time for a tiebreak.','Stejně silné! Jdeme do rozstřelu.')}</div><p class="status-copy">${T(`${cardCount(state.pot)} are waiting on the table.`, `Na stole čeká ${cardCount(state.pot)}.`)}</p><span class="next-round-note">${T('Getting the next cards ready…','Připravuji další karty…')}</span>`;
 return `<div class="status-title"><span class="correct-tick">✓</span> ${esc(name(state.result.winner))} ${T('takes','získává')} ${cardCount(state.result.count)}.</div><p class="status-copy">${T('Next round is getting ready. Then tap your deck again.','Další kolo se připravuje. Potom znovu klepni na svůj balíček.')}</p>`;
}
function renderGame(){
 if(app.dataset.screen!=='game')gameShell();
 const done=state.phase==='done',all=state.revealed.every(Boolean),scores=totals(state),winner=scores[0]===scores[1]?null:scores[0]>scores[1]?0:1;
 setText('mode-label',state.config.mode==='solo'?T('SOLO AGAINST THE GAMEMASTER','SÓLO PROTI GAMEMASTEROVI'):T('1V1 DUEL · ONE DEVICE','SOUBOJ 1V1 · JEDNO ZAŘÍZENÍ'));
 setText('round-label',done?T('Game over','Konec partie'):`${T('Round','Souboj')} ${state.round}${state.duel>1?` · ${T('tiebreak','rozstřel')} ${state.duel-1}`:''}`);
 setText('arena-title',done?T('THE BATTLE IS OVER','BITVA JE DOBOJOVÁNA'):state.duel>1?T('TIEBREAK · WINNER TAKES ALL','ROZSTŘEL · VÍTĚZ BERE VŠE'):T('THE HIGHER CARD WINS','VYŠŠÍ KARTA VÍTĚZÍ'));
 for(let i=0;i<2;i++){setText(`player-name-${i}`,name(i));setText(`army-name-${i}`,army(state.config.armies[i]).name+(i===1&&state.config.mode==='solo'?' · GM':''));setText(`deck-count-${i}`,state.decks[i].length);setText(`score-${i}`,state.scores[i]);updateCard(i);}
 setText('compact-round',document.getElementById('round-label').textContent);
 const tie=document.getElementById('tie-control');tie.disabled=state.phase!=='compare';tie.classList.toggle('can-choose',state.phase==='compare');tie.querySelector('span').textContent=state.phase==='compare'?T('TIE','REMÍZA'):'VS';tie.setAttribute('aria-label',state.phase==='compare'?T('Tie','Remíza'):T('Versus','Proti'));
 const relation=all?comparison(state):null;
 setText('comparison',all?(state.phase==='compare'?'?':relation===0?'=':relation<0?'>':'<'):'');
 setText('pot-count',state.pot);setText('pot-unit',T(state.pot===1?'card':'cards',state.pot===1?'karta':state.pot>=2&&state.pot<=4?'karty':'karet'));
 document.querySelector('#controls').innerHTML=controls();
 const played=38-state.decks.flat().length;
 document.querySelector('#progress').setAttribute('aria-valuenow',played);document.querySelector('#progress-fill').style.width=`${played/38*100}%`;
 setText('progress-label',T(`${played} of 38 cards played`,`Otočeno ${played} z 38 karet`));
 setText('comparison-mode',state.config.mode==='solo'?T('You choose the result','Ty určuješ výsledek'):state.config.practice?T('Players choose the result','Hráči určují výsledek'):T('Automatic comparison','Automatické porovnávání'));
 setText('score-note',done?T('Final scores include unplayed cards.','Skóre zahrnuje i zbylé karty.'):T('Captured cards stay out of the deck.','Získané karty se do balíčku nevracejí.'));
 setText('log-heading',`${T('Battle log','Průběh bitvy')} · ${state.history.length} ${T(state.history.length===1?'comparison':'comparisons','porovnání')}`);
 const log=document.querySelector('#log-list');
 if(log.dataset.count!==String(state.history.length)){
  log.dataset.count=state.history.length;
  log.innerHTML=state.history.length?[...state.history].reverse().map(h=>`<li class="log-row"><span>${T('Round','Souboj')} ${h.round}${h.duel>1?` / R${h.duel-1}`:''}</span><span class="relation">${value(h.cards[0])}${h.relation===0?'=':h.relation<0?'&gt;':'&lt;'}${value(h.cards[1])}</span><b>${h.winner!==null?`${esc(name(h.winner))} +${h.won}`:h.discarded?T('Cards do not count','Karty se nepočítají'):T('Tiebreak →','Rozstřel →')}</b></li>`).join(''):`<li class="log-row">${T('The first round is about to begin.','První souboj teprve začíná.')}</li>`;
 }
 const result=document.querySelector('#result-area');
 if(done&&!result.firstElementChild){
  result.innerHTML=`<div class="result-banner"><span class="crown">${winner===null?'⚔':'♛'}</span><h2>${winner===null?T('An even battle. A draw!','Vyrovnaná bitva. Remíza!'):`${esc(name(winner))} ${T('wins!','vítězí!')}`}</h2><p>${esc(name(0))}: <strong>${scores[0]}</strong> ${T('cards','karet')} &nbsp; · &nbsp; ${esc(name(1))}: <strong>${scores[1]}</strong> ${T('cards','karet')}</p>${state.discarded?`<p>${T(`${state.discarded} cards from the final tied tiebreak do not count.`,`${state.discarded} karet z posledního nerozhodnutého rozstřelu se nepočítá.`)}</p>`:''}<div class="result-actions"><button class="primary" data-action="rematch">${T('Rematch with the same armies','Odveta se stejnými armádami')} ↻</button><button class="secondary" data-action="setup">${T('Choose different armies','Vybrat jiné armády')}</button></div></div>`;
  document.querySelector('#log').open=true;window.scrollTo({top:0,behavior:'instant'});
 }
}
function render(){syncArenaMode();if(view==='setup')setup();else if(view==='shuffle')mixing();else{renderGame();scheduleGamemaster();scheduleNextRound();}}
function readNames(){
 config.names=[document.querySelector('#name0')?.value.trim()||patronName(config.armies[0],locale),document.querySelector('#name1')?.value.trim()||patronName(config.armies[1],locale)];
 config.practice=config.mode==='solo'?true:document.querySelector('#practice')?.checked??config.practice;
 config.firstPlayer=Number(document.querySelector('#first-player')?.value??config.firstPlayer??0);saveDraft();
}
function resetTimers(){clearTimeout(gmTimer);clearTimeout(roundTimer);clearTimeout(missTimer);gmTimer=null;roundTimer=null;missTimer=null;shuffleTimers.forEach(clearTimeout);shuffleTimers=[null,null];shuffleBusy=[false,false];}
function shuffleOne(i,automatic=false){
 if(view!=='shuffle'||shuffleBusy[i]||(state.config.mode==='solo'&&i===1&&!automatic)||!shuffleDeck(state,i))return;
 shuffleBusy[i]=true;const target=state;play('shuffle',i);persist();render();
 shuffleTimers[i]=setTimeout(()=>{if(state!==target)return;shuffleBusy[i]=false;shuffleTimers[i]=null;if(view==='shuffle'){render();announce(T(`${name(i)}: shuffled ${state.shuffles[i]} ${state.shuffles[i]===1?'time':'times'}.`,`${name(i)}: zamícháno ${state.shuffles[i]}krát.`));}},790);
}
function prepare(){resetTimers();if(config.mode==='solo')config.practice=true;saveDraft();state=createGame(structuredClone(config),{prepare:true});view='shuffle';feedback='';persist();render();window.scrollTo({top:0,behavior:'instant'});if(config.mode==='solo')shuffleOne(1,true);}
function start(){if(shuffleBusy.some(Boolean)||!begin(state))return;view='game';feedback='';persist();render();if(document.body.classList.contains('arena-mode'))enterFullscreen();play('start',firstPlayer());announce(T(`The battle begins. ${name(expectedPlayer(state))} plays first.`,`Bitva začíná. První vykládá ${name(expectedPlayer(state))}.`));window.scrollTo({top:0,behavior:'instant'});}
function scheduleGamemaster(){
 if(gmTimer!==null||view!=='game'||state.config.mode!=='solo'||expectedPlayer(state)!==1)return;
 const target=state;
 gmTimer=setTimeout(()=>{gmTimer=null;if(state!==target||view!=='game'||expectedPlayer(state)!==1)return;if(reveal(state,1)){play('reveal',1);persist();render();announce(T(`${name(0)}: ${state.cards[0]===11?'patron':state.cards[0]}. Gamemaster: ${state.cards[1]===11?'patron':state.cards[1]}. Who wins?`,`${name(0)}: ${state.cards[0]===11?'patron':state.cards[0]}. Gamemaster: ${state.cards[1]===11?'patron':state.cards[1]}. Kdo má víc?`));}},700);
}
function scheduleNextRound(){
 if(roundTimer!==null||view!=='game'||!['resolved','tie'].includes(state.phase))return;
 const target=state;
 roundTimer=setTimeout(()=>{
  roundTimer=null;if(state!==target||view!=='game'||!next(state))return;
  feedback='';persist();render();announce(T('Next round. Tap your deck to play.','Další kolo. Klepni na svůj balíček a vylož kartu.'));
  document.querySelector(`button[data-action="flip"][data-player="${expectedPlayer(state)}"]`)?.focus({preventScroll:true});
 },state.phase==='tie'?1100:950);
}
function finishCompare(){
 if(!resolve(state))return;
 clearTimeout(missTimer);const fx=document.querySelector('#combat-feedback');if(fx){fx.classList.remove('is-miss');fx.hidden=true;}feedback='';persist();
 play(state.phase==='tie'?'tie':'win',state.result?.winner??firstPlayer());render();
 announce(state.phase==='done'?T('Game over. The final scores are above the table.','Partie skončila. Výsledek je nad herním stolem.'):state.phase==='tie'?T('A tie. Preparing the tiebreak.','Shoda. Připravuji rozstřel.'):T('Correct. Preparing the next round.','Správně. Připravuji další kolo.'));
}
function showWrong(){
 feedback=state.cards.includes(11)?T('A patron beats every number. Two patrons are a tie. Try again.','Patron porazí každé číslo. Dva patroni jsou stejně silní. Zkus to znovu.'):T('Look for the higher number. Matching numbers are a tie. Try again.','Hledej větší číslo. Stejná čísla znamenají shodu. Zkus to znovu.');
 setText('answer-feedback',feedback);const fx=document.querySelector('#combat-feedback');clearTimeout(missTimer);fx.hidden=false;fx.classList.remove('is-miss');void fx.offsetWidth;fx.classList.add('is-miss');play('miss',firstPlayer());announce(T('Wrong. Try again.','Špatně. Zkus to znovu.'));
 missTimer=setTimeout(()=>{fx.classList.remove('is-miss');fx.hidden=true;missTimer=null;},1000);
}
app.addEventListener('click',e=>{
 const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;
 sound.unlock();const a=b.dataset.action;
 if(view==='setup'){
  if(['mode','pick-army','start'].includes(a))readNames();
  if(a==='mode'){config.mode=b.dataset.mode;if(config.mode==='solo')config.practice=true;saveDraft();render();}
  if(a==='pick-army')pickArmy(Number(b.dataset.player));
  if(a==='start')prepare();
  if(a==='resume'&&saved){resetTimers();state=structuredClone(saved);config=structuredClone(state.config);view=state.phase==='shuffle'?'shuffle':'game';render();if(view==='shuffle'&&config.mode==='solo'&&!state.shuffles[1])shuffleOne(1,true);}
  return;
 }
 if(view==='shuffle'){
  if(a==='shuffle')shuffleOne(Number(b.dataset.player));
  if(a==='launch')start();
  if(a==='shuffle-back'){config=structuredClone(state.config);resetTimers();view='setup';render();}
  return;
 }
 if(a==='arena-mode'){arenaPreference=!document.body.classList.contains('arena-mode');syncArenaMode();if(arenaPreference)enterFullscreen();else leaveFullscreen();}
 if(a==='fullscreen')enterFullscreen();
 if(a==='flip'){
  const i=Number(b.dataset.player);if(state.config.mode==='solo'&&i===1||!reveal(state,i))return;
  play('reveal',i);feedback='';
  if(state.phase==='compare'&&!state.config.practice&&state.config.mode==='duo')finishCompare();else{persist();render();if(state.phase==='compare')announce(T('Both cards are on the table. Choose who wins.','Obě karty jsou vyložené. Určete, kdo má víc.'));}
 }
 if(a==='answer'&&state.phase==='compare'){if(Number(b.dataset.answer)===comparison(state))finishCompare();else showWrong();}
 if(a==='rematch'){config=structuredClone(state.config);prepare();}
 if(a==='new'){
  if(state.phase==='done'){config=structuredClone(state.config);resetTimers();clearSave();view='setup';render();}
  else modal(`<h2 id="dialog-title">${T('Change game?','Změnit hru?')}</h2><p>${T('Your current game stays saved until you start a new one.','Rozehraná partie zůstane uložená, dokud nezačneš novou.')}</p><button class="primary" data-dialog="setup" style="margin-top:20px">${T('Back to army selection','Zpět k výběru armád')}</button>`);
 }
 if(a==='setup'){config=structuredClone(state.config);resetTimers();clearSave();view='setup';render();window.scrollTo({top:0,behavior:'instant'});}
});
app.addEventListener('change',e=>{
 if(view!=='setup')return;
 if(e.target.matches('[data-army-select]')){readNames();const i=Number(e.target.dataset.armySelect),id=e.target.value;if(army(id)&&id!==config.armies[1-i])changeArmy(config,i,id,locale);saveDraft();render();}
 else if(e.target.matches('#practice,#first-player,.name-input'))readNames();
});
app.addEventListener('input',e=>{
 if(view!=='setup'||!e.target.matches('.name-input'))return;
 // Keep the order selector readable while names are being typed, without
 // replacing the focused input or losing the caret on an iPad.
 const options=document.querySelector('#first-player')?.options;
 if(options){for(let i=0;i<2;i++){const text=document.querySelector(`#name${i}`).value.trim()||patronName(config.armies[i],locale);options[i].textContent=`${T('Player','Hráč')} ${i+1} · ${text}`;}}
});
dialog.addEventListener('click',e=>{
 const pick=e.target.closest('[data-pick-army]');
 if(pick&&!pick.disabled){sound.unlock();const i=Number(pick.dataset.player);changeArmy(config,i,pick.dataset.pickArmy,locale);saveDraft();play('start',i);dialog.close();render();return;}
 if(e.target.closest('[data-dialog="setup"]')){config=structuredClone(state.config);resetTimers();view='setup';dialog.close();render();}
 if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}
});
function soundButton(){const b=document.querySelector('#sound'),label=sound.enabled?T('Turn sound off','Vypnout zvuk'):T('Turn sound on','Zapnout zvuk');b.setAttribute('aria-label',label);b.title=label;b.innerHTML=sound.enabled?'♪':'♪<span class="sound-off">×</span>';}
document.querySelector('#rules').addEventListener('click',rules);
document.querySelector('#sound').addEventListener('click',()=>{sound.enabled=!sound.enabled;try{localStorage.setItem('vm-fantasy-sound-v2',sound.enabled?'on':'off');}catch{}soundButton();sound.unlock();play('start');});
document.querySelector('[data-lang-link]').addEventListener('click',()=>{if(view==='setup')readNames();if(state)persist();saveDraft();try{if(view!=='setup')sessionStorage.setItem('vm-fantasy-switch-language','yes');}catch{}});
if(resumeOnLanguageChange&&saved&&saved.phase!=='done'){state=structuredClone(saved);config=structuredClone(state.config);view=state.phase==='shuffle'?'shuffle':'game';}
soundButton();render();
if(view==='shuffle'&&config.mode==='solo'&&!state.shuffles[1])shuffleOne(1,true);

function syncArenaMode(){
 const active=view==='game'&&(arenaPreference??matchMedia('(max-width:740px), (max-height:520px), (pointer:coarse) and (max-width:1366px)').matches);
 document.body.classList.toggle('arena-mode',active);
 document.body.classList.toggle('arena-portrait',active&&innerHeight>innerWidth);
 document.body.dataset.phase=state?.phase||'';
 if(view!=='game'&&(document.fullscreenElement||document.webkitFullscreenElement))leaveFullscreen();
}
async function enterFullscreen(){
 try{if(!document.fullscreenElement&&!document.webkitFullscreenElement){if(document.fullscreenEnabled)await document.documentElement.requestFullscreen();else if(document.webkitFullscreenEnabled)await document.documentElement.webkitRequestFullscreen();}
 if(document.fullscreenElement||document.webkitFullscreenElement)await screen.orientation?.lock?.('landscape');}catch{}
}
function leaveFullscreen(){try{const result=document.exitFullscreen?.();result?.catch(()=>{});}catch{}try{if(document.webkitFullscreenElement)document.webkitExitFullscreen?.();screen.orientation?.unlock?.();}catch{}}
window.addEventListener('resize',syncArenaMode);document.addEventListener('fullscreenchange',syncArenaMode);
