/* CONTACT PAGE: SIMPLE FORM HANDLER */
(function(gb){
  /* INIT ON READY */
  gb.ready(()=>{
    gb.setupMenu(); gb.footerBasics();

    /* DOM HOOKS */
    const form=gb.qs('#contact-form');
    const status=gb.qs('#contact-status');
    const name=gb.qs('#name'), email=gb.qs('#email'), subj=gb.qs('#subject'), msg=gb.qs('#message');

    /* SUBMIT HANDLER (VALIDATE + MOCK SEND) */
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }

      /* SUCCESS FEEDBACK */
      status.textContent='Message sent. Thank you!';
      status.style.color='var(--brand)';

      /* CLEAR FIELDS */
      name.value=''; email.value=''; subj.value=''; msg.value='';

      /* AUTO-HIDE STATUS */
      setTimeout(()=>{ status.textContent=''; },3000);
    });
  });
})(window.gb);
