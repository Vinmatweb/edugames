export const VALUES = [1,1,1,2,2,2,3,3,3,4,4,5,5,6,7,8,9,10,11];
export function shuffled(random = Math.random, deck = VALUES) {
  const a = [...deck];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function createGame(config, {prepare=false} = {}) {
  return {version:1, config, decks:prepare?[[...VALUES],[...VALUES]]:[shuffled(),shuffled()], shuffles:prepare?[0,0]:[1,1], scores:[0,0], discarded:0, pot:0, round:1, duel:1, phase:prepare?'shuffle':'draw', cards:[null,null], revealed:[false,false], history:[], result:null};
}
export function shuffleDeck(s, player, random = Math.random) {
  if (s.phase !== 'shuffle' || ![0,1].includes(player)) return false;
  s.decks[player] = shuffled(random, s.decks[player]); s.shuffles[player]++;
  return true;
}
export function begin(s) {
  if (s.phase !== 'shuffle' || !s.shuffles.every(n=>n>0)) return false;
  s.phase='draw';
  return true;
}
export function expectedPlayer(s) {
  if (s.phase !== 'draw') return null;
  const first=s.config.mode==='solo'?0:s.config.firstPlayer===1?1:0;
  return !s.revealed[first]?first:!s.revealed[1-first]?1-first:null;
}
export function reveal(s, player) {
  if (s.phase !== 'draw' || expectedPlayer(s)!==player || !s.decks[player]?.length) return false;
  s.cards[player] = s.decks[player].shift(); s.revealed[player] = true; s.pot++;
  if (s.revealed.every(Boolean)) s.phase = 'compare';
  return true;
}
export function comparison(s) { return s.cards[0] === s.cards[1] ? 0 : s.cards[0] > s.cards[1] ? -1 : 1; }
export function resolve(s) {
  if (s.phase !== 'compare') return false;
  const relation = comparison(s);
  const record = {round:s.round, duel:s.duel, cards:[...s.cards], relation, won:0, winner:null, discarded:0};
  if (relation === 0) {
    const can = s.decks.map(d=>d.length>0);
    if (can[0] && can[1]) { s.phase='tie'; s.result={kind:'tie', count:s.pot}; }
    else if (can[0] || can[1]) {
      const w=can[0]?0:1; record.winner=w; record.won=s.pot; s.scores[w]+=s.pot; s.pot=0; s.phase='done'; s.result={kind:'win',winner:w,count:record.won};
    } else {
      record.discarded=s.pot; s.discarded+=s.pot; s.pot=0; s.phase='done'; s.result={kind:'discard',count:record.discarded};
    }
  } else {
    const w = relation === -1 ? 0 : 1; record.winner=w; record.won=s.pot; s.scores[w]+=s.pot; s.pot=0;
    s.phase=s.decks.every(d=>d.length>0)?'resolved':'done'; s.result={kind:'win',winner:w,count:record.won};
  }
  s.history.push(record);
  return true;
}
export function next(s) {
  if (!['resolved','tie'].includes(s.phase)) return false;
  if (s.phase==='resolved') {s.round++;s.duel=1;} else s.duel++;
  s.phase='draw';s.cards=[null,null];s.revealed=[false,false];s.result=null;
  return true;
}
export function totals(s) {return s.scores.map((n,i)=>n+s.decks[i].length);}
export function valid(s) {
  return s?.version===1 && ['shuffle','draw','compare','resolved','tie','done'].includes(s.phase) &&
    Array.isArray(s.decks) && s.decks.length===2 && s.decks.every(d=>Array.isArray(d)&&d.every(x=>VALUES.includes(x))) &&
    Array.isArray(s.scores) && s.scores.length===2 && s.scores.every(x=>Number.isInteger(x)&&x>=0) &&
    Number.isInteger(s.pot) && s.pot>=0 && Number.isInteger(s.discarded) && s.discarded>=0 &&
    s.decks.flat().length+s.scores[0]+s.scores[1]+s.pot+s.discarded===38 &&
    Array.isArray(s.history) && Array.isArray(s.cards) && s.cards.length===2 && Array.isArray(s.revealed) && s.revealed.length===2 && s.revealed.every(x=>typeof x==='boolean') &&
    (s.phase!=='shuffle'||(Array.isArray(s.shuffles)&&s.shuffles.length===2&&s.shuffles.every(n=>Number.isInteger(n)&&n>=0))) && s.config && ['solo','duo'].includes(s.config.mode);
}
