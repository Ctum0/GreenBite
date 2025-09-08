(function(gb){
  const slogans = [
    "Healthy body, happy mind.",
    "Small steps, big changes.",
    "Eat well. Move more. Stress less.",
    "Consistency beats intensity."
  ];
  const tips = [
    "Fill half your plate with veggies today.",
    "Carry a water bottle—aim for 6–8 glasses.",
    "Take a 10-minute walk after meals.",
    "Swap sugary drinks for water or tea.",
    "Stretch for 5 minutes after you wake."
  ];

  gb.ready(()=>{
    gb.setupMenu();
    gb.footerBasics();

    const h = gb.qs('#slogan');
    let i = 0;
    setInterval(()=>{ i=(i+1)%slogans.length; if(h) h.textContent = slogans[i]; }, 4000);

    const d = new Date();
    const tip = tips[(d.getFullYear()+d.getMonth()+d.getDate()) % tips.length];
    const tipEl = gb.qs('#tip'); if(tipEl) tipEl.textContent = tip;
  });
})(window.gb);