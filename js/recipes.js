
// Wrapped to prevent timing issues and global name collisions
(() => {
  document.addEventListener('DOMContentLoaded', () => {

    const RECIPE_DATA = [
      {
        id:'oats', title:'Overnight Oats', category:'Breakfast',
        img:'assets/OvernightOats.jpg',
        desc:'Creamy oats with chia seeds, Greek yogurt, and berries.',
        ingredients:[
          'Rolled oats – 1/2 cup',
          'Milk (or almond milk) – 1/2 cup',
          'Chia seeds – 1 tbsp',
          'Greek yogurt – 1/4 cup',
          'Blueberries – 1/2 cup',
          'Honey or maple syrup – 1 tsp'
        ],
        steps:[
          'In a jar, combine oats, chia seeds, and milk.',
          'Stir in yogurt and sweetener.',
          'Cover and refrigerate overnight.',
          'Top with fresh blueberries before serving.'
        ],
        nutrition:{Calories:380, Carbs:'52g', Protein:'18g', Fat:'9g'}
      },
      {
        id:'bowl', title:'Quinoa Buddha Bowl', category:'Lunch',
        img:'assets/QuinoaBuddhaBowl.jpg',
        desc:'Wholesome quinoa bowl with roasted vegetables, chickpeas, and tahini dressing.',
        ingredients:[
          'Cooked quinoa – 1 cup',
          'Roasted sweet potato – 1/2 cup',
          'Steamed broccoli – 1/2 cup',
          'Chickpeas – 1/2 cup',
          'Tahini – 1 tbsp',
          'Lemon juice – 1 tbsp',
          'Olive oil – 1 tsp'
        ],
        steps:[
          'Cook quinoa according to package instructions.',
          'Roast sweet potato cubes with olive oil until tender.',
          'Assemble bowl with quinoa, sweet potato, broccoli, and chickpeas.',
          'Whisk tahini with lemon juice, drizzle on top, and serve.'
        ],
        nutrition:{Calories:520, Carbs:'68g', Protein:'20g', Fat:'15g'}
      },
      {
        id:'stir', title:'Vegetable Stir-Fry', category:'Dinner',
        img:'assets/VegetableStirFry.png',
        desc:'Colorful vegetable stir-fry with ginger soy sauce.',
        ingredients:[
          'Mixed vegetables (broccoli, peppers, carrots) – 2 cups',
          'Garlic – 2 cloves, minced',
          'Fresh ginger – 1 tsp, grated',
          'Soy sauce – 2 tbsp',
          'Sesame oil – 1 tsp',
          'Cooked brown rice – 1 cup'
        ],
        steps:[
          'Heat sesame oil in a wok.',
          'Add garlic and ginger, sauté until fragrant.',
          'Stir-fry vegetables for 5 minutes.',
          'Add soy sauce, toss well.',
          'Serve hot over cooked brown rice.'
        ],
        nutrition:{Calories:450, Carbs:'72g', Protein:'14g', Fat:'9g'}
      },
      {
        id:'yog', title:'Greek Yogurt Parfait', category:'Snacks',
        img:'assets/GreekYogurtParfait.jpg',
        desc:'A quick snack with yogurt, granola, and fresh fruit.',
        ingredients:[
          'Greek yogurt – 1 cup',
          'Granola – 1/3 cup',
          'Strawberries – 1/2 cup, sliced',
          'Chia seeds – 1 tsp',
          'Honey – drizzle'
        ],
        steps:[
          'Spoon yogurt into a glass.',
          'Layer with granola and sliced strawberries.',
          'Sprinkle chia seeds on top.',
          'Drizzle with honey before serving.'
        ],
        nutrition:{Calories:310, Carbs:'40g', Protein:'16g', Fat:'8g'}
      },
      {
        id:'salad', title:'Mediterranean Chickpea Salad', category:'Dinner',
        img:'assets/MediterraneanChickpeaSalad.jpg',
        desc:'Refreshing salad with chickpeas, cucumber, tomatoes, and feta cheese.',
        ingredients:[
          'Chickpeas – 1 can (rinsed)',
          'Cherry tomatoes – 1 cup, halved',
          'Cucumber – 1 cup, diced',
          'Red onion – 1/4 cup, finely chopped',
          'Feta cheese – 1/4 cup, crumbled',
          'Olive oil – 2 tbsp',
          'Lemon juice – 2 tbsp',
          'Fresh parsley – 2 tbsp, chopped'
        ],
        steps:[
          'Combine chickpeas, tomatoes, cucumber, onion, and parsley in a bowl.',
          'Whisk olive oil and lemon juice for dressing.',
          'Toss salad with dressing.',
          'Top with crumbled feta before serving.'
        ],
        nutrition:{Calories:400, Carbs:'48g', Protein:'16g', Fat:'14g'}
      }
    ];

    const grid = document.getElementById('recipeGrid');
    const search = document.getElementById('recipeSearch');
    const category = document.getElementById('recipeCategory');

    function card(r){ 
      const div = document.createElement('div');
      div.className = 'card';
      div.tabIndex = 0;
      div.innerHTML = `
        <img src="${r.img}" alt="${r.title}" style="border-radius:12px">
        <h3>${r.title}</h3>
        <p class="badge">${r.category}</p>
        <p>${r.desc}</p>
      `;
      div.addEventListener('click', ()=>openModal(r));
      div.addEventListener('keypress', (e)=>{ if(e.key==='Enter') openModal(r) });
      return div;
    }

    function render(){
      const q = (search.value||'').toLowerCase();
      const cat = category.value;
      grid.innerHTML = '';
      RECIPE_DATA.filter(r => (cat==='all'||r.category===cat) && (r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)))
             .forEach(r => grid.appendChild(card(r)));
      if(!grid.children.length){
        const p = document.createElement('p'); p.textContent = 'No RECIPE_DATA found.'; grid.appendChild(p);
      }
    }
    search.addEventListener('input', render);
    category.addEventListener('change', render);
    render();

    // Modal
    const backdrop = document.getElementById('recipeModalBackdrop');
    const closeBtn = document.getElementById('closeRecipeModal');

    function openModal(r){
      document.getElementById('recipeTitle').textContent = r.title;
      document.getElementById('recipeImg').src = r.img;
      document.getElementById('recipeImg').alt = r.title;
      document.getElementById('recipeDesc').textContent = r.desc;
      const ing = document.getElementById('recipeIngredients');
      ing.innerHTML = ''; r.ingredients.forEach(i => { const li = document.createElement('li'); li.textContent=i; ing.appendChild(li); });
      const steps = document.getElementById('recipeSteps');
      steps.innerHTML=''; r.steps.forEach(s=>{ const li=document.createElement('li'); li.textContent=s; steps.appendChild(li); });
      const tbl = document.getElementById('recipeNutrition');
      tbl.innerHTML = '<tr><th>Nutrient</th><th>Amount</th></tr>' + Object.entries(r.nutrition).map(([k,v])=>'<tr><td>'+k+'</td><td>'+v+'</td></tr>').join('');
      backdrop.classList.add('show'); backdrop.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    closeBtn.addEventListener('click', ()=>{
      backdrop.classList.remove('show'); backdrop.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    });
    backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) closeBtn.click() });

  });
})();
