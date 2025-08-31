
// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(console.warn);
  });
}

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const store = {
  get(key, fallback=null){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback }catch{return fallback}},
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)) }
};

// Mobile nav
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
if(hamburger){
  hamburger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.gap = '10px';
  });
}

// Newsletter localStorage
const newsletterForm = $('#newsletterForm');
if(newsletterForm){
  newsletterForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = $('#newsletterEmail').value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      alert('Please enter a valid email.');
      return;
    }
    const list = store.get('newsletter', []);
    if(!list.includes(email)) list.push(email);
    store.set('newsletter', list);
    newsletterForm.reset();
    alert('Subscribed! Stored locally.');
  });
}

// Reveal on scroll
const revealItems = $$('.reveal');
const onScroll = () => {
  const y = window.scrollY + window.innerHeight;
  revealItems.forEach(el => {
    if(el.offsetTop < y - 40) el.classList.add('visible');
  });
};
window.addEventListener('scroll', onScroll);
onScroll();

// Home: quotes ticker + daily tip
const quotes = [
  'Small steps, big changes.',
  'Eat real food, not too much.',
  'Move daily and breathe deeply.',
  'You don\'t need perfect, just consistent.',
  'Sleep is the best recovery tool.'
];
const tips = [
  'Add a fist of veggies to lunch.',
  'Carry a water bottle – sip every hour.',
  'Take a 10‑minute walk after meals.',
  'Swap sugary drinks for sparkling water.',
  'Plan tomorrow\'s breakfast tonight.'
];
const quoteTicker = $('#quoteTicker');
if(quoteTicker){
  let i = 0;
  setInterval(()=>{
    quoteTicker.textContent = quotes[i % quotes.length];
    i++;
  }, 3000);
  quoteTicker.textContent = quotes[0];
}
const dailyTip = $('#dailyTip');
if(dailyTip){
  const idx = new Date().getDate() % tips.length;
  dailyTip.textContent = tips[idx];
}

// Reusable counter animation
function animateNumber(el, to, ms=800){
  const start = performance.now();
  const from = 0;
  function step(t){
    const p = Math.min(1, (t - start)/ms);
    const val = Math.round(from + (to-from)*p);
    el.textContent = val.toLocaleString();
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Progress bar helper
function setBar(el, percent){
  el.style.width = Math.max(0, Math.min(100, percent)) + '%';
}
