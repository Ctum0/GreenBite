
const faqData = [
  {q:'Is there a mobile app?', a:'This is a web app; you can install it via the browser because it is a PWA.'},
  {q:'Do I need equipment?', a:'No. We include bodyweight options for all plans.'},
  {q:'How accurate is the calculator?', a:'It uses the Mifflin‑St Jeor equation and activity multipliers for estimates.'}
];

const faq = document.getElementById('faq');
faqData.forEach(item=>{
  const box = document.createElement('div');
  box.className='accordion-item';
  box.innerHTML = '<div class="accordion-header">'+item.q+'</div><div class="accordion-content">'+item.a+'</div>';
  box.querySelector('.accordion-header').addEventListener('click', ()=> box.classList.toggle('open'));
  faq.appendChild(box);
});

const contactForm = document.getElementById('contactForm');
const statusEl = document.getElementById('contactStatus');
contactForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();
  if(name.length < 2){ alert('Name looks too short.'); return; }
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ alert('Please enter a valid email.'); return; }
  if(message.length < 10){ alert('Message needs at least 10 characters.'); return; }
  const feedback = store.get('feedback', []);
  feedback.push({name,email,message, date:new Date().toISOString()});
  store.set('feedback', feedback);
  statusEl.textContent = 'Thanks! Your feedback was saved locally.';
  statusEl.style.display = 'block';
  contactForm.reset();
});
