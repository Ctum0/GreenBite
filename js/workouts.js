
const db = {
  'Full Body': {
    None:['Jumping Jacks','Bodyweight Squats','Push-ups','Mountain Climbers','Plank'],
    Dumbbells:['DB Squats','DB Rows','DB Press','DB RDL','DB Lunges'],
    Band:['Band Squats','Band Rows','Band Press','Band Pull-apart','Band Walks']
  },
  'Upper':{
    None:['Push-ups','Pike Push-ups','Superman','Tricep Dips','Plank Shoulder Taps'],
    Dumbbells:['DB Bench Press','DB Row','DB Curl','DB Overhead Press','DB Fly'],
    Band:['Band Row','Band Chest Press','Band Curl','Band Triceps Pushdown','Band Face Pull']
  },
  'Lower':{
    None:['Bodyweight Squats','Reverse Lunges','Glute Bridge','Wall Sit','Calf Raises'],
    Dumbbells:['DB Squats','DB Lunges','DB RDL','DB Step-ups','DB Calf Raises'],
    Band:['Band Squats','Band Good Morning','Band Lunges','Band Ham Curl','Band Walks']
  },
  'Core':{
    None:['Plank','Dead Bug','Bicycle Crunch','Side Plank','Leg Raises'],
    Dumbbells:['DB Russian Twist','DB Deadbug','DB Side Bend','DB Sit-ups','DB Hollow Hold'],
    Band:['Band Pallof Press','Band Woodchop','Band Twist','Band Deadbug','Band Plank']
  }
};

function generate(){
  const bp = document.getElementById('bodyPart').value;
  const eq = document.getElementById('equipment').value;
  const list = db[bp][eq];
  const picks = list.sort(()=>Math.random()-0.5).slice(0,5);
  const ol = document.getElementById('workoutList');
  ol.innerHTML = ''; picks.forEach((name,i)=>{
    const li = document.createElement('li'); li.textContent = name + ' — 30s';
    ol.appendChild(li);
  });
  return picks;
}

document.getElementById('generateBtn').addEventListener('click', generate);

let timer;
function beeper(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.type='sine'; o.frequency.value=880;
    g.gain.value=0.001; o.start();
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    o.stop(ctx.currentTime + 0.26);
  }catch(e){}
}

function format(s){ const m = Math.floor(s/60); const r = s%60; return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0') }

document.getElementById('startTimer').addEventListener('click', ()=>{
  const interval = Math.max(5, +document.getElementById('intervalSec').value||30);
  const rounds = Math.max(1, +document.getElementById('rounds').value||1);
  const plan = generate();
  let round = 1, idx = 0, remain = interval;
  const readout = document.getElementById('timerReadout');
  clearInterval(timer);
  beeper();
  timer = setInterval(()=>{
    readout.textContent = format(remain);
    remain--;
    if(remain < 0){
      beeper();
      idx++;
      if(idx >= plan.length){
        idx = 0; round++;
        if(round > rounds){ clearInterval(timer); readout.textContent = 'Done!'; return; }
      }
      remain = interval;
    }
  }, 1000);
});
