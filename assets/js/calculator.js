/* CALCULATOR: BMR + TDEE + MACROS */
(function(gb){
  /* CORE FORMULAS */
  function bmr({g,w,h,a}){ return g==='Male' ? 10*w + 6.25*h - 5*a + 5 : 10*w + 6.25*h - 5*a - 161; }
  function macros(tdee){ return { c: Math.round((tdee*0.50)/4), p: Math.round((tdee*0.20)/4), f: Math.round((tdee*0.30)/9) }; }

  /* INIT ON READY */
  gb.ready(()=>{
    gb.setupMenu();
    gb.footerBasics();

    /* DOM HOOKS */
    const form = gb.qs('#calc-form');
    const results = gb.qs('#results');

    /* SUBMIT HANDLER */
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const age = +gb.qs('#age').value;
      const g   = gb.qs('#gender').value;
      const h   = +gb.qs('#height').value;
      const w   = +gb.qs('#weight').value;
      const act = +gb.qs('#activity').value;
      if(!age || !h || !w || !act) return;

      /* CALCS */
      const B = Math.round(bmr({g,w,h,a:age}));
      const T = Math.round(B*act);

      /* SHOW RESULTS */
      results.classList.remove('hidden');
      gb.qs('#bmr').textContent  = B;
      gb.qs('#tdee').textContent = T;

      /* MACROS + BARS */
      const m = macros(T);
      gb.qs('#carb-g').textContent    = m.c + 'g';
      gb.qs('#protein-g').textContent = m.p + 'g';
      gb.qs('#fat-g').textContent     = m.f + 'g';

      gb.qs('#carb-bar').style.width   = '50%';
      gb.qs('#protein-bar').style.width= '20%';
      gb.qs('#fat-bar').style.width    = '30%';
    });
  });
})(window.gb);
