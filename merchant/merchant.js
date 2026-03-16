// ShopBAM — Merchant Dashboard JS

// ===== DATA =====
const ORDERS = [
  { id:'ORD-1041', product:'Hand-knit Wool Scarf', emoji:'🧣', customer:'Alex J.', price:38, status:'new',   time:'2 min ago' },
  { id:'ORD-1040', product:'Linen Tote Bag',       emoji:'👜', customer:'Maria S.', price:29, status:'ready', time:'1 hr ago' },
  { id:'ORD-1039', product:'Hand-knit Wool Scarf', emoji:'🧣', customer:'Jordan T.', price:38, status:'done', time:'3 hr ago' },
  { id:'ORD-1038', product:'Straw Sun Hat',         emoji:'👒', customer:'Sam K.',   price:52, status:'done', time:'Yesterday' },
  { id:'ORD-1037', product:'Linen Tote Bag × 2',   emoji:'👜', customer:'Casey R.', price:58, status:'done', time:'Yesterday' },
  { id:'ORD-1036', product:'Leather Gloves',        emoji:'🧤', customer:'Dana M.',  price:64, status:'done', time:'2 days ago' },
  { id:'ORD-1035', product:'Woven Cardigan',        emoji:'🧥', customer:'Robin P.', price:89, status:'done', time:'2 days ago' },
];

let products = [
  { id:1, name:'Hand-knit Wool Scarf', emoji:'🧣', price:38, category:'clothing', stock:12, desc:'Cozy wool scarves handmade by local artisans.' },
  { id:2, name:'Linen Tote Bag',       emoji:'👜', price:29, category:'clothing', stock:2,  desc:'Natural linen tote, perfect for everyday use.' },
  { id:3, name:'Straw Sun Hat',         emoji:'👒', price:52, category:'clothing', stock:7,  desc:'Handwoven straw hat for sunny days.' },
  { id:4, name:'Leather Gloves',        emoji:'🧤', price:64, category:'clothing', stock:1,  desc:'Genuine leather gloves, warm and stylish.' },
  { id:5, name:'Woven Cardigan',        emoji:'🧥', price:89, category:'clothing', stock:5,  desc:'Locally woven cardigan in natural fibers.' },
];

const WEEK_DATA = [
  { day:'Mon', val:320 }, { day:'Tue', val:480 }, { day:'Wed', val:290 },
  { day:'Thu', val:610 }, { day:'Fri', val:540 }, { day:'Sat', val:780 }, { day:'Sun', val:420 }
];

let editingProductId = null;

// ===== VIEW SWITCHING =====
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');

  document.querySelectorAll('.nav-item[data-view]').forEach(n => {
    n.classList.toggle('active', n.dataset.view === name);
  });

  const titles = { dashboard:'Dashboard', orders:'Orders', inventory:'Inventory', profile:'Store profile' };
  document.getElementById('viewTitle').textContent = titles[name] || name;

  if (name === 'orders') renderOrders('all');
  if (name === 'inventory') renderProducts();
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2400);
}

// ===== CHART =====
function renderChart() {
  const chart = document.getElementById('salesChart');
  if (!chart) return;
  chart.innerHTML = '';
  const max = Math.max(...WEEK_DATA.map(d => d.val));
  const total = WEEK_DATA.reduce((s, d) => s + d.val, 0);
  document.getElementById('weekTotal').textContent = '$' + total.toLocaleString();

  WEEK_DATA.forEach(d => {
    const col = document.createElement('div');
    col.className = 'bar-col';
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.round((d.val / max) * 80) + 'px';
    bar.title = '$' + d.val;
    const lbl = document.createElement('div');
    lbl.className = 'bar-lbl';
    lbl.textContent = d.day;
    col.appendChild(bar);
    col.appendChild(lbl);
    chart.appendChild(col);
  });
}

// ===== ORDERS =====
function badgeHtml(status) {
  const map = { new:'badge-new', ready:'badge-ready', done:'badge-done' };
  const labels = { new:'New', ready:'Ready', done:'Done' };
  return `<span class="badge ${map[status]}">${labels[status]}</span>`;
}

function renderOrders(filter) {
  const list = document.getElementById('ordersList');
  if (!list) return;
  const filtered = filter === 'all' ? ORDERS : ORDERS.filter(o => o.status === filter);
  list.innerHTML = filtered.map(o => `
    <div class="order-item">
      <div class="order-emoji">${o.emoji}</div>
      <div class="order-info">
        <div class="order-name">${o.product}</div>
        <div class="order-meta">#${o.id} &middot; ${o.customer} &middot; ${o.time}</div>
      </div>
      <div class="order-right">
        <div class="order-price">$${o.price}</div>
        ${badgeHtml(o.status)}
      </div>
    </div>`).join('');
}

