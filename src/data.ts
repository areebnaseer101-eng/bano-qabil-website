// Central store for all site data, images, and configuration

// === WHATSAPP CONFIGURATION ===
// Replace this placeholder with your actual WhatsApp Business number
// Format: country code + number, no + sign, no spaces, no dashes
// Example: "923001234567" for Pakistan (+92 300 1234567)
export const WHATSAPP_NUMBER = "923000000000";

// === BUSINESS INFO ===
export const BUSINESS_INFO = {
  name: "Bloom & Bliss",
  tagline: "Every Petal, A Little Piece of Love.",
  phone: "+92 300 0000000",
  email: "hello@bloomandbliss.pk",
  address: "Shop 12, Gulberg Boulevard, Lahore, Pakistan",
  hours: "Mon – Sat: 9:00 AM – 8:00 PM | Sun: 11:00 AM – 5:00 PM",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
    tiktok: "https://tiktok.com",
  },
};

// === IMAGE SOURCES (verified Pexels URLs) ===
export const IMAGES = {
  hero: "https://images.pexels.com/photos/3608751/pexels-photo-3608751.jpeg?auto=compress&cs=tinysrgb&w=1920",
  heroSecondary: "https://images.pexels.com/photos/289519/pexels-photo-289519.jpeg?auto=compress&cs=tinysrgb&w=1600",
  about: "https://images.pexels.com/photos/5409764/pexels-photo-5409764.jpeg?auto=compress&cs=tinysrgb&w=1200",
  aboutSecondary: "https://images.pexels.com/photos/6720578/pexels-photo-6720578.jpeg?auto=compress&cs=tinysrgb&w=800",

  // Occasion cards
  occasions: {
    birthday: "https://images.pexels.com/photos/10972327/pexels-photo-10972327.jpeg?auto=compress&cs=tinysrgb&w=600",
    wedding: "https://images.pexels.com/photos/289519/pexels-photo-289519.jpeg?auto=compress&cs=tinysrgb&w=600",
    anniversary: "https://images.pexels.com/photos/13306278/pexels-photo-13306278.jpeg?auto=compress&cs=tinysrgb&w=600",
    bride: "https://images.pexels.com/photos/667320/pexels-photo-667320.jpeg?auto=compress&cs=tinysrgb&w=600",
    engagement: "https://images.pexels.com/photos/7431423/pexels-photo-7431423.png?auto=compress&cs=tinysrgb&w=600",
    valentine: "https://images.pexels.com/photos/15554353/pexels-photo-15554353.jpeg?auto=compress&cs=tinysrgb&w=600",
    graduation: "https://images.pexels.com/photos/9070118/pexels-photo-9070118.jpeg?auto=compress&cs=tinysrgb&w=600",
    getwell: "https://images.pexels.com/photos/8117136/pexels-photo-8117136.jpeg?auto=compress&cs=tinysrgb&w=600",
    justbecause: "https://images.pexels.com/photos/11357635/pexels-photo-11357635.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // Product collection images
  products: {
    classicRose: "https://images.pexels.com/photos/13306278/pexels-photo-13306278.jpeg?auto=compress&cs=tinysrgb&w=800",
    pinkPeony: "https://images.pexels.com/photos/19121891/pexels-photo-19121891.jpeg?auto=compress&cs=tinysrgb&w=800",
    whiteLily: "https://images.pexels.com/photos/28882163/pexels-photo-28882163.jpeg?auto=compress&cs=tinysrgb&w=800",
    tulip: "https://images.pexels.com/photos/24811293/pexels-photo-24811293.jpeg?auto=compress&cs=tinysrgb&w=800",
    mixedSeasonal: "https://images.pexels.com/photos/8073069/pexels-photo-8073069.jpeg?auto=compress&cs=tinysrgb&w=800",
    luxuryRoseBox: "https://images.pexels.com/photos/11155051/pexels-photo-11155051.jpeg?auto=compress&cs=tinysrgb&w=800",
    preservedBox: "https://images.pexels.com/photos/9957266/pexels-photo-9957266.jpeg?auto=compress&cs=tinysrgb&w=800",
    bridalBouquet: "https://images.pexels.com/photos/667320/pexels-photo-667320.jpeg?auto=compress&cs=tinysrgb&w=800",
    heartBox: "https://images.pexels.com/photos/15466365/pexels-photo-15466365.jpeg?auto=compress&cs=tinysrgb&w=800",
    miniGift: "https://images.pexels.com/photos/29406682/pexels-photo-29406682.jpeg?auto=compress&cs=tinysrgb&w=800",
  },

  // Bouquet builder flower images
  builderFlowers: {
    redRoses: "https://images.pexels.com/photos/13306278/pexels-photo-13306278.jpeg?auto=compress&cs=tinysrgb&w=500",
    pinkRoses: "https://images.pexels.com/photos/25226151/pexels-photo-25226151.jpeg?auto=compress&cs=tinysrgb&w=500",
    whiteRoses: "https://images.pexels.com/photos/28882163/pexels-photo-28882163.jpeg?auto=compress&cs=tinysrgb&w=500",
    tulips: "https://images.pexels.com/photos/24811293/pexels-photo-24811293.jpeg?auto=compress&cs=tinysrgb&w=500",
    lilies: "https://images.pexels.com/photos/28882163/pexels-photo-28882163.jpeg?auto=compress&cs=tinysrgb&w=500",
    sunflowers: "https://images.pexels.com/photos/8737346/pexels-photo-8737346.jpeg?auto=compress&cs=tinysrgb&w=500",
    babysBreath: "https://images.pexels.com/photos/8521980/pexels-photo-8521980.jpeg?auto=compress&cs=tinysrgb&w=500",
    seasonalMixed: "https://images.pexels.com/photos/8073069/pexels-photo-8073069.jpeg?auto=compress&cs=tinysrgb&w=500",
  },

  // Gift add-ons
  addons: {
    chocolates: "https://images.pexels.com/photos/6487798/pexels-photo-6487798.jpeg?auto=compress&cs=tinysrgb&w=600",
    greetingCard: "https://images.pexels.com/photos/7784602/pexels-photo-7784602.jpeg?auto=compress&cs=tinysrgb&w=600",
    candle: "https://images.pexels.com/photos/36569350/pexels-photo-36569350.jpeg?auto=compress&cs=tinysrgb&w=600",
    teddyBear: "https://images.pexels.com/photos/35579568/pexels-photo-35579568.jpeg?auto=compress&cs=tinysrgb&w=600",
    perfume: "https://images.pexels.com/photos/11482458/pexels-photo-11482458.jpeg?auto=compress&cs=tinysrgb&w=600",
    luxuryGiftBox: "https://images.pexels.com/photos/6487761/pexels-photo-6487761.png?auto=compress&cs=tinysrgb&w=600",
  },

  // Review photos
  reviews: {
    r1: "https://images.pexels.com/photos/8305326/pexels-photo-8305326.jpeg?auto=compress&cs=tinysrgb&w=300",
    r2: "https://images.pexels.com/photos/38641606/pexels-photo-38641606.jpeg?auto=compress&cs=tinysrgb&w=300",
    r3: "https://images.pexels.com/photos/9879959/pexels-photo-9879959.jpeg?auto=compress&cs=tinysrgb&w=300",
    r4: "https://images.pexels.com/photos/40375930/pexels-photo-40375930.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
};

// === PRODUCT DEFINITIONS ===
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  occasions: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "classic-rose",
    name: "Classic Rose Bouquet",
    price: 4500,
    description: "Velvety red roses hand-tied with satin ribbon — the timeless expression of love.",
    image: IMAGES.products.classicRose,
    category: "Bouquets",
    occasions: ["anniversary", "valentine", "justbecause"],
    badge: "Bestseller",
  },
  {
    id: "pink-peony",
    name: "Pink Peony Bouquet",
    price: 6500,
    description: "Lush garden peonies in delicate blush hues, wrapped in ivory luxury paper.",
    image: IMAGES.products.pinkPeony,
    category: "Bouquets",
    occasions: ["wedding", "bride", "birthday"],
  },
  {
    id: "white-lily",
    name: "White Lily Bouquet",
    price: 5500,
    description: "Pure white lilies with eucalyptus accents — graceful, elegant, serene.",
    image: IMAGES.products.whiteLily,
    category: "Bouquets",
    occasions: ["wedding", "getwell", "justbecause"],
  },
  {
    id: "tulip-bouquet",
    name: "Tulip Bouquet",
    price: 4000,
    description: "Fresh spring tulips in a vibrant pastel palette — brighten any day.",
    image: IMAGES.products.tulip,
    category: "Bouquets",
    occasions: ["birthday", "graduation", "justbecause"],
  },
  {
    id: "mixed-seasonal",
    name: "Mixed Seasonal Flowers",
    price: 5000,
    description: "A curated medley of the season's freshest blooms, artfully arranged.",
    image: IMAGES.products.mixedSeasonal,
    category: "Bouquets",
    occasions: ["birthday", "getwell", "justbecause", "graduation"],
  },
  {
    id: "luxury-rose-box",
    name: "Luxury Rose Box",
    price: 8500,
    description: "Premium long-stem roses presented in an elegant signature gift box.",
    image: IMAGES.products.luxuryRoseBox,
    category: "Boxes",
    occasions: ["anniversary", "valentine", "birthday"],
    badge: "Premium",
  },
  {
    id: "preserved-box",
    name: "Preserved Flower Box",
    price: 12000,
    description: "Long-lasting preserved blooms in a keepsake box — beauty that endures for years.",
    image: IMAGES.products.preservedBox,
    category: "Boxes",
    occasions: ["anniversary", "engagement", "bride"],
    badge: "Lasts 1+ Year",
  },
  {
    id: "bridal-bouquet",
    name: "Elegant Bridal Bouquet",
    price: 15000,
    description: "A bespoke bridal masterpiece — cascading white roses with ribbon detailing.",
    image: IMAGES.products.bridalBouquet,
    category: "Bridal",
    occasions: ["wedding", "bride", "engagement"],
    badge: "Bridal",
  },
  {
    id: "heart-box",
    name: "Heart-Shaped Flower Box",
    price: 7500,
    description: "Roses arranged in a heart-shaped keepsake box — say it with love.",
    image: IMAGES.products.heartBox,
    category: "Boxes",
    occasions: ["valentine", "anniversary", "engagement"],
  },
  {
    id: "mini-gift",
    name: "Mini Gift Bouquet",
    price: 2500,
    description: "A petite posy of seasonal blooms — perfect for a thoughtful little surprise.",
    image: IMAGES.products.miniGift,
    category: "Bouquets",
    occasions: ["birthday", "justbecause", "graduation", "getwell"],
  },
];

