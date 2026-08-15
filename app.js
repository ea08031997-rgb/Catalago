const config={businessName:'Lovely Girl',whatsapp:'584129368985',logo:'logo.svg',currency:'USD'};

// Las imágenes están actualmente en la raíz del repositorio.
const products=[
{name:'Primer Hidratante',brand:'Dolce Bella',price:9.50,category:'Preparación de rostro',image:'DOLCE_BELLA_Primer_Hidratante.png'},
{name:'Primer Facial Sin Aceite',brand:'Dolce Bella',price:12.40,category:'Preparación de rostro',image:'DOLCE_BELLA_Primer_Facial_Sin_Aceite.png'},
{name:'Bases Profesionales',brand:'Dolce Bella',price:null,category:'Rostro',image:'DOLCE_BELLA_Bases_Profesionales.png'},
{name:'Polvo Compacto',brand:'Dolce Bella',price:6.00,category:'Rostro',image:'DOLCE_BELLA_Polvo_Compacto.png'},
{name:'Gradient Blush',brand:'Dolce Bella',price:5.80,category:'Rostro',image:'DOLCE_BELLA_Gradient_Blush.png'},
{name:'Blush Horneado',brand:'Dolce Bella',price:null,category:'Rostro',image:'DOLCE_BELLA_Blush_Horneado.png'},
{name:'Máscara Pestañas Infinitas',brand:'Dolce Bella',price:5.00,category:'Ojos',image:'DOLCE_BELLA_Mascara_Pestanas_Pestanas_Infinitas.png'},
{name:'Lip Gloss Collection',brand:'Dolce Bella',price:3.50,category:'Labios',image:'DOLCE_BELLA_Lip_Gloss_Collection.png'},
{name:'Polvo Compacto Doble Función',brand:'Salome Makeup',price:5.50,category:'Rostro',image:'SALOME_MAKEUP_Polvo_Compacto_Doble_Funcion.png'},
{name:'Corrector Alta Cobertura',brand:'Salome Makeup',price:5.00,category:'Rostro',image:'SALOME_MAKEUP_Corrector_Alta_Cobertura.png'},
{name:'Impact Lashes Mascara Water Resistant',brand:'Salome Makeup',price:5.00,category:'Ojos',image:'SALOME_MAKEUP_Impact_Lashes_Mascara_Water_Resistant.png'},
{name:'Matte Pencil Lipstick',brand:'Salome Makeup',price:2.80,category:'Labios',image:'SALOME_MAKEUP_Matte_Pencil_Lipstick.png'},
{name:'Aceite Labial Mágico',brand:'Salome Makeup',price:3.70,category:'Labios',image:'SALOME_MAKEUP_Aceite_Labial_Magico.png'},
{name:'Velvet Liquid Lipstick',brand:'Salome Makeup',price:3.70,category:'Labios',image:'SALOME_MAKEUP_Velvet_Liquid_Lipstick.png'},
{name:'Long Last Fixing Spray',brand:'Salome Makeup',price:8.00,category:'Fijación',image:'SALOME_MAKEUP_Long_Last_Fixing_Spray.png'},
{name:'Rubor en Crema Líquida',brand:'Elegant',price:8.00,category:'Rostro',image:'ELEGANT_Rubor_En_Crema_Liquida.png'},
{name:'Liquid Eyeliner',brand:'Black',price:4.00,category:'Ojos',image:'BLACK_Liquid_Eyeliner.png'},
{name:'Corrector Líquido',brand:'Lancôme',price:null,category:'Rostro',image:'LANCOME_Corrector_Liquido.png'}
];

let activeCategory='Todos';
const money=v=>v===null?'Consultar precio':new Intl.NumberFormat('en-US',{style:'currency',currency:config.currency}).format(v);
const wa=name=>`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hola, me interesa ${name}. ¿Está disponible?`)}`;

function renderCategories(){
  const cats=['Todos',...new Set(products.map(p=>p.category))];
  document.querySelector('#categories').innerHTML=cats.map(c=>`<button class="category ${c===activeCategory?'active':''}" onclick="setCategory('${c.replaceAll("'","\\'")}')">${c}</button>`).join('');
}

function renderProducts(){
  const q=document.querySelector('#search').value.toLowerCase().trim();
  const filtered=products.filter(p=>(activeCategory==='Todos'||p.category===activeCategory)&&(`${p.name} ${p.brand} ${p.category}`).toLowerCase().includes(q));
  document.querySelector('#products').innerHTML=filtered.map(p=>`<article class="card"><img src="${p.image}" alt="${p.name} — ${p.brand}" loading="lazy" onerror="this.onerror=null;this.alt='Imagen no disponible: ${p.name}';this.style.opacity='.35'"><div class="card-content"><span class="category-label">${p.brand} · ${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><a class="buy" href="${wa(p.name)}" target="_blank" rel="noopener">💬 Comprar por WhatsApp</a></div></article>`).join('');
  document.querySelector('#empty').hidden=filtered.length>0;
}

function setCategory(c){activeCategory=c;renderCategories();renderProducts();}

function init(){
  document.title=config.businessName;
  document.querySelector('#mainWhatsapp').href=wa('este catálogo');
  document.querySelector('#footerWhatsapp').href=wa('este catálogo');
  if(typeof QRCode!=='undefined') new QRCode(document.querySelector('#qrcode'),{text:location.href,width:140,height:140});
  renderCategories();
  renderProducts();
  document.querySelector('#search').addEventListener('input',renderProducts);
}

init();