function renderDashOrders() {
  const el = document.getElementById('dashRecentOrders');
  if (!el) return;
  el.innerHTML = ORDERS.slice(0, 3).map(o => `
    <div class="order-item">
      <div class="order-emoji">${o.emoji}</div>
      <div class="order-info">
        <div class="order-name">${o.product}</div>
        <div class="order-meta">#${o.id} &middot; ${o.time}</div>
      </div>
      <div class="order-right">
        <div class="order-price">$${o.price}</div>
        ${badgeHtml(o.status)}
      </div>
    </div>`).join('');
}

// ===== PRODUCTS =====
function renderProducts() {
  const list = document.getElementById('productsList');
  const count = document.getElementById('productCount');
  if (!list) return;
  if (count) count.textContent = products.length + ' listed';

  list.innerHTML = products.map(p => `
    <div class="prod-item" data-id="${p.id}">
      <div class="prod-emoji">${p.emoji}</div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-meta">$${p.price} &middot;
          <span class="${p.stock <= 2 ? 'stock-low' : 'stock-ok'}">
            ${p.stock <= 2 ? p.stock + ' in stock — restock soon' : p.stock + ' in stock'}
          </span>
        </div>
      </div>
      <div class="prod-actions">
        <button class="icon-btn edit-btn" data-id="${p.id}" title="Edit">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>
        </button>
        <button class="icon-btn danger delete-btn" data-id="${p.id}" title="Delete">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><polyline points="3 5 13 5"/><path d="M6 5V3h4v2"/><path d="M4 5l1 9h6l1-9"/></svg>
        </button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditForm(parseInt(btn.dataset.id)));
  });
  list.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.id)));
  });
}

function openAddForm() {
  editingProductId = null;
  document.getElementById('formTitle').textContent = 'Add new product';
  document.getElementById('prodName').value = '';
  document.getElementById('prodPrice').value = '';
  document.getElementById('prodStock').value = '';
  document.getElementById('prodDesc').value = '';
  document.getElementById('productForm').style.display = 'block';
  document.getElementById('prodName').focus();
  showView('inventory');
}

function openEditForm(id) {
  const p = products.find(p => p.id === id);
  if (!p) return;
  editingProductId = id;
  document.getElementById('formTitle').textContent = 'Edit product';
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodDesc').value = p.desc;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('productForm').style.display = 'block';
  document.getElementById('productForm').scrollIntoView({ behavior:'smooth', block:'nearest' });
}

function closeForm() {
  document.getElementById('productForm').style.display = 'none';
  editingProductId = null;
}

function saveProduct() {
  const name  = document.getElementById('prodName').value.trim();
  const price = parseFloat(document.getElementById('prodPrice').value);
  const stock = parseInt(document.getElementById('prodStock').value);
  const desc  = document.getElementById('prodDesc').value.trim();
  const cat   = document.getElementById('prodCategory').value;

  if (!name || isNaN(price) || isNaN(stock)) {
    showToast('Please fill in all required fields');
    return;
  }

  const emojis = { clothing:'👕', food:'☕', home:'🪴', books:'📚', beauty:'✨', hardware:'🔧' };

  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx > -1) {
      products[idx] = { ...products[idx], name, price, stock, desc, category: cat };
      showToast('Product updated!');
    }
  } else {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    products.push({ id: newId, name, price, stock, desc, category: cat, emoji: emojis[cat] || '📦' });
    showToast('Product added!');
  }

  closeForm();
  renderProducts();
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  products = products.filter(p => p.id !== id);
  renderProducts();
  showToast('Product deleted');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {

  // Nav clicks
  document.querySelectorAll('.nav-item[data-view]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showView(el.dataset.view);
    });
  });

  // Panel "see all" links
  document.querySelectorAll('.panel-link[data-view]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showView(el.dataset.view);
    });
  });

  // Add product button
  document.getElementById('addProductBtn').addEventListener('click', openAddForm);

  // Form buttons
  document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
  document.getElementById('cancelFormBtn').addEventListener('click', closeForm);
  document.getElementById('closeFormBtn').addEventListener('click', closeForm);

  // Order filters
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderOrders(btn.dataset.filter);
    });
  });

  // Init dashboard
  renderChart();
  renderDashOrders();
});

// expose for inline onclick
window.showToast = showToast;
window.showView = showView;
