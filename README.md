# Bloom & Bliss — Custom Bouquets

A premium, luxury flower bouquet customization e-commerce website built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- **Stunning Hero Section** — Full-width luxury floral imagery with elegant entrance animations
- **Shop by Occasion** — 9 occasion cards with working filter navigation
- **Flower Collections** — 10 premium products with search, filter (occasion + price), and sort
- **Interactive Bouquet Builder** — 6-step customization wizard with live preview and dynamic pricing:
  1. Choose Flowers (8 options)
  2. Choose Size (Small / Medium / Large / Luxury Premium)
  3. Choose Color Theme (7 themes)
  4. Choose Wrapping (7 options)
  5. Add Finishing Touches (8 add-ons)
  6. Personalize order (recipient, message, delivery details)
- **Shopping Cart** — Slide-out drawer with quantity controls, persistent across navigation
- **WhatsApp Checkout** — Generates a formatted order message and opens WhatsApp
- **Gift Add-ons** — Chocolates, cards, candles, teddy bears, perfume, luxury hampers
- **Customer Reviews** — Sample testimonials with star ratings and bouquet photos
- **About Us** — Elegant brand story with florist photography
- **Contact Section** — Contact form with validation + business details + social links
- **Light & Dark Mode** — Ivory/blush/gold (light) vs. deep plum/charcoal/gold (dark), saved locally
- **Responsive Design** — Mobile, tablet, and desktop layouts with mobile nav drawer
- **Premium Animations** — Falling petals, scroll reveals, hover effects, smooth transitions

## Getting Started

### Using VS Code + Live Server (alternative)

If you prefer to view the built site without a dev server:

1. Install the **Live Server** extension in VS Code (by Ritwick Dey)
2. Run `npm run build` to generate the production files in `dist/`
3. Right-click on `dist/index.html` and select **"Open with Live Server"**
4. The site will open in your browser at a local URL

### Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Configuration

### WhatsApp Business Number

The WhatsApp number is stored in a single, clearly labeled variable in `src/data.ts`:

```typescript
export const WHATSAPP_NUMBER = "923000000000"; // <-- Replace this
```

**How to replace:**
- Format: country code + number, no `+` sign, no spaces, no dashes
- Example for Pakistan: `"923001234567"` (for +92 300 1234567)
- Example for US: `"12025551234"` (for +1 202 555 1234)

When a customer clicks "Order on WhatsApp," a pre-formatted message with their full order details opens in WhatsApp addressed to this number.

### Business Information

All business details (phone, email, address, hours, social links) are editable in `src/data.ts` under the `BUSINESS_INFO` constant.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 7** (dev server & bundler)
- **Tailwind CSS 3** (styling)
- **Lucide React** (icons)
- LocalStorage (cart persistence + theme preference)

## Images

All flower photography is sourced from Pexels (free, license-free stock photos). URLs are verified and load reliably.

## Notes

- No payment processing — orders are sent via WhatsApp for manual confirmation
- Sample testimonials are clearly labeled as demonstrations, not verified reviews
- Cart and theme preferences persist in the browser via localStorage
