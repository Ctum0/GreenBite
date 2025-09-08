(function(gb){
  const DATA = [
    { name:"Bodyweight Squats", 
      body:"Legs", 
      equip:"None", 
      desc:"Sit back, chest up, knees track toes." },
    { name:"Lunges", 
      body:"Legs", 
      equip:"None", 
      desc:"Long step, both knees at 90°." },
    { name:"Glute Bridge", 
      body:"Legs", 
      equip:"None", 
      desc:"Squeeze glutes at the top." },
    { name:"Push-ups", 
      body:"Arms", 
      equip:"None", 
      desc:"Straight line from head to heels." },
    { name:"Plank", 
      body:"Core", 
      equip:"None", 
      desc:"Elbows under shoulders, brace core." },
    { name:"Dead Bug", 
      body:"Core", 
      equip:"None", 
      desc:"Opposite arm/leg extend slowly." },
    { name:"Burpees", 
      body:"Full Body", 
      equip:"None", 
      desc:"Full-body conditioning move." },
    { name:"Dumbbell Rows", 
      body:"Arms", 
      equip:"Dumbbells", 
      desc:"Flat back, pull to ribs." },
    { name:"Dumbbell Thrusters", 
      body:"Full Body", 
      equip:"Dumbbells", 
      desc:"Squat to overhead press." },
    { name:"Band Pull-Aparts", 
      body:"Arms", 
      equip:"Band", 
      desc:"Squeeze shoulder blades." },
    { name:"Band Squats", 
      body:"Legs", 
      equip:"Band", 
      desc:"Band above knees, push them out." }
  ];

  const qs = gb.qs;
  function sample(arr, k){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a.slice(0, Math.min(k,a.length)); }

  function render(list){
    if(!list.length){ qs('#plan').innerHTML = `<div class="empty">No workouts match these filters.</div>`; return; }
    qs('#plan').innerHTML = `<div class="workouts">` + list.map((w,i)=>`
      <article class="workout-card">
        <h3>${i+1}. ${w.name}</h3>
        <p>${w.desc}</p>
        <small class="pill"><span>${w.body}</span> · <span>${w.equip}</span></small>
      </article>`).join('') + `</div>`;
  }

  function generate(){
    const body = qs('#body').value, equip = qs('#equip').value;
    const pool = DATA.filter(w=>{
      const bOk = (body==='Full Body') || (w.body===body) || (w.body==='Full Body');
      const eOk = (equip==='None') ? (w.equip==='None') : (w.equip===equip);
      return bOk && eOk;
    });
    render(sample(pool,5));
  }

  // Timer
  let running=false, remain=30, id=null;
  function fmt(s){ const m=Math.floor(s/60).toString().padStart(2,'0'); const ss=(s%60).toString().padStart(2,'0'); return `${m}:${ss}`; }
  function display(){ qs('#countdown').textContent = fmt(remain); }
  function chime(){ const a=document.querySelector('#chime'); if(a){ try{ a.currentTime=0; a.play(); }catch{} } }
  function start(){
    if(running) return;
    running=true; remain = Math.max(5, Math.min(180, +qs('#seconds').value || 30));
    display();
    id = setInterval(()=>{
      remain--;
      if(remain<=0){ chime(); remain = Math.max(5, Math.min(180, +qs('#seconds').value || 30)); }
      display();
    },1000);
  }
  function pause(){ running=false; clearInterval(id); id=null; }
  function reset(){ pause(); remain = Math.max(5, Math.min(180, +qs('#seconds').value || 30)); display(); }

  gb.ready(()=>{
    gb.setupMenu(); gb.footerBasics();
    qs('#plan').innerHTML = `<div class="empty">Choose a <b>Body part</b> and <b>Equipment</b>, then press <b>Generate Plan</b>.</div>`;
    qs('#workout-form').addEventListener('submit', e=>{ e.preventDefault(); generate(); });
    qs('#start').addEventListener('click', start);
    qs('#pause').addEventListener('click', pause);
    qs('#reset').addEventListener('click', reset);
    qs('#seconds').addEventListener('change', ()=>{ if(!running){ remain=+qs('#seconds').value||30; display(); } });
    display();
  });
})(window.gb);