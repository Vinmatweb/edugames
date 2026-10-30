import assert from 'node:assert/strict';
import {VALUES,createGame,shuffleDeck,begin,expectedPlayer,reveal,comparison,resolve,next,totals,valid} from '../public/fantasy-battle/engine.mjs';
const config={mode:'solo',armies:['knights','orcs'],names:['A','B'],practice:true};
function pair(s){assert.equal(reveal(s,0),true);assert.equal(reveal(s,0),false);assert.equal(reveal(s,1),true);}
function forced(a,b){const s=createGame(config);s.decks=[a,b];s.scores=[19-a.length,19-b.length];return s;}
assert.equal(VALUES.length,19);
let s=forced([11,1],[10,2]);pair(s);assert.equal(comparison(s),-1);resolve(s);assert.deepEqual(s.scores,[19,17]);assert.equal(s.phase,'resolved');
s=forced([8,3],[8,6]);pair(s);resolve(s);assert.equal(s.phase,'tie');assert.equal(s.pot,2);next(s);pair(s);resolve(s);assert.equal(s.history[1].won,4);assert.equal(s.phase,'done');assert.equal(totals(s)[1],21);
s=forced([11],[11]);pair(s);resolve(s);assert.equal(s.phase,'done');assert.equal(s.discarded,2);assert.equal(s.pot,0);assert.deepEqual(totals(s),[18,18]);
s=forced([5,9],[5]);pair(s);resolve(s);assert.equal(s.result.winner,0);assert.equal(s.scores[0],19);assert.deepEqual(totals(s),[20,18]);
s=forced([1,2,3],[1,2,3]);for(let i=0;i<3;i++){pair(s);resolve(s);if(i<2)assert.equal(next(s),true);}assert.equal(s.discarded,6);assert.equal(s.phase,'done');assert.equal(resolve(s),false);assert.equal(next(s),false);
let tieGames=0;
for(let i=0;i<1000;i++){
 s=createGame(config);assert.deepEqual([...s.decks[0]].sort((a,b)=>a-b),VALUES);assert.deepEqual([...s.decks[1]].sort((a,b)=>a-b),VALUES);let turns=0;
 while(s.phase!=='done'){
  assert.ok(valid(s));if(s.phase==='draw'){pair(s);assert.ok(valid(s));resolve(s);}else next(s);
  assert.ok(valid(s));if(++turns>40)throw Error('Endless game');
 }
 assert.equal(totals(s).reduce((a,b)=>a+b,0)+s.discarded,38);assert.equal(s.decks.flat().length,0);assert.ok(s.history.length<=19);assert.ok(valid(JSON.parse(JSON.stringify(s))));if(s.history.some(h=>h.relation===0))tieGames++;
}
console.log('Passed: patron, repeated ties, discarded final tie, exhaustion, duplicate actions, save/restore, 1,000 complete games. Games with ties:',tieGames);

// Preparation must randomize the real decks, preserve all values and keep that
// exact order when play starts. Every human deck has to be shuffled at least once.
const prep=createGame(config,{prepare:true});
assert.equal(prep.phase,'shuffle');assert.ok(valid(prep));
assert.equal(reveal(prep,0),false);assert.equal(begin(prep),false);
assert.equal(shuffleDeck(prep,2),false);
const before=[...prep.decks[0]];
assert.equal(shuffleDeck(prep,0,()=>0),true);
assert.notDeepEqual(prep.decks[0],before);assert.equal(prep.shuffles[0],1);
assert.equal(begin(prep),false);
for(let i=0;i<6;i++)assert.equal(shuffleDeck(prep,0,()=>.4),true);
assert.equal(prep.shuffles[0],7);
assert.equal(shuffleDeck(prep,1,()=>.2),true);
assert.deepEqual([...prep.decks[0]].sort((a,b)=>a-b),VALUES);
assert.deepEqual([...prep.decks[1]].sort((a,b)=>a-b),VALUES);
const finalDecks=structuredClone(prep.decks);
assert.equal(begin(prep),true);assert.deepEqual(prep.decks,finalDecks);
assert.equal(begin(prep),false);assert.equal(shuffleDeck(prep,0),false);
assert.ok(valid(JSON.parse(JSON.stringify(prep))));

// The chosen order is enforced by the engine for every round, including ties.
const ordered=forced([8,1,3],[8,2,4]);
ordered.config={...config,mode:'duo',firstPlayer:1};
assert.equal(expectedPlayer(ordered),1);assert.equal(reveal(ordered,0),false);
assert.equal(reveal(ordered,1),true);assert.equal(reveal(ordered,1),false);
assert.equal(expectedPlayer(ordered),0);assert.equal(reveal(ordered,0),true);
assert.equal(expectedPlayer(ordered),null);resolve(ordered);assert.equal(ordered.phase,'tie');next(ordered);
assert.equal(expectedPlayer(ordered),1);assert.equal(reveal(ordered,0),false);
reveal(ordered,1);reveal(ordered,0);resolve(ordered);next(ordered);
assert.equal(expectedPlayer(ordered),1);assert.equal(reveal(ordered,-1),false);
console.log('Passed: real unlimited shuffling, counters, readiness gates, preserved order at launch, both turn orders and tie turn order.');
