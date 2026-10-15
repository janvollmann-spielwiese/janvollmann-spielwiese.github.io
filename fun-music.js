/* Hintergrundmusik für die Fun-Games.
   Wird komplett im Browser erzeugt (Web Audio), ohne Musikdateien und ohne Gesang.
   Nutzung: FunMusic.start('sonnig' | 'ruhig' | 'landpartie'), FunMusic.stop() */
(function(){
'use strict';
var NOTE={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
function freq(n){ // z. B. 'C5', 'F#4', 'Bb3'
  var m=/^([A-G])([#b]?)(\d)$/.exec(n);if(!m)return 0;
  var s=NOTE[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)+(+m[3]+1)*12;
  return 440*Math.pow(2,(s-69)/12);
}
function bars(str){return str.trim().split(/\s+/).map(function(t){return t==='.'?null:t;});}

/* Jedes Stück: Tempo, Achtel-Schritte für Melodie, Bass und Akkorde (je 8 pro Takt). */
var TUNES={
  // fröhlich und flott, für den Waldlauf
  sonnig:{bpm:118,wave:'triangle',
    mel:bars('E5 . G5 . E5 D5 C5 .  D5 . G5 . D5 . B4 .  C5 . E5 . A5 G5 E5 .  F5 . A5 . G5 F5 E5 D5 '+
             'E5 G5 C6 . G5 E5 G5 .  D5 G5 B5 . A5 G5 D5 .  C5 E5 A5 . G5 E5 C5 .  F5 . A5 G5 F5 E5 D5 .'),
    bass:bars('C3 . . . G2 . . .  G2 . . . D3 . . .  A2 . . . E3 . . .  F2 . . . C3 . . . '+
              'C3 . . . G2 . . .  G2 . . . D3 . . .  A2 . . . E3 . . .  F2 . . . G2 . . .'),
    chords:[['C4','E4','G4'],['B3','D4','G4'],['A3','C4','E4'],['A3','C4','F4'],['C4','E4','G4'],['B3','D4','G4'],['A3','C4','E4'],['A3','C4','F4']],
    drums:true},
  // ruhig und freundlich, zum Rechnen und Puzzeln
  ruhig:{bpm:92,wave:'sine',
    mel:bars('A4 . C5 . F5 . . .  G4 . C5 . E5 . . .  A4 . D5 . F5 . E5 .  D5 . . . Bb4 . . . '+
             'C5 . F5 . A5 . G5 .  E5 . G5 . C5 . . .  D5 . F5 . A4 . D5 .  C5 . . . . . . .'),
    bass:bars('F2 . . . C3 . . .  C3 . . . G2 . . .  D3 . . . A2 . . .  Bb2 . . . F2 . . . '+
              'F2 . . . C3 . . .  C3 . . . G2 . . .  D3 . . . A2 . . .  Bb2 . . . C3 . . .'),
    chords:[['A3','C4','F4'],['G3','C4','E4'],['A3','D4','F4'],['Bb3','D4','F4'],['A3','C4','F4'],['G3','C4','E4'],['A3','D4','F4'],['Bb3','C4','E4']],
    drums:false},
  // beschwingt wie ein Landausflug, für den Jagdtag
  landpartie:{bpm:126,wave:'square',
    mel:bars('G4 B4 D5 . B4 . G4 .  F#4 A4 D5 . A4 . F#4 .  E4 G4 B4 . G4 B4 E5 .  C5 . E5 . D5 C5 B4 A4 '+
             'G4 B4 D5 G5 D5 . B4 .  A4 D5 F#5 . E5 D5 A4 .  B4 E5 G5 . F#5 E5 B4 .  C5 E5 D5 C5 B4 A4 G4 .'),
    bass:bars('G2 . D3 . G2 . D3 .  D3 . A2 . D3 . A2 .  E2 . B2 . E2 . B2 .  C3 . G2 . D3 . A2 . '+
              'G2 . D3 . G2 . D3 .  D3 . A2 . D3 . A2 .  E2 . B2 . E2 . B2 .  C3 . D3 . G2 . . .'),
    chords:[['B3','D4','G4'],['A3','D4','F#4'],['G3','B3','E4'],['G3','C4','E4'],['B3','D4','G4'],['A3','D4','F#4'],['G3','B3','E4'],['A3','C4','D4']],
    drums:true}
};

var ac=null,master=null,timer=null,tune=null,step=0,nextT=0,noiseBuf=null,current=null;
function ctx(){
  if(ac)return ac;
  var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;
  ac=new A();
  master=ac.createGain();master.gain.value=0;
  var lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=3200;
  master.connect(lp);lp.connect(ac.destination);
  var n=Math.floor(ac.sampleRate*.2);noiseBuf=ac.createBuffer(1,n,ac.sampleRate);var d=noiseBuf.getChannelData(0);for(var i=0;i<n;i++)d[i]=Math.random()*2-1;
  return ac;
}
function note(f,t,dur,type,vol){
  if(!f)return;
  var o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.015);g.gain.exponentialRampToValueAtTime(.0005,t+dur);
  o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05);
}
function hat(t,vol){var s=ac.createBufferSource();s.buffer=noiseBuf;var f=ac.createBiquadFilter();f.type='highpass';f.frequency.value=7000;var g=ac.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0005,t+.05);s.connect(f);f.connect(g);g.connect(master);s.start(t);s.stop(t+.06);}
function kick(t){var o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.connect(g);g.connect(master);o.start(t);o.stop(t+.16);}
function schedule(){
  var e=60/tune.bpm/2; // Achtelnote
  while(nextT<ac.currentTime+.25){
    var i=step%tune.mel.length,bar=Math.floor(i/8),inBar=i%8;
    // Melodie: Länge bis zur nächsten Note
    var m=tune.mel[i];
    if(m){var len=1;while(len<4&&!tune.mel[(i+len)%tune.mel.length])len++;note(freq(m),nextT,e*len*.95,tune.wave,tune.wave==='square'?.07:.16);}
    var b=tune.bass[i];if(b)note(freq(b),nextT,e*1.8,'triangle',.22);
    // weiche Akkord-Begleitung auf Zählzeit 2 und 4
    if(inBar===2||inBar===6){tune.chords[bar%tune.chords.length].forEach(function(c){note(freq(c),nextT,e*1.6,'sine',.045);});}
    if(tune.drums){if(inBar===0||inBar===4)kick(nextT);if(inBar%2===1)hat(nextT,.05);}
    nextT+=e;step++;
  }
}
var FunMusic={
  start:function(name){
    if(!ctx())return;
    if(ac.state==='suspended')ac.resume();
    if(current===name&&timer)return;
    this.stop(true);
    tune=TUNES[name]||TUNES.sonnig;current=name;step=0;nextT=ac.currentTime+.08;
    master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(.55,ac.currentTime+.6);
    timer=setInterval(schedule,60);schedule();
  },
  stop:function(quick){
    if(!ac)return;
    if(timer){clearInterval(timer);timer=null;}
    current=null;
    master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+(quick?.05:.3));
  },
  get playing(){return !!timer;}
};
// Im Hintergrund (anderer Tab, Bildschirm aus) pausieren, danach weiterspielen
var resumeName=null;
document.addEventListener('visibilitychange',function(){
  if(document.hidden){if(timer){resumeName=current;FunMusic.stop(true);}}
  else if(resumeName){FunMusic.start(resumeName);resumeName=null;}
});
window.FunMusic=FunMusic;
})();
