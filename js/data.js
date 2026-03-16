// ShopBAM — Sample Data
const STORES = [
  {
    id: 1,
    name: "Clover Goods",
    category: "clothing",
    categoryLabel: "Clothing & Accessories",
    emoji: "👜",
    avatarBg: "#FAECE7",
    distance: "0.3 mi",
    rating: 4.8,
    reviews: 124,
    address: "214 W 2nd St, Austin TX",
    url: "pages/store.html?id=1"
  },
  {
    id: 2,
    name: "Page & Spine",
    category: "books",
    categoryLabel: "Books & Stationery",
    emoji: "📚",
    avatarBg: "#E1F5EE",
    distance: "0.5 mi",
    rating: 4.9,
    reviews: 87,
    address: "408 Congress Ave, Austin TX",
    url: "pages/store.html?id=2"
  },
  {
    id: 3,
    name: "Roots & Co.",
    category: "home",
    categoryLabel: "Home & Garden",
    emoji: "🪴",
    avatarBg: "#EAF3DE",
    distance: "0.7 mi",
    rating: 4.7,
    reviews: 63,
    address: "512 S Lamar Blvd, Austin TX",
    url: "pages/store.html?id=3"
  },
  {
    id: 4,
    name: "Brew & Barrel",
    category: "food",
    categoryLabel: "Food & Drink",
    emoji: "☕",
    avatarBg: "#E6F1FB",
    distance: "0.9 mi",
    rating: 4.6,
    reviews: 201,
    address: "610 E 6th St, Austin TX",
    url: "pages/store.html?id=4"
  },
  {
    id: 5,
    name: "Luminary Beauty",
    category: "beauty",
    categoryLabel: "Beauty & Wellness",
    emoji: "✨",
    avatarBg: "#FBEAF0",
    distance: "1.1 mi",
    rating: 4.8,
    reviews: 55,
    address: "720 N Loop, Austin TX",
    url: "pages/store.html?id=5"
  }
];

const PRODUCTS = [
  {
    id: 101,
    name: "Hand-knit Wool Scarf",
    store: "Clover Goods",
    storeId: 1,
    category: "clothing",
    price: 38,
    distance: "0.3 mi",
    emoji: "🧣",
    imgBg: "#FAECE7"
  },
  {
    id: 102,
    name: "Local Austin Field Guide",
    store: "Page & Spine",
    storeId: 2,
    category: "books",
    price: 24,
    distance: "0.5 mi",
    emoji: "📖",
    imgBg: "#E1F5EE"
  },
  {
    id: 103,
    name: "Monstera Deliciosa",
    store: "Roots & Co.",
    storeId: 3,
    category: "home",
    price: 45,
    distance: "0.7 mi",
    emoji: "🪴",
    imgBg: "#EAF3DE"
  },
  {
    id: 104,
    name: "Single Origin Cold Brew",
    store: "Brew & Barrel",
    storeId: 4,
    category: "food",
    price: 16,
    distance: "0.9 mi",
    emoji: "☕",
    imgBg: "#E6F1FB"
  },
  {
    id: 105,
    name: "Ceramic Pour-Over Set",
    store: "Roots & Co.",
    storeId: 3,
    category: "home",
    price: 62,
    distance: "0.7 mi",
    emoji: "🍵",
    imgBg: "#EAF3DE"
  },
  {
    id: 106,
    name: "Linen Tote Bag",
    store: "Clover Goods",
    storeId: 1,
    category: "clothing",
    price: 29,
    distance: "0.3 mi",
    emoji: "👜",
    imgBg: "#FAECE7"
  },
  {
    id: 107,
    name: "Rose Hip Face Oil",
    store: "Luminary Beauty",
    storeId: 5,
    category: "beauty",
    price: 42,
    distance: "1.1 mi",
    emoji: "🌹",
    imgBg: "#FBEAF0"
  },
  {
    id: 108,
    name: "Austin Zine Collection",
    store: "Page & Spine",
    storeId: 2,
    category: "books",
    price: 18,
    distance: "0.5 mi",
    emoji: "📰",
    imgBg: "#E1F5EE"
  }
];

// Cart state (in-memory for demo)
let cart = JSON.parse(localStorage.getItem('shopbam_cart') || '[]');

function saveCart() {
  localStorage.setItem('shopbam_cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`Added ${product.name} to cart`);
}

function updateCartBadge() {
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('.cart-count, .nav-badge').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? '' : 'none';
  });
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2200);
}