// === OCCASIONS ===
export interface Occasion {
  id: string;
  name: string;
  image: string;
}

export const OCCASIONS: Occasion[] = [
  { id: "birthday", name: "Birthday Bouquets", image: IMAGES.occasions.birthday },
  { id: "wedding", name: "Wedding Flowers", image: IMAGES.occasions.wedding },
  { id: "anniversary", name: "Anniversary Bouquets", image: IMAGES.occasions.anniversary },
  { id: "bride", name: "Bride-to-Be", image: IMAGES.occasions.bride },
  { id: "engagement", name: "Engagement Flowers", image: IMAGES.occasions.engagement },
  { id: "valentine", name: "Valentine's Day", image: IMAGES.occasions.valentine },
  { id: "graduation", name: "Graduation Flowers", image: IMAGES.occasions.graduation },
  { id: "getwell", name: "Get Well Soon", image: IMAGES.occasions.getwell },
  { id: "justbecause", name: "Just Because", image: IMAGES.occasions.justbecause },
];

// === GIFT ADD-ONS ===
export interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const ADDONS: Addon[] = [
  {
    id: "chocolates",
    name: "Belgian Chocolate Box",
    price: 1800,
    description: "Assorted artisanal Belgian chocolates in a luxury gift box.",
    image: IMAGES.addons.chocolates,
  },
  {
    id: "greeting-card",
    name: "Personalized Greeting Card",
    price: 500,
    description: "A beautifully designed card with your handwritten message.",
    image: IMAGES.addons.greetingCard,
  },
  {
    id: "candle",
    name: "Scented Soy Candle",
    price: 1500,
    description: "Hand-poured soy candle in rose & vanilla — 40-hour burn time.",
    image: IMAGES.addons.candle,
  },
  {
    id: "teddy-bear",
    name: "Plush Teddy Bear",
    price: 2000,
    description: "Soft, cuddly teddy bear with a satin bow — a sweet companion.",
    image: IMAGES.addons.teddyBear,
  },
  {
    id: "perfume",
    name: "Luxury Perfume Gift",
    price: 5500,
    description: "An elegant fragrance in a premium presentation box.",
    image: IMAGES.addons.perfume,
  },
  {
    id: "luxury-gift-box",
    name: "Luxury Gift Hamper",
    price: 6000,
    description: "Curated hamper with flowers, chocolates, and a scented candle.",
    image: IMAGES.addons.luxuryGiftBox,
  },
];

