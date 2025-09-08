(function(gb){
  const phases=["Inhale","Hold","Exhale","Hold"];
  let bRun=false, bT=null, idx=0, left=4;
  function setPrompt(t){ gb.qs('#breath-prompt').textContent = t; }
  function tick(){
    if(!bRun) return;
    const sec=Math.max(2, Math.min(10, +gb.qs('#phase').value||4));
    if(left<=0){
      idx=(idx+1)%phases.length; left=sec;
      const c=gb.qs('#breath-circle');
      (phases[idx]==='Hold') ? c.classList.remove('breathing') : c.classList.add('breathing');
    }
    setPrompt(`${phases[idx]}… ${left}s`);
    left--; bT=setTimeout(tick,1000);
  }
  function bStart(){ if(bRun) return; bRun=true; const sec=Math.max(2, Math.min(10, +gb.qs('#phase').value||4)); idx=0; left=sec; gb.qs('#breath-circle').classList.add('breathing'); tick(); }
  function bPause(){ bRun=false; clearTimeout(bT); }
  function bReset(){ bRun=false; clearTimeout(bT); const sec=Math.max(2, Math.min(10, +gb.qs('#phase').value||4)); idx=0; left=sec; gb.qs('#breath-circle').classList.remove('breathing'); setPrompt('Press start to begin.'); }

  let id=null, remain=25*60;
  function fmt(s){ const m=Math.floor(s/60).toString().padStart(2,'0'); const ss=(s%60).toString().padStart(2,'0'); return `${m}:${ss}`; }
  function show(){ gb.qs('#focus-display').textContent = fmt(remain); }
  function chime(){ const a=document.querySelector('#chime'); if(a){ try{ a.currentTime=0; a.play(); }catch{} } }
  function fStart(){ if(id) return; const m=Math.max(1, Math.min(120, +gb.qs('#focus-mins').value||25)); remain=m*60; show(); id=setInterval(()=>{ remain--; show(); if(remain<=0){ clearInterval(id); id=null; chime(); } },1000); }
  function fPause(){ clearInterval(id); id=null; }
  function fReset(){ fPause(); const m=Math.max(1, Math.min(120, +gb.qs('#focus-mins').value||25)); remain=m*60; show(); }

  gb.ready(()=>{
    gb.setupMenu(); gb.footerBasics();
    gb.qs('#breath-start').addEventListener('click', bStart);
    gb.qs('#breath-pause').addEventListener('click', bPause);
    gb.qs('#breath-reset').addEventListener('click', bReset);
    gb.qs('#focus-start').addEventListener('click', fStart);
    gb.qs('#focus-pause').addEventListener('click', fPause);
    gb.qs('#focus-reset').addEventListener('click', fReset);
    const pc = gb.qs('#play-chime'); if(pc){ pc.addEventListener('click', chime); }
    bReset(); const m=+gb.qs('#focus-mins').value||25; remain=m*60; show();
  });
})(window.gb);