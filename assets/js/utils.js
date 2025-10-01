/* CORE HELPERS (QS, QSA, READY) */
window.gb = (function(){
  const qs  = (sel, el=document) => el.querySelector(sel);
  const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* NAV MENU TOGGLE (MOBILE HAMBURGER) */
  function setupMenu(){
    const btn = qs('.hamburger'), menu = qs('#nav-menu');
    if(!btn || !menu) return;
    btn.addEventListener('click', ()=>{
      const exp = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!exp));
      menu.classList.toggle('open');
    });
  }

  /* FOOTER YEAR + NEWSLETTER SUBSCRIBE */
  /* - Inserts current year into #year and stores emails in localStorage */
  function footerBasics(){
    const year = qs('#year'); if (year) year.textContent = new Date().getFullYear();
    const form = qs('#newsletter-form'); if (!form) return;
    const email = qs('#newsletter-email') || form.querySelector('input[type="email"]');
    const status = qs('#newsletter-status');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!email || !email.validity.valid){ if(status) status.textContent='Enter a valid email.'; return; }
      let list = [];
      try { list = JSON.parse(localStorage.getItem('newsletter')) || []; } catch {}
      if(!list.includes(email.value)) list.push(email.value);
      try { localStorage.setItem('newsletter', JSON.stringify(list)); } catch {}
      if(status) status.textContent = 'Subscribed!';
      email.value = '';
    });
  }

  /* EXPORT API (MAKE HELPERS AVAILABLE GLOBALLY) */
  return { qs, qsa, ready, setupMenu, footerBasics };
})();

/* SERVICE WORKER REGISTER (ONLY ON HTTP(S) & NOT LOCALHOST) */
if ('serviceWorker' in navigator &&
    location.protocol.startsWith('http') &&
    !/^(localhost|127\.0\.0\.1)$/i.test(location.hostname)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}
