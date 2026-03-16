// ShopBAM — Main JS (updated: product cards now link to product detail page)
document.addEventListener('DOMContentLoaded', () => {

  let activeCategory = 'all';

  // Render stores
  function renderStores() {
    const row = document.getElementById('storesRow');
    if (!row) return;
    row.innerHTML = '';
    STORES.forEach((store, i) => {
      const card = document.createElement('a');
      card.className = 'store-card';
      card.href = store.url;
      card.style.animationDelay = `${i * 60}ms`;
      card.innerHTML = `
        <div class="store-avatar" style="background:${store.avatarBg}">${store.emoji}</div>
        <div class="store-name">${store.name}</div>
        <div class="store-cat">${store.categoryLabel}</div>
        <div class="store-dist">${store.distance} away</div>
        <div class="store-rating">★ ${store.rating} (${store.reviews})</div>
      `;
      row.appendChild(card);
    });
  }

  // Build a product card element (clicking card goes to product detail, + button adds to cart)
  function buildProductCard(prod) {
    const card = document.createElement('div');
    card.className = 'prod-card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <a href="pages/product.html?id=${prod.id}" style="text-decoration:none;color:inherit;display:block;">
        <div class="prod-img" style="background:${prod.imgBg}">${prod.emoji}</div>
        <div class="prod-info">
          <div class="prod-name">${prod.name}</div>
          <div class="prod-store">${prod.store}</div>
          <div class="prod-bottom">
            <div class="prod-price-wrap">
              <div class="prod-price">$${prod.price}</div>
              <div class="prod-dist">${prod.distance}</div>
            </div>
          </div>
        </div>
      </a>
      <div style="padding:0 10px 12px;display:flex;justify-content:flex-end;margin-top:-36px;position:relative;z-index:1;">
        <button class="add-btn" data-id="${prod.id}" aria-label="Add to cart">+</button>
      </div>
    `;
    card.querySelector('.add-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      addToCart(parseInt(prod.id));
    });
    return card;
  }

  // Render products grid
  function renderProducts(cat = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    filtered.forEach((prod, i) => {
      const card = buildProductCard(prod);
      card.style.animationDelay = `${i * 50}ms`;
      grid.appendChild(card);
    });
  }

  // Category filter
  const catList = document.getElementById('catList');
  if (catList) {
    catList.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat');
      if (!btn) return;
      catList.querySelectorAll('.cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderProducts(activeCategory);
    });
  }

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) { renderProducts(activeCategory); return; }
      const grid = document.getElementById('productsGrid');
      if (!grid) return;
      grid.innerHTML = '';
      const results = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.store.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
      if (results.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px 0;color:var(--text-tertiary);font-size:14px;">No products found for "${e.target.value}"</div>`;
        return;
      }
      results.forEach(prod => grid.appendChild(buildProductCard(prod)));
    });
  }

  // Init
  renderStores();
  renderProducts();
  updateCartBadge();
});
