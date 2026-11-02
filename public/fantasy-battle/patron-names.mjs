const patrons={
 knights:['Guardian Angel','Strážný anděl'],undead:['Necromancer','Nekromancer'],
 orcs:['Orc Chieftain','Orčí náčelník'],goblins:['Goblin Shaman','Gobliní šaman'],
 fairies:['Emerald Queen','Smaragdová královna'],dwarves:['Mountain King','Král pod horou'],
 elves:['Elven Queen','Elfí patronka'],dragons:['Dragon Patron','Dračí patron'],skeletons:['Skeleton King','Král kostlivců']
};
export const patronName=(id,locale='en')=>patrons[id]?.[locale==='cs'?1:0]||'';
export function isDefaultName(name,id){return !name?.trim()||['Commander','Velitel','Player 1','Player 2','Hráč 1','Hráč 2','Gamemaster',...(patrons[id]||[])].includes(name.trim());}
export function normalizeNames(config,locale){config.names=config.armies.map((id,i)=>isDefaultName(config.names?.[i],id)?patronName(id,locale):config.names[i]);return config;}
export function changeArmy(config,i,id,locale){const automatic=isDefaultName(config.names[i],config.armies[i]);config.armies[i]=id;if(automatic)config.names[i]=patronName(id,locale);}