// === BOUQUET BUILDER OPTIONS ===
export interface BuilderOption {
  id: string;
  name: string;
  price?: number;
  image?: string;
}

export const BUILDER_FLOWERS: BuilderOption[] = [
  { id: "redRoses", name: "Red Roses", price: 2500, image: IMAGES.builderFlowers.redRoses },
  { id: "pinkRoses", name: "Pink Roses", price: 2500, image: IMAGES.builderFlowers.pinkRoses },
  { id: "whiteRoses", name: "White Roses", price: 2500, image: IMAGES.builderFlowers.whiteRoses },
  { id: "tulips", name: "Tulips", price: 2000, image: IMAGES.builderFlowers.tulips },
  { id: "lilies", name: "Lilies", price: 2200, image: IMAGES.builderFlowers.lilies },
  { id: "sunflowers", name: "Sunflowers", price: 1800, image: IMAGES.builderFlowers.sunflowers },
  { id: "babysBreath", name: "Baby's Breath", price: 1500, image: IMAGES.builderFlowers.babysBreath },
  { id: "seasonalMixed", name: "Seasonal Mixed", price: 2800, image: IMAGES.builderFlowers.seasonalMixed },
];

export const BUILDER_SIZES: BuilderOption[] = [
  { id: "small", name: "Small", price: 0 },
  { id: "medium", name: "Medium", price: 1500 },
  { id: "large", name: "Large", price: 3000 },
  { id: "premium", name: "Luxury Premium", price: 5500 },
];

export const BUILDER_COLORS: BuilderOption[] = [
  { id: "romanticRed", name: "Romantic Red" },
  { id: "blushPink", name: "Blush Pink" },
  { id: "pureWhite", name: "Pure White" },
  { id: "lavenderDream", name: "Lavender Dream" },
  { id: "peachCream", name: "Peach & Cream" },
  { id: "pastelMix", name: "Pastel Mix" },
  { id: "customColor", name: "Custom Color" },
];

export const BUILDER_WRAPPING: BuilderOption[] = [
  { id: "kraftPaper", name: "Premium Kraft Paper", price: 300 },
  { id: "blushPaper", name: "Blush Pink Paper", price: 400 },
  { id: "ivoryWrap", name: "Ivory Luxury Wrap", price: 600 },
  { id: "koreanWrap", name: "Transparent Korean Wrap", price: 500 },
  { id: "satinRibbon", name: "Satin Ribbon Wrap", price: 700 },
  { id: "flowerBox", name: "Luxury Flower Box", price: 1500 },
  { id: "heartBox", name: "Heart-Shaped Box", price: 1800 },
];

export const BUILDER_FINISHES: BuilderOption[] = [
  { id: "satinRibbon", name: "Satin Ribbon", price: 200 },
  { id: "messageCard", name: "Personalized Message Card", price: 300 },
  { id: "nameOnRibbon", name: "Name on Ribbon", price: 400 },
  { id: "pearls", name: "Decorative Pearls", price: 600 },
  { id: "giftBox", name: "Gift Box", price: 800 },
  { id: "teddyBear", name: "Small Teddy Bear", price: 1200 },
  { id: "chocolates", name: "Chocolates", price: 1500 },
  { id: "preservedFlowers", name: "Preserved Flowers", price: 2500 },
];

