const config={businessName:'Mi Catálogo',whatsapp:'15551234567',logo:'',currency:'USD'};
const products=[
 {name:'Producto de ejemplo 1',price:19.99,category:'Destacados',image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 2',price:24.99,category:'Destacados',image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 3',price:14.99,category:'Novedades',image:'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 4',price:29.99,category:'Novedades',image:'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80'}
];
let activeCategory='Todos';
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:config.currency}).format(v);
const wa=(name)=>`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hola, me interesa ${name}. ¿Está disponible?`)}`;
function renderCategories(){const cats=['Todos',...new Set(products.map(p=>p.category))];document.querySelector('#categories').innerHTML=cats.map(c=>`<button class="category ${c===activeCategory?'active':''}" onclick="setCategory('${c.replaceAll("'","\\'")}')">${c}</button>`).join('')}
function renderProducts(){const q=document.querySelector('#search').value.toLowerCase().trim();const filtered=products.filter(p=>(activeCategory==='Todos'||p.category===activeCategory)&&(`${p.name} ${p.category}`).toLowerCase().includes(q));document.querySelector('#products').innerHTML=filtered.map(p=>`<article class="card"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="card-content"><span class="category-label">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><a class="buy" href="${wa(p.name)}" target="_blank" rel="noopener">💬 Comprar por WhatsApp</a></div></article>`).join('');document.querySelector('#empty').hidden=filtered.length>0}
function setCategory(c){activeCategory=c;renderCategories();renderProducts()}
function init(){document.title=config.businessName;document.querySelector('#businessName').textContent=config.businessName;document.querySelector('#footerName').textContent=config.businessName;const main=wa('este catálogo');document.querySelector('#mainWhatsapp').href=main;document.querySelector('#footerWhatsapp').href=main;if(config.logo){document.querySelector('#logo').innerHTML=`<img src="${config.logo}" alt="Logo">`}new QRCode(document.querySelector('#qrcode'),{text:location.href,width:140,height:140});renderCategories();renderProducts();document.querySelector('#search').addEventListener('input',renderProducts)}
init();
