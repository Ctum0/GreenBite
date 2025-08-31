
const circle = document.getElementById('breathCircle');
const cue = document.getElementById('breathCue');
const startBreath = document.getElementById('startBreath');

startBreath.addEventListener('click', ()=>{
  let phase = 0; // 0 inhale (4s), 1 hold (2s), 2 exhale (4s), 3 hold (2s)
  let remain = 4;
  cue.textContent = 'Inhale';
  circle.style.transition = 'transform 4s ease-in-out, filter 4s ease-in-out';
  circle.style.transform = 'scale(1.2)';
  circle.style.filter = 'blur(2px)';
  const t = setInterval(()=>{
    remain--;
    if(remain<=0){
      phase = (phase+1)%4;
      if(phase===0){ cue.textContent='Inhale'; remain=4; circle.style.transform='scale(1.2)'; circle.style.filter='blur(2px)' }
      if(phase===1){ cue.textContent='Hold'; remain=2 }
      if(phase===2){ cue.textContent='Exhale'; remain=4; circle.style.transform='scale(0.9)'; circle.style.filter='blur(6px)' }
      if(phase===3){ cue.textContent='Hold'; remain=2 }
    }
  }, 1000);
  setTimeout(()=>clearInterval(t), 4*60*1000); // auto-stop after ~4 minutes
});

// Meditation timer
const medBtn = document.getElementById('startMeditation');
const medReadout = document.getElementById('medReadout');
const minutesInput = document.getElementById('medMinutes');
const soundSel = document.getElementById('ambientSound');
const sessionCount = document.getElementById('sessionCount');
let medTimer, audio;

function setReadout(s){ const m = Math.floor(s/60); const r = s%60; medReadout.textContent = String(m).padStart(2,'0')+':'+String(r).padStart(2,'0') }

function playAmbient(kind){
  stopAmbient();
  if(kind==='none') return;
  const ctx = new (window.AudioContext||window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = kind==='rain' ? 'triangle' : 'sine';
  o.frequency.value = kind==='rain' ? 200 : 440;
  g.gain.value = 0.03;
  o.start();
  audio = {ctx,o,g};
}
function stopAmbient(){
  if(audio){
    const {ctx,o,g} = audio;
    try{ g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3); o.stop(ctx.currentTime + 0.35) }catch(e){}
    audio = null;
  }
}

medBtn.addEventListener('click', ()=>{
  const mins = Math.max(1, +minutesInput.value||1);
  let s = mins*60;
  clearInterval(medTimer);
  playAmbient(soundSel.value);
  medTimer = setInterval(()=>{
    setReadout(s);
    s--;
    if(s<0){
      clearInterval(medTimer);
      stopAmbient();
      alert('Session complete!');
      const n = (store.get('sessions',0) || 0) + 1;
      store.set('sessions', n);
      sessionCount.textContent = 'Completed sessions: ' + n;
    }
  }, 1000);
});

// Load completed sessions
sessionCount.textContent = 'Completed sessions: ' + (store.get('sessions',0) || 0);
