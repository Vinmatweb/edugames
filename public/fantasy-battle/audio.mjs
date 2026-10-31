// Quiet procedural foley and short instrument motifs; no downloaded audio or API.
export const ARMY_VOICES = {
  knights:   {tone:'bell', notes:[293.66,440,587.33], filter:3200},
  undead:    {tone:'breath',notes:[130.81,196,261.63], filter:620},
  orcs:      {tone:'drum', notes:[98,146.83,196], filter:700},
  goblins:   {tone:'wood', notes:[392,493.88,587.33], filter:1700},
  fairies:   {tone:'bell', notes:[659.25,880,1174.66], filter:5200},
  dwarves:   {tone:'metal',notes:[196,293.66,392], filter:2400},
  skeletons: {tone:'bone', notes:[349.23,440,523.25], filter:2600},
  elves:     {tone:'harp', notes:[329.63,493.88,659.25], filter:2900},
  dragons:   {tone:'breath',notes:[110,164.81,220], filter:420},
};
export class ArmyAudio {
  constructor(){this.enabled=false;this.ctx=null;this.noise=null;this.lastMiss=0;}
  unlock(){
    if(!this.enabled)return;
    try {
      this.ctx??=new (window.AudioContext||window.webkitAudioContext)();
      if(this.ctx.state==='suspended')void this.ctx.resume().catch(()=>{});
      if(!this.noise){this.noise=this.ctx.createBuffer(1,this.ctx.sampleRate,this.ctx.sampleRate);const d=this.noise.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}
    } catch {}
  }
  noiseHit(start,duration,volume,frequency,type='lowpass',sweep=0){
    const c=this.ctx;if(!c||!this.noise)return;
    const source=c.createBufferSource(),filter=c.createBiquadFilter(),gain=c.createGain();
    source.buffer=this.noise;filter.type=type;filter.frequency.setValueAtTime(frequency,start);filter.Q.value=.65;
    if(sweep)filter.frequency.exponentialRampToValueAtTime(sweep,start+duration);
    gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.012);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    source.connect(filter);filter.connect(gain);gain.connect(c.destination);source.start(start);source.stop(start+duration+.02);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
  }
  note(voice,hz,start,length=.32,volume=.035){
    const c=this.ctx;if(!c)return;
    const tone=voice.tone;
    const partials=tone==='bell'?[[1,1],[2.76,.18],[4.1,.05]]:tone==='metal'?[[1,1],[2.05,.2],[3.8,.09]]:[[1,1],[2,.13]];
    for(const [ratio,level] of partials){
      const o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
      o.type=tone==='harp'||tone==='wood'?'triangle':'sine';o.frequency.setValueAtTime(hz*ratio,start);
      if(tone==='drum')o.frequency.exponentialRampToValueAtTime(hz*ratio*.48,start+.15);
      f.type='lowpass';f.frequency.value=voice.filter;
      g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(volume*level,start+.009);g.gain.exponentialRampToValueAtTime(.0001,start+length);
      o.connect(f);f.connect(g);g.connect(c.destination);o.start(start);o.stop(start+length+.03);o.onended=()=>{o.disconnect();f.disconnect();g.disconnect();};
    }
    if(tone==='wood'||tone==='bone')this.noiseHit(start,.075,.027,tone==='bone'?2500:1250,'bandpass');
    if(tone==='drum')this.noiseHit(start,.17,.025,600);
    if(tone==='breath')this.noiseHit(start,.34,.025,voice.filter,'lowpass',voice.filter*2);
  }
  play(event,army='knights'){
    if(!this.enabled)return;
    this.unlock();if(!this.ctx||this.ctx.state!=='running')return;
    const v=ARMY_VOICES[army]||ARMY_VOICES.knights,t=this.ctx.currentTime+.012;
    if(event==='shuffle'){for(let i=0;i<5;i++)this.noiseHit(t+i*.09,.095,.035,1800+i*240,'bandpass');return;}
    if(event==='miss'){
      if(t-this.lastMiss<.15)return;this.lastMiss=t;
      this.noiseHit(t,.3,.065,4500,'bandpass',300);this.note(v,v.notes[0],t+.12,.13,.018);return;
    }
    if(event==='reveal'){this.noiseHit(t,.10,.03,1900,'bandpass');this.note(v,v.notes[0],t+.035,.22,.025);return;}
    if(event==='tie'){this.note(v,v.notes[1],t,.22,.028);this.note(v,v.notes[1],t+.14,.22,.025);return;}
    if(event==='win'){v.notes.forEach((hz,i)=>this.note(v,hz,t+i*.09,.36,.03));return;}
    if(event==='start'){this.note(v,v.notes[0],t,.22,.026);this.note(v,v.notes[2],t+.15,.36,.029);}
  }
}