// === CUSTOM BOUQUET DATA (shared type) ===
export interface CustomBouquetData {
  flower: { id: string; name: string; price: number };
  size: { id: string; name: string; price: number };
  color: { id: string; name: string };
  wrapping: { id: string; name: string; price: number };
  finishes: { id: string; name: string; price: number }[];
  recipientName: string;
  message: string;
  instructions: string;
  deliveryDate: string;
  deliveryAddress: string;
  contactNumber: string;
}

// === COLOR THEME MAPPING for builder preview ===
export const COLOR_PREVIEW: Record<string, { bg: string; accent: string; label: string }> = {
  romanticRed: { bg: "linear-gradient(135deg, #c41e3a, #e63946)", accent: "#c41e3a", label: "Romantic Red" },
  blushPink: { bg: "linear-gradient(135deg, #f8c8dc, #e8a0b8)", accent: "#d97a96", label: "Blush Pink" },
  pureWhite: { bg: "linear-gradient(135deg, #ffffff, #f5f5f0)", accent: "#e0e0d8", label: "Pure White" },
  lavenderDream: { bg: "linear-gradient(135deg, #c8b4d8, #a890c0)", accent: "#9b7fb8", label: "Lavender Dream" },
  peachCream: { bg: "linear-gradient(135deg, #ffd4c4, #ffe8d6)", accent: "#e8a88c", label: "Peach & Cream" },
  pastelMix: { bg: "linear-gradient(135deg, #f8c8dc, #c8b4d8, #b8e0d2)", accent: "#d97a96", label: "Pastel Mix" },
  customColor: { bg: "linear-gradient(135deg, #dcc28a, #c9a96e)", accent: "#c9a96e", label: "Custom" },
};

// === SAMPLE REVIEWS ===
export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  photo: string;
  occasion: string;
  date: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Ayesha Khan",
    rating: 5,
    text: "The custom bridal bouquet exceeded every expectation. Each bloom was fresh, fragrant, and perfectly arranged. Our wedding photos look like a dream.",
    photo: IMAGES.reviews.r1,
    occasion: "Bridal Bouquet",
    date: "March 2026",
  },
  {
    id: 2,
    name: "Daniyal Ahmed",
    rating: 5,
    text: "Ordered the heart-shaped rose box for our anniversary. The WhatsApp ordering was effortless and the flowers arrived looking exactly like the photos.",
    photo: IMAGES.reviews.r2,
    occasion: "Anniversary",
    date: "February 2026",
  },
  {
    id: 3,
    name: "Sana Malik",
    rating: 5,
    text: "The bouquet builder is so much fun! I picked every detail — pink roses, blush wrap, pearls — and the result was stunning. My mother loved it.",
    photo: IMAGES.reviews.r3,
    occasion: "Birthday",
    date: "January 2026",
  },
  {
    id: 4,
    name: "Hira Siddiqui",
    rating: 4,
    text: "Beautiful preserved flower box that still looks gorgeous after three months. Premium quality and elegant packaging. Highly recommend.",
    photo: IMAGES.reviews.r4,
    occasion: "Just Because",
    date: "December 2025",
  },
];

// === FORMAT PRICE ===
export function formatPKR(amount: number): string {
  return "Rs. " + amount.toLocaleString("en-PK");
}
