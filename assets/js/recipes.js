(function (gb) {
  const RECIPES = [
    { id:1, title:"Berry Oat Breakfast Bowl", 
      description:"Creamy oats with berries and seeds.",
      category:"Breakfast", 
      image:"assets/img/overnight-oats-1.webp",
      ingredients:["1/2 cup oats","1 cup milk","1/2 cup berries","1 tbsp chia seeds","Honey"],
      steps:["Cook oats in milk","Top with berries & chia","Drizzle honey"],
      nutrition:{ Calories:"320 kcal", Protein:"11 g", Carbs:"52 g", Fat:"8 g" } },

    { id:2, title:"Rainbow Quinoa Salad", 
      description:"Colorful salad with lemon dressing.",
      category:"Lunch", 
      image:"assets/img/Rainbow_Quino.webp",
      ingredients:["1 cup cooked quinoa","1/2 bell pepper","1/2 cucumber","Chickpeas","Lemon, oil, salt"],
      steps:["Chop veg","Mix all","Dress with lemon/oil"],
      nutrition:{ Calories:"410 kcal", Protein:"14 g", Carbs:"60 g", Fat:"12 g" } },

    { id:3, title:"Grilled Lemon Chicken", 
      description:"Juicy chicken marinated in lemon and herbs.",
      category:"Dinner", 
      image:"assets/img/lemon-grilled.webp",
      ingredients:["2 chicken breasts","1 lemon","1 tsp oregano","Salt & pepper"],
      steps:["Marinate 20 min","Grill 6–7 min/side","Rest and slice"],
      nutrition:{ Calories:"350 kcal", Protein:"45 g", Carbs:"3 g", Fat:"16 g" } },

    { id:4, title:"Quick Veggie Stir-Fry", 
      description:"Colorful veggies with garlic and light soy.",
      category:"Dinner", 
      image:"assets/img/veg-stir.webp",
      ingredients:["1 cup broccoli","1 bell pepper","1 small carrot","2 cloves garlic","1 tbsp soy sauce","1 tsp sesame oil","1 tsp olive oil"],
      steps:["Heat oil","Stir-fry veg 4–5 min","Add garlic & sauces 1 min","Serve"],
      nutrition:{ Calories:"280 kcal", Protein:"8 g", Carbs:"32 g", Fat:"14 g" } }
  ];

  const grid   = gb.qs("#recipe-grid");
  const modal  = gb.qs("#recipe-modal");
  const titleEl= gb.qs("#recipe-title");
  const descEl = gb.qs("#recipe-desc");
  const imgEl  = gb.qs("#recipe-img");
  const ingEl  = gb.qs("#recipe-ingredients");
  const stepsEl= gb.qs("#recipe-steps");
  const nutEl  = gb.qs("#recipe-nutrition");

  function card(r){
    return `<article class="recipe-card" tabindex="0" data-id="${r.id}">
      <img src="${r.image}" alt="${r.title}" loading="lazy" />
      <div class="recipe-body">
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <small class="pill">${r.category}</small>
      </div>
    </article>`;
  }

  function bindCards(){
    gb.qsa(".recipe-card", grid).forEach(el=>{
      const open = ()=> openModal(el.dataset.id);
      el.addEventListener("click", open);
      el.addEventListener("keydown", e=>{ if(e.key==="Enter") open(); });
    });
  }

  function render(list){
    grid.innerHTML = list.length ? list.map(card).join("") : `<div class="empty">No recipes match your search.</div>`;
    bindCards();
    grid.setAttribute("aria-busy","false");
  }

  function openModal(id){
    const r = RECIPES.find(x => String(x.id)===String(id));
    if(!r) return;
    titleEl.textContent = r.title;
    descEl.textContent  = r.description;
    imgEl.src = r.image; imgEl.alt = r.title;
    ingEl.innerHTML   = r.ingredients.map(i=>`<li>${i}</li>`).join("");
    stepsEl.innerHTML = r.steps.map(s=>`<li>${s}</li>`).join("");
    nutEl.innerHTML   = Object.entries(r.nutrition).map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join("");
    modal.hidden = false;
  }
  function closeModal(){ modal.hidden = true; }

  function applyFilters(){
    const q = (gb.qs("#search").value || "").toLowerCase();
    const c = gb.qs("#category").value;
    const list = RECIPES.filter(r =>
      (c==='all' || r.category===c) &&
      (r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
    );
    render(list);
  }

  gb.ready(()=>{
    gb.setupMenu();
    gb.footerBasics();
    render(RECIPES);
    gb.qs("#search").addEventListener("input", applyFilters);
    gb.qs("#category").addEventListener("change", applyFilters);
    gb.qs(".modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", e=>{ if(e.target===modal) closeModal(); });
    document.addEventListener("keydown", e=>{ if(!modal.hidden && e.key==="Escape") closeModal(); });
  });
})(window.gb);