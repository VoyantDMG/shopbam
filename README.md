# ShopBAM 🏪
### Shop Brick & Mortar — *Your neighborhood, delivered.*

ShopBAM is a local marketplace connecting shoppers to nearby independent stores — like Amazon, but for Main Street.

## Features (v1 Shopper UI)

- **Home feed** — location-aware store and product discovery
- **Category filtering** — browse by Clothing, Food, Home Goods, Books, Beauty, Hardware
- **Search** — real-time product and store search
- **Store pages** — individual merchant storefronts with product listings
- **Map view** — ready for Google Maps / Mapbox integration
- **Cart** — add items from multiple local stores, view subtotal + 5% service fee
- **Profile** — user account page with order history placeholders

## File Structure

```
shopbam/
├── index.html          # Home / discovery feed
├── cart.html           # Shopping cart + checkout
├── css/
│   └── style.css       # All styles (CSS variables, responsive)
├── js/
│   ├── data.js         # Store/product data + cart logic
│   └── main.js         # Home page rendering + interactions
└── pages/
    ├── store.html      # Individual store page (dynamic via ?id=)
    ├── search.html     # Full search + filter page
    ├── map.html        # Map view (placeholder, ready for API)
    └── profile.html    # User profile page
```

## Getting Started

No build step required — pure HTML, CSS, and vanilla JavaScript.

```bash
git clone https://github.com/yourusername/shopbam.git
cd shopbam
# Open index.html in your browser, or use a local server:
npx serve .
```

## Roadmap

### Merchant Side
- [ ] Merchant signup & dashboard
- [ ] Inventory management (add/edit/remove products)
- [ ] Order notifications
- [ ] Sales analytics

### Shopper Side
- [ ] Google Maps / Mapbox integration
- [ ] Real authentication (Clerk / Auth0)
- [ ] Stripe Connect checkout
- [ ] Reviews & ratings
- [ ] Push notifications

### Backend
- [ ] Node.js + Express API
- [ ] PostgreSQL database
- [ ] Stripe Connect (marketplace payments with transaction fee)
- [ ] Vercel + Supabase deployment

## Tech Stack (planned)

| Layer | Tech |
|---|---|
| Frontend | HTML/CSS/JS → Next.js |
| Mobile | React Native |
| Backend | Node.js + PostgreSQL |
| Payments | Stripe Connect |
| Maps | Google Maps API or Mapbox |
| Auth | Clerk or Auth0 |
| Hosting | Vercel + Supabase |

## Business Model

ShopBAM charges a **5% transaction fee** on each sale. Merchants keep 95% of every transaction — no monthly subscription required to list.

---

Built with ❤️ for Main Street.
