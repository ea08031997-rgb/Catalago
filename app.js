const config={businessName:'Lovely Girl',whatsapp:'584129368985',logo:'logo.svg',currency:'USD'};
const products=[
 {name:'Producto de ejemplo 1',price:19.99,category:'Maquillaje',image:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 2',price:24.99,category:'Cuidado facial',image:'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 3',price:14.99,category:'Labios',image:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80'},
 {name:'Producto de ejemplo 4',price:29.99,category:'Novedades',image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80'}
];
let activeCategory='Todos';
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:config.currency}).format(v);
const wa=(name)=>`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hola, me interesa ${name}. ¿Está disponible?`)}`;
function renderCategories(){const cats=['Todos',...new Set(products.map(p=>p.category))];document.querySelector('#categories').innerHTML=cats.map(c=>`<button class="category ${c===activeCategory?'active':''}" onclick="setCategory('${c.replaceAll("'","\\'")}')">${c}</button>`).join('')}
function renderProducts(){const q=document.querySelector('#search').value.toLowerCase().trim();const filtered=products.filter(p=>(activeCategory==='Todos'||p.category===activeCategory)&&(`${p.name} ${p.category}`).toLowerCase().includes(q));document.querySelector('#products').innerHTML=filtered.map(p=>`<article class="card"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="card-content"><span class="category-label">${p.category}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><a class="buy" href="${wa(p.name)}" target="_blank" rel="noopener">💬 Comprar por WhatsApp</a></div></article>`).join('');document.querySelector('#empty').hidden=filtered.length>0}
function setCategory(c){activeCategory=c;renderCategories();renderProducts()}
function init(){document.title=config.businessName;document.querySelector('#mainWhatsapp').href=wa('este catálogo');document.querySelector('#footerWhatsapp').href=wa('este catálogo');new QRCode(document.querySelector('#qrcode'),{text:location.href,width:140,height:140});renderCategories();renderProducts();document.querySelector('#search').addEventListener('input',renderProducts)}
init();
