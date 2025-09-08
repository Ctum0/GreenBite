(function(gb){
  gb.ready(()=>{
    gb.setupMenu(); gb.footerBasics();
    const form=gb.qs('#contact-form');
    const status=gb.qs('#contact-status');
    const name=gb.qs('#name'), email=gb.qs('#email'), subj=gb.qs('#subject'), msg=gb.qs('#message');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!form.checkValidity()){ form.reportValidity(); return; }
      status.textContent='Message sent. Thank you!';
      status.style.color='var(--brand)';
      name.value=''; email.value=''; subj.value=''; msg.value='';
      setTimeout(()=>{ status.textContent=''; },3000);
    });
  });
})(window.gb);