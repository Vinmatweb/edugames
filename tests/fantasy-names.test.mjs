import {test} from 'node:test';
import assert from 'node:assert/strict';
import {patronName,normalizeNames,changeArmy} from '../public/fantasy-battle/patron-names.mjs';
test('old defaults become localized patrons and custom names survive army changes',()=>{
 const config={armies:['knights','orcs'],names:['Commander','Alice']};
 normalizeNames(config,'cs');assert.deepEqual(config.names,['Strážný anděl','Alice']);
 changeArmy(config,0,'elves','cs');assert.equal(config.names[0],'Elfí patronka');
 changeArmy(config,1,'dragons','cs');assert.equal(config.names[1],'Alice');
 normalizeNames(config,'en');assert.deepEqual(config.names,['Elven Queen','Alice']);
});
test('both players and Gamemaster get defaults; all armies have bilingual patrons',()=>{
 const c={armies:['dwarves','skeletons'],names:['','Gamemaster']};
 normalizeNames(c,'en');assert.deepEqual(c.names,['Mountain King','Skeleton King']);
 for(const id of ['knights','undead','orcs','goblins','fairies','dwarves','elves','dragons','skeletons']){
  assert.ok(patronName(id,'en'));assert.ok(patronName(id,'cs'));
 }
});
