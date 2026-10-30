import {createGame,shuffleDeck,begin,expectedPlayer,reveal,comparison,resolve,next,totals,valid} from './engine.mjs?v=3';
const armies=[
  {id:'knights',name:'Rytíři',image:'army-knights-thumb.webp',patron:'Strážný anděl'},
  {id:'undead',name:'Zombíci',image:'army-undead-thumb.webp',patron:'Nekromancer'},
  {id:'orcs',name:'Orkové',image:'army-orcs-thumb.webp',patron:'Orčí patron'},
  {id:'goblins',name:'Skřeti',image:'army-goblins-thumb.webp',patron:'Skřetí šaman'},
  {id:'fairies',name:'Víly',image:'army-fairies-v2-thumb.webp',patron:'Smaragdová královna'},
  {id:'dwarves',name:'Trpaslíci',image:'army-dwarves-v2-thumb.webp',patron:'Král pod horou'},
  {id:'skeletons',name:'Kostlivci',image:'army-skeletons-v1-thumb.webp',patron:'Král kostlivců'},
  {id:'elves',name:'Elfové',image:'army-elves-v2-thumb.webp',patron:'Elfí patronka'},
  {id:'dragons',name:'Draci',image:'army-dragons-v2-thumb.webp',patron:'Dračí patron'}
];
const app=document.querySelector('#app'),dialog=document.querySelector('#dialog'),storageKey='vm-fantasy-prebijena-v1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const army=id=>armies.find(a=>a.id===id), value=n=>n===11?'♛':n;
let config={mode:'solo',armies:['knights','orcs'],names:['Velitel','Hráč 2'],practice:true,firstPlayer:0},state=null,view='setup',feedback='',saved=null,sound=false,audio=null,gmTimer=null;
let shuffleBusy=[false,false],shuffleTimers=[null,null];
try{const x=JSON.parse(localStorage.getItem(storageKey));if(valid(x)&&x.config.armies?.every(id=>army(id))&&Array.isArray(x.config.names)&&x.config.names.length===2&&x.config.names.every(n=>typeof n==='string'&&n.length<80)){if(x.config.mode==='solo')x.config.practice=true;saved=x;}}catch{}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));saved=structuredClone(state);}catch{}}
function clearSave(){saved=null;try{localStorage.removeItem(storageKey);}catch{}}
function playerName(i,c=config){return i===1&&c.mode==='solo'?'Gamemaster':c.names[i];}
function name(i){return playerName(i,state.config);}
function announce(s){document.querySelector('#announcer').textContent=s;}
function beep(kind='flip'){
 if(!sound)return;
 try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.connect(g);g.connect(audio.destination);o.type='sine';o.frequency.setValueAtTime(kind==='win'?660:kind==='tie'?330:420,audio.currentTime);o.frequency.exponentialRampToValueAtTime(kind==='win'?880:220,audio.currentTime+.13);g.gain.setValueAtTime(.045,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.22);o.start();o.stop(audio.currentTime+.23);}catch{}
}
function modal(html){document.querySelector('#dialog-content').innerHTML=html;dialog.showModal();}
function rules(){modal(`<p class="eyebrow">PRAVIDLA PŘEBÍJENÉ</p><h2 id="dialog-title">Vyšší karta bere vše.</h2><ol><li><strong>Vyber si armádu.</strong> Každý dostane stejných 18 číselných karet a jednoho patrona. Před bitvou klepni na svůj balíček a zamíchej, kolikrát chceš. Každý hráč zamíchá alespoň jednou; Gamemaster míchá automaticky.</li><li><strong>Otočte horní karty.</strong> Vyšší číslo vyhrává. Patron ♛ poráží každé číslo. Dva patroni znamenají shodu.</li><li><strong>Stejné karty? Rozstřel!</strong> Oba otočí další kartu. Vítěz získá všechny karty na stole. Získané karty se odkládají stranou, do balíčku se nevracejí.</li><li><strong>Vyhrává nejvíc získaných karet.</strong> Na konci se připočtou i karty zbývající v balíčku. Nevyřešený rozstřel, při kterém dojdou karty oběma, se nepočítá. Při stejném skóre je remíza.</li></ol><p><strong>Sólo:</strong> Gamemaster otáčí své karty automaticky z předem zamíchaného balíčku. <strong>1v1:</strong> hráči klikají na své balíčky v předem zvoleném pořadí. Toto pořadí platí v každém kole i při rozstřelu.</p><p style="margin-top:12px"><strong>Procvičování:</strong> proti Gamemasterovi pokaždé vyber „Mám víc“, „Máš víc“ nebo „Remíza“. Ve hře pro dva lze určování výsledku zapnout při přípravě. Při chybě můžeš odpověď opravit; body se nestrhávají.</p><p style="margin-top:12px;font-size:11px">Patron v této variantě znamená nejvyšší kartu, nikoli posilu +5. Akční karty se nepoužívají. Žádný časový limit.</p>`);}
function armySelection(i){
 const selected=army(config.armies[i]);
 return `<section class="army-selection" aria-label="Armáda: ${esc(playerName(i))}">
  <div class="army-selection-title">${i===1&&config.mode==='solo'?'Armáda Gamemastera':config.mode==='solo'?'Tvoje armáda':i===0?'Armáda hráče 1':'Armáda hráče 2'}</div>
  <button class="army-preview" data-action="pick-army" data-player="${i}" aria-label="Vybrat armádu: ${esc(playerName(i))}"><img src="assets/${selected.image}" alt="${selected.name}"><span>Vybrat armádu <b>↗</b></span></button>
  <label class="sr-only" for="army${i}">Výběr armády: ${esc(playerName(i))}</label>
  <select class="army-select" id="army${i}" data-army-select="${i}">${armies.map(a=>`<option value="${a.id}" ${a.id===selected.id?'selected':''} ${a.id===config.armies[1-i]?'disabled':''}>${a.name}${a.id===config.armies[1-i]?' (soupeř)':''}</option>`).join('')}</select>
 </section>`;
}
function setup(){
 app.innerHTML=`${saved&&saved.phase!=='done'?`<div class="resume"><span>✦ Máš rozehranou partii.</span><button class="secondary" data-action="resume">Pokračovat →</button></div>`:''}
 <div class="setup-layout"><section><p class="eyebrow">KARETNÍ SOUBOJ · 1–2 HRÁČI</p><h1>Malé karty.<br><em>Velká bitva.</em></h1><p class="intro">Vyber si armádu, zamíchej si pro štěstí a vyzvi osud. Poraz Gamemastera, nebo se utkej s kamarádem v přebíjené ze světa VM Fantasy Battle.</p><div class="badge-row"><span class="pill">9 fantasy armád</span><span class="pill">Původní herní karty</span><span class="pill">Bez časového limitu</span></div><figure class="intro-art"><img src="assets/fantasy-battle-169.webp" alt="Rytíř, zombík, ork a skřet připravení na fantasy bitvu"><figcaption><small>VM FANTASY BATTLE</small>Každá armáda má šanci zvítězit.</figcaption></figure><div class="facts"><span>♜ <b>19 karet</b> na hráče</span><span>✦ <b>4–10 let</b></span><span>◷ <b>3–5 minut</b></span></div><div class="note-box"><span>♛</span><p>Vyšší číslo vítězí. <b>Patron porazí každé číslo.</b><br>Při shodě se rozhodne v rozstřelu.</p></div></section>
 <section class="setup-panel" aria-label="Nastavení nové hry"><div class="section-label"><span class="step">1</span> Jak chceš hrát?</div><div class="mode-tabs"><button class="mode ${config.mode==='solo'?'active':''}" data-action="mode" data-mode="solo" aria-pressed="${config.mode==='solo'}"><span>♟</span><div><strong>Proti Gamemasterovi</strong><small>Jeden hráč · soupeř hraje sám</small></div></button><button class="mode ${config.mode==='duo'?'active':''}" data-action="mode" data-mode="duo" aria-pressed="${config.mode==='duo'}"><span>⚔</span><div><strong>Souboj 1v1</strong><small>Dva hráči · jedno zařízení</small></div></button></div>
 <div class="names"><label>${config.mode==='solo'?'Tvoje jméno':'První hráč'}<input class="name-input" id="name0" maxlength="24" value="${esc(config.names[0])}" placeholder="Velitel" autocomplete="off"></label>${config.mode==='duo'?`<label>Druhý hráč<input class="name-input" id="name1" maxlength="24" value="${esc(config.names[1])}" placeholder="Hráč 2" autocomplete="off"></label>`:'<div></div>'}</div>
 <div class="section-label"><span class="step">2</span> Vyber armádu každému</div><div class="army-selections">${armySelection(0)}${armySelection(1)}</div>
 ${config.mode==='duo'?`<label class="first-player-label" for="first-player">Kdo v každém kole vyloží první?</label><select class="army-select first-player-select" id="first-player"><option value="0" ${config.firstPlayer!==1?'selected':''}>Hráč 1 · ${esc(config.names[0])}</option><option value="1" ${config.firstPlayer===1?'selected':''}>Hráč 2 · ${esc(config.names[1])}</option></select><div class="setup-bottom"><label class="check-label"><input id="practice" type="checkbox" ${config.practice?'checked':''}> Hráči určují výsledek porovnání</label></div>`:`<div class="setup-bottom"><p class="welcome-note"><b>Ty vykládáš první, Gamemaster hned po tobě.</b><br>Pak vybereš: Mám víc / Máš víc / Remíza.</p></div>`}
 <button class="primary wide" data-action="start"><span>Pokračovat k míchání</span><span>→</span></button><p class="hint">Před hrou si každý hráč zamíchá svůj balíček, kolikrát chce.</p></section></div>`;
}
function pickArmy(i){
 modal(`<p class="eyebrow">VÝBĚR ARMÁDY</p><h2 id="dialog-title">${esc(playerName(i))}</h2><div class="army-grid army-dialog">${armies.map(a=>{
  const selected=config.armies[i]===a.id,other=config.armies[1-i]===a.id;
  return `<button class="army ${selected?'selected':''} ${other?'other':''}" data-pick-army="${a.id}" data-player="${i}" aria-label="${a.name}${other?', vybral soupeř':''}" aria-pressed="${selected}" ${other?'disabled':''}><img src="assets/${a.image}" alt=""><strong>${a.name}</strong>${selected?'<span class="badge">✓</span>':''}</button>`;
 }).join('')}</div><p class="hint">Obě armády mají stejné hodnoty karet.</p>`);
}
function shufflePanel(i){
 const a=army(state.config.armies[i]),auto=i===1&&state.config.mode==='solo',count=state.shuffles[i],busy=shuffleBusy[i];
 return `<section class="shuffle-player"><div class="player-title"><span class="dot"></span><strong>${esc(name(i))}</strong></div><div class="army-name">${a.name}</div>
 <button class="shuffle-stack ${busy?'is-shuffling':''} ${i===1?'purple-stack':''}" data-action="shuffle" data-player="${i}" aria-label="Zamíchat karty: ${esc(name(i))}" ${auto||busy?'disabled':''}>${Array.from({length:7},(_,n)=>`<span class="shuffle-leaf" aria-hidden="true" style="--i:${n}"><span>♜</span>${n===6?'<b>FANTASY<br>BATTLE</b><small>VINMAT</small>':''}</span>`).join('')}</button>
 <p class="shuffle-count" role="status">${busy?'Míchám karty…':count?`Zamícháno <strong>${count}×</strong>${count===3?' · pro štěstí ✦':''}`:'Ještě nezamícháno'}</p>
 ${auto?`<p class="shuffle-auto">${busy?'Gamemaster míchá svůj balíček.':count?'Gamemaster je připraven.':'Gamemaster si zamíchá sám.'}</p>`:`<button class="secondary shuffle-button" data-action="shuffle" data-player="${i}" ${busy?'disabled':''}>Zamíchat ${count?'znovu ':''}↻</button>`}
 <span class="shuffle-deck-info">18 číselných karet + 1 patron</span></section>`;
}
function mixing(){
 const ready=state.shuffles.every(n=>n>0)&&!shuffleBusy.some(Boolean);
 app.innerHTML=`<div class="game-heading"><div><p class="eyebrow">PŘÍPRAVA BITVY · MÍCHÁNÍ KARET</p><h1>Zamíchej <span style="color:var(--gold)">pro štěstí.</span></h1></div><button class="secondary" data-action="shuffle-back">Změnit armády</button></div>
 <section class="arena shuffle-arena" aria-label="Míchání karet"><p class="shuffle-intro">Klepni na svůj balíček a zamíchej, kolikrát chceš. Třeba třikrát pro štěstí.<br><span class="mix-order">První vykládá: <b>${esc(name(state.config.mode==='solo'?0:state.config.firstPlayer===1?1:0))}</b></span></p><div class="battle-grid">${shufflePanel(0)}<div class="middle"><div class="vs-medal"><span>vs</span></div></div>${shufflePanel(1)}</div><div class="shuffle-launch"><p>${ready?'Balíčky jsou připravené. Můžeš míchat dál, nebo začít hrát.':shuffleBusy.some(Boolean)?'Počkej, než se karty domíchají.':state.config.mode==='duo'?'Oba hráči si nejdřív alespoň jednou zamíchají.':'Nejdřív si alespoň jednou zamíchej.'}</p><button class="primary" data-action="launch" ${ready?'':'disabled'}>Začít bitvu →</button></div></section>`;
}
function resetTimers(){
 clearTimeout(gmTimer);gmTimer=null;shuffleTimers.forEach(clearTimeout);shuffleTimers=[null,null];shuffleBusy=[false,false];
}
function shuffleOne(i,automatic=false){
 if(view!=='shuffle'||shuffleBusy[i]||(state.config.mode==='solo'&&i===1&&!automatic))return;
 if(!shuffleDeck(state,i))return;
 shuffleBusy[i]=true;const target=state;beep();persist();render();
 shuffleTimers[i]=setTimeout(()=>{if(state!==target)return;shuffleBusy[i]=false;shuffleTimers[i]=null;if(view==='shuffle'){render();announce(`${name(i)}: zamícháno ${state.shuffles[i]}krát.`);}},760);
}
function prepare(){
 resetTimers();if(config.mode==='solo')config.practice=true;
 state=createGame(structuredClone(config),{prepare:true});view='shuffle';feedback='';persist();render();window.scrollTo({top:0,behavior:'instant'});
 if(config.mode==='solo')shuffleOne(1,true);
}
function scheduleGamemaster(){
 if(gmTimer!==null||view!=='game'||state.config.mode!=='solo'||expectedPlayer(state)!==1)return;
 const target=state;
 gmTimer=setTimeout(()=>{
  gmTimer=null;if(state!==target||view!=='game'||expectedPlayer(state)!==1)return;
  if(reveal(state,1)){beep();persist();render();announce(`${name(0)}: ${state.cards[0]===11?'patron':state.cards[0]}. Gamemaster: ${state.cards[1]===11?'patron':state.cards[1]}. Kdo má víc?`);}
 },700);
}
function card(i){
 const a=army(state.config.armies[i]),c=state.cards[i],shown=state.revealed[i],win=state.result?.kind==='win'&&state.result.winner===i;
 return `<div class="player"><div class="player-title"><span class="dot"></span><strong>${esc(name(i))}</strong></div><div class="army-name">${a.name}</div>${shown?`<div class="card-wrap face ${win?'winner':''}" role="img" aria-label="${esc(name(i))}: ${c===11?'Patron':c}"><img src="assets/${a.id}-${c}.webp" alt="">${c===11?'<span class="patron-badge">♛<small>PATRON</small></span>':''}</div>`:`<button class="card-wrap ${expectedPlayer(state)===i?'your-turn':''}" data-action="flip" data-player="${i}" aria-label="Otočit kartu: ${esc(name(i))}" ${expectedPlayer(state)!==i||(i===1&&state.config.mode==='solo')?'disabled':''}><span class="card-back ${i===1?'opponent':''}"><span class="crest">♜</span><strong>FANTASY<br>BATTLE</strong><small>VINMAT</small><span class="turn-label">${i===1&&state.config.mode==='solo'?(state.revealed[0]?'Gamemaster vykládá…':'Gamemaster čeká'):expectedPlayer(state)===i?'Klepni a vylož':'Počkej na svůj tah'}</span></span></button>`}<div class="player-stats"><div><strong>${state.decks[i].length}</strong>v balíčku</div><div class="points"><strong>${state.scores[i]}</strong>získáno</div></div></div>`;
}
function controls(){
 if(state.phase==='done')return '';
 if(state.phase==='draw'){
   const turn=expectedPlayer(state),gm=state.config.mode==='solo'&&turn===1;
   return `<div class="status-title">${gm?'Gamemaster vykládá…':`Na tahu: ${esc(name(turn))}`}</div><p class="status-copy">${gm?'Teď je řada na Gamemasterovi.':`${state.config.mode==='solo'?'Klepni na svůj balíček a vylož horní kartu.':'Klepnutím na svůj balíček vylož horní kartu.'}`}${state.duel>1?' Vítěz rozstřelu získá všechny karty na stole.':''}</p>`;
 }
 if(state.phase==='compare')return `<div class="status-title">${state.config.mode==='solo'?'Kdo má víc?':'Kdo získá karty ze stolu?'}</div><p class="status-copy">${state.config.mode==='solo'?'Porovnej svou kartu s kartou Gamemastera.':'Vyber hráče se silnější kartou, nebo remízu.'}</p><div class="answer-buttons"><button class="answer" data-action="answer" data-answer="-1">${state.config.mode==='solo'?'Mám víc':esc(name(0))}</button><button class="answer" data-action="answer" data-answer="1">${state.config.mode==='solo'?'Máš víc':esc(name(1))}</button><button class="answer" data-action="answer" data-answer="0">Remíza</button></div><div class="feedback" role="status">${feedback}</div>`;
 if(state.phase==='tie')return `<div class="status-title">Stejně silné! Jdeme do rozstřelu.</div><p class="status-copy">Na stole ${state.pot===2?'čekají 2 karty':`čeká ${state.pot} karet`}. Další karty rozhodnou, kdo je získá všechny.</p><button class="primary" data-action="next">Pokračovat v rozstřelu →</button>`;
 return `<div class="status-title">${esc(name(state.result.winner))} získává ${state.result.count} ${state.result.count<5?'karty':'karet'}.</div><p class="status-copy">${state.cards[state.result.winner]===11?'Patron je silnější než každé číslo.':'Vyšší číslo vítězí.'} Karty putují do získané hromádky.</p><button class="primary" data-action="next">Další souboj →</button>`;
}
function game(){
 const done=state.phase==='done',t=totals(state),winner=t[0]===t[1]?null:t[0]>t[1]?0:1,all=state.revealed.every(Boolean),resultRelation=all?comparison(state):null;
 app.innerHTML=`<div class="game-heading"><div><p class="eyebrow">${state.config.mode==='solo'?'SÓLO PROTI GAMEMASTEROVI':'SOUBOJ 1V1 · JEDNO ZAŘÍZENÍ'}</p><h1>Fantasy <span style="color:var(--gold)">Battle</span></h1></div><div class="battle-meta"><span>${done?'Konec partie':`Souboj <strong>${state.round}</strong>${state.duel>1?` · rozstřel ${state.duel-1}`:''}`}</span><button class="secondary" data-action="new">Změnit hru</button></div></div>${done?`<div class="result-banner"><span class="crown">${winner===null?'⚔':'♛'}</span><h2>${winner===null?'Vyrovnaná bitva. Remíza!':`Vítězí ${esc(name(winner))}!`}</h2><p>${esc(name(0))}: <strong>${t[0]}</strong> karet &nbsp; · &nbsp; ${esc(name(1))}: <strong>${t[1]}</strong> karet</p>${state.discarded?`<p>${state.discarded} karet z posledního nerozhodnutého rozstřelu se nepočítá.</p>`:''}<div class="result-actions"><button class="primary" data-action="rematch">Odveta se stejnými armádami ↻</button><button class="secondary" data-action="setup">Vybrat jiné armády</button></div></div>`:''}<section class="arena" aria-label="Herní stůl"><div class="arena-top">${done?'BITVA JE DOBOJOVÁNA':state.duel>1?'ROZSTŘEL · VÍTĚZ BERE VŠE':'VYŠŠÍ KARTA VÍTĚZÍ'}</div><div class="battle-grid">${card(0)}<div class="middle">${all?`<div class="compare" aria-label="${state.phase==='compare'?'Porovnej karty':'Výsledek porovnání'}">${state.phase==='compare'?'?':resultRelation===0?'=':resultRelation<0?'&gt;':'&lt;'}</div>`:''}<div class="vs-medal"><span>vs</span></div><div class="pot">NA STOLE<b>${state.pot}</b>${state.pot===1?'karta':state.pot>1&&state.pot<5?'karty':'karet'}</div></div>${card(1)}</div>${!done?`<div class="controls">${controls()}</div>`:''}<div class="progress-track" role="progressbar" aria-label="Otočené karty" aria-valuenow="${38-state.decks.flat().length}" aria-valuemin="0" aria-valuemax="38"><span style="width:${(38-state.decks.flat().length)/38*100}%"></span></div><div class="progress-label"><span>Otočeno ${38-state.decks.flat().length} z 38 karet</span><span>${state.config.mode==='solo'?'Ty určuješ výsledek':state.config.practice?'Hráči určují výsledek':'Automatické porovnávání'}</span></div></section><div class="below-arena"><span>♛ &nbsp; <strong>Patron</strong> porazí každé číslo. Dva patroni = rozstřel.</span><span>${done?'Skóre zahrnuje i zbylé karty.':'Získané karty se do balíčku nevracejí.'}</span></div><details class="log" ${done?'open':''}><summary>Průběh bitvy <span style="color:var(--gold)">· ${state.history.length} porovnání</span></summary><ol class="log-list">${state.history.length?[...state.history].reverse().map(h=>`<li class="log-row"><span>Souboj ${h.round}${h.duel>1?` / R${h.duel-1}`:''}</span><span class="relation">${value(h.cards[0])}${h.relation===0?'=':h.relation<0?'&gt;':'&lt;'}${value(h.cards[1])}</span><b>${h.winner!==null?`${esc(name(h.winner))} +${h.won}`:h.discarded?'Karty se nepočítají':'Rozstřel →'}</b></li>`).join(''):'<li class="log-row">První souboj teprve začíná.</li>'}</ol></details>`;
}
function render(){
 if(view==='setup')setup();else if(view==='shuffle')mixing();else{game();scheduleGamemaster();}
}
function readNames(){
 config.names=[document.querySelector('#name0')?.value.trim()||'Velitel',document.querySelector('#name1')?.value.trim()||config.names[1]||'Hráč 2'];
 config.practice=config.mode==='solo'?true:document.querySelector('#practice')?.checked??config.practice;
 config.firstPlayer=Number(document.querySelector('#first-player')?.value??config.firstPlayer??0);
}
function start(){
 if(shuffleBusy.some(Boolean)||!begin(state))return;
 view='game';feedback='';persist();render();announce(`Bitva začíná. První vykládá ${name(expectedPlayer(state))}.`);window.scrollTo({top:0,behavior:'instant'});
}
function finishCompare(){resolve(state);persist();beep(state.phase==='tie'?'tie':'win');render();if(state.phase==='done')window.scrollTo({top:0,behavior:'instant'});announce(state.phase==='done'?'Partie skončila. Výsledek je nad herním stolem.':state.phase==='tie'?'Shoda. Následuje rozstřel.':`${name(state.result.winner)} získává ${state.result.count} ${state.result.count<5?'karty':'karet'}.`);}
app.addEventListener('click',e=>{
 const b=e.target.closest('button[data-action]');if(!b||b.disabled)return;
 const a=b.dataset.action;
 if(view==='setup'){
   if(['mode','pick-army','start'].includes(a))readNames();
   if(a==='mode'){config.mode=b.dataset.mode;if(config.mode==='solo')config.practice=true;render();}
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
 if(a==='flip'){
   const i=Number(b.dataset.player);if(state.config.mode==='solo'&&i===1)return;
   if(!reveal(state,i))return;
   beep();feedback='';
   if(state.phase==='compare'&&!state.config.practice&&state.config.mode==='duo')finishCompare();else{persist();render();if(state.phase==='compare')announce('Obě karty jsou vyložené. Určete, kdo má víc.');}
 }
 if(a==='answer'&&state.phase==='compare'){
   if(Number(b.dataset.answer)===comparison(state)){feedback='';finishCompare();}
   else {feedback=state.cards.includes(11)?'Patron porazí každé číslo. Dva patroni jsou stejně silní. Zkus to znovu.':'Zkus to ještě jednou. Hledej větší číslo; stejná čísla znamenají shodu.';document.querySelector('.feedback').textContent=feedback;}
 }
 if(a==='next'&&next(state)){persist();render();}
 if(a==='rematch'){config=structuredClone(state.config);prepare();}
 if(a==='new'){
   if(state.phase==='done'){config=structuredClone(state.config);clearSave();view='setup';render();}
   else modal('<h2 id="dialog-title">Změnit hru?</h2><p>Rozehraná partie zůstane uložená, dokud nezačneš novou.</p><button class="primary" data-dialog="setup" style="margin-top:20px">Zpět k výběru armád</button>');
 }
 if(a==='setup'){config=structuredClone(state.config);clearSave();view='setup';render();window.scrollTo({top:0,behavior:'instant'});}
});
app.addEventListener('change',e=>{
 if(view==='setup'&&e.target.matches('[data-army-select]')){readNames();const i=Number(e.target.dataset.armySelect),id=e.target.value;if(army(id)&&id!==config.armies[1-i])config.armies[i]=id;render();}
});
dialog.addEventListener('click',e=>{const pick=e.target.closest('[data-pick-army]');if(pick&&!pick.disabled){const i=Number(pick.dataset.player);config.armies[i]=pick.dataset.pickArmy;beep();dialog.close();render();return;}if(e.target.closest('[data-dialog="setup"]')){config=structuredClone(state.config);view='setup';dialog.close();render();}if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#rules').addEventListener('click',rules);
document.querySelector('#sound').addEventListener('click',e=>{sound=!sound;const b=e.currentTarget;b.setAttribute('aria-label',sound?'Vypnout zvuk':'Zapnout zvuk');b.title=b.getAttribute('aria-label');b.innerHTML=sound?'♪':'♪<span class="sound-off">×</span>';beep();});
render();
