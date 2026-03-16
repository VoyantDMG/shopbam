// ShopBAM — Main JS
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

  // Render products
  function renderProducts(cat = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
    filtered.forEach((prod, i) => {
      const card = document.createElement('div');
      card.className = 'prod-card';
      card.style.animationDelay = `${i * 50}ms`;
      card.innerHTML = `
        <div class="prod-img" style="background:${prod.imgBg}">${prod.emoji}</div>
        <div class="prod-info">
          <div class="prod-name">${prod.name}</div>
          <div class="prod-store">${prod.store}</div>
          <div class="prod-bottom">
            <div class="prod-price-wrap">
              <div class="prod-price">$${prod.price}</div>
              <div class="prod-dist">${prod.distance}</div>
            </div>
            <button class="add-btn" data-id="${prod.id}" aria-label="Add to cart">+</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    // Add to cart listeners
    grid.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(parseInt(btn.dataset.id));
      });
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
      results.forEach((prod, i) => {
        const card = document.createElement('div');
        card.className = 'prod-card';
        card.innerHTML = `
          <div class="prod-img" style="background:${prod.imgBg}">${prod.emoji}</div>
          <div class="prod-info">
            <div class="prod-name">${prod.name}</div>
            <div class="prod-store">${prod.store}</div>
            <div class="prod-bottom">
              <div class="prod-price-wrap">
                <div class="prod-price">$${prod.price}</div>
                <div class="prod-dist">${prod.distance}</div>
              </div>
              <button class="add-btn" data-id="${prod.id}" aria-label="Add to cart">+</button>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
      grid.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart(parseInt(btn.dataset.id));
        });
      });
    });
  }

  // Init
  renderStores();
  renderProducts();
  updateCartBadge();
});
