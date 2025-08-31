
function calcBMR({gender, weight, height, age}){
  weight = +weight; height = +height; age = +age;
  if(gender === 'Male') return 10*weight + 6.25*height - 5*age + 5;
  return 10*weight + 6.25*height - 5*age - 161;
}
function calcTDEE(bmr, factor){ return bmr * factor }
function macrosFromTDEE(tdee){
  const carbs = (tdee * 0.50) / 4;
  const protein = (tdee * 0.20) / 4;
  const fat = (tdee * 0.30) / 9;
  return {carbs, protein, fat};
}

const form = document.getElementById('calcForm');
const bmrEl = document.getElementById('bmrCounter');
const tdeeEl = document.getElementById('tdeeCounter');
const carbG = document.getElementById('carbG');
const proteinG = document.getElementById('proteinG');
const fatG = document.getElementById('fatG');
const bmrBar = document.getElementById('bmrBar');
const tdeeBar = document.getElementById('tdeeBar');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = document.getElementById('height').value;
  const weight = document.getElementById('weight').value;
  const activity = parseFloat(document.getElementById('activity').value);

  if(!age || !height || !weight){ alert('Please fill the form correctly.'); return; }

  const bmr = Math.round(calcBMR({gender, weight, height, age}));
  const tdee = Math.round(calcTDEE(bmr, activity));
  const {carbs, protein, fat} = macrosFromTDEE(tdee);

  animateNumber(bmrEl, bmr);
  animateNumber(tdeeEl, tdee);
  carbG.textContent = Math.round(carbs);
  proteinG.textContent = Math.round(protein);
  fatG.textContent = Math.round(fat);

  setBar(bmrBar, Math.min(100, bmr / 30));
  setBar(tdeeBar, Math.min(100, tdee / 40));
});
