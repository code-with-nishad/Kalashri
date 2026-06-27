const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");

dotenv.config({ path: ".env" });


const products = [
  // Hair Care
  {
    name: "L'Oréal Professionnel Serie Expert Absolut Repair Shampoo",
    slug: "loreal-absolut-repair-shampoo",
    category: "Hair Care",
    subcategory: "Shampoo",
    brand: "L'Oréal Professionnel",
    description: "Resurfacing and illuminating shampoo for damaged hair.",
    features: "Infused with Gold Quinoa + Protein",
    benefits: "Reduces surface damage by 77%, leaving hair 7x shinier.",
    ingredients: "Aqua / Water / Eau, Sodium Laureth Sulfate, Cocamidopropyl Betaine...",
    usage: "Apply evenly on wet hair. Lather. Rinse thoroughly.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800"],
    price: 850,
    originalPrice: 950,
    discount: 10,
    rating: 4.8,
    reviewCount: 120,
    stockQuantity: 25,
    unit: "300ml",
    isFeatured: true,
    tags: ["damaged hair", "repair", "shine"]
  },
  {
    name: "SSCP Herbals Anti Dandruff Hair Oil",
    slug: "sscp-herbals-anti-dandruff-oil",
    category: "Hair Care",
    subcategory: "Hair Oil",
    brand: "SSCP Herbals",
    description: "Ayurvedic hair oil for dandruff-free scalp.",
    features: "Paraben-free, 100% natural",
    benefits: "Reduces flakes, relieves itching, nourishes roots.",
    ingredients: "Tea Tree, Rosemary, Neem, Shikakai",
    usage: "Massage into scalp and leave overnight or for at least 1 hour before washing.",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800"],
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.5,
    reviewCount: 85,
    stockQuantity: 50,
    unit: "200ml",
    isFeatured: true,
    tags: ["dandruff", "ayurvedic", "scalp care"]
  },
  {
    name: "Wella Professionals Invigo Nutri-Enrich Deep Nourishing Mask",
    slug: "wella-invigo-nutri-enrich-mask",
    category: "Hair Care",
    subcategory: "Hair Mask",
    brand: "Wella",
    description: "Deeply replenishes dry and stressed hair.",
    features: "With Nutri-Enrich-Blend",
    benefits: "Provides intense moisture, smooths hair, restores vitality.",
    ingredients: "Goji Berry, Vitamin E, Panthenol",
    usage: "Apply to clean, damp hair. Leave for 5 minutes. Rinse out thoroughly.",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800"],
    price: 1100,
    originalPrice: 1200,
    discount: 8,
    rating: 4.7,
    reviewCount: 200,
    stockQuantity: 15,
    unit: "150ml",
    tags: ["dry hair", "nourishing", "mask"]
  },
  {
    name: "Schwarzkopf Professional Osis+ Magic Anti Frizz Shine Serum",
    slug: "schwarzkopf-osis-magic-serum",
    category: "Hair Care",
    subcategory: "Hair Serum",
    brand: "Schwarzkopf",
    description: "Glossy shine serum for smooth, frizz-free hair.",
    features: "Lightweight hold, intense shine",
    benefits: "Instant gloss, smooths frizz, washes out easily.",
    ingredients: "Silicone agents, Glycerin",
    usage: "Apply a small amount onto dry hair.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800"],
    price: 950,
    originalPrice: 1050,
    discount: 9,
    rating: 4.6,
    reviewCount: 92,
    stockQuantity: 30,
    unit: "50ml",
    isFeatured: true,
    tags: ["frizz control", "shine", "serum"]
  },
  
  // Skin Care
  {
    name: "Minimalist 10% Niacinamide Face Serum",
    slug: "minimalist-10-niacinamide",
    category: "Skin Care",
    subcategory: "Niacinamide Serum",
    brand: "Minimalist",
    description: "Everyday face serum for acne marks, blemishes & oil balancing.",
    features: "Fragrance-free, non-comedogenic",
    benefits: "Reduces acne marks, balances oil, improves skin barrier.",
    ingredients: "Niacinamide, Zinc PCA, Aloe Vera",
    usage: "Apply 2-3 drops after cleansing & toning. Let it absorb.",
    image: "https://images.unsplash.com/photo-1629367306595-c276a7e08920?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1629367306595-c276a7e08920?auto=format&fit=crop&q=80&w=800"],
    price: 599,
    originalPrice: 599,
    discount: 0,
    rating: 4.5,
    reviewCount: 450,
    stockQuantity: 40,
    unit: "30ml",
    isFeatured: true,
    tags: ["acne", "blemishes", "oil control"]
  },
  {
    name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel",
    slug: "derma-co-hyaluronic-sunscreen",
    category: "Skin Care",
    subcategory: "Sunscreen SPF50",
    brand: "The Derma Co",
    description: "Broad-spectrum protection with SPF 50 & PA++++.",
    features: "No white cast, lightweight, fragrance-free",
    benefits: "Protects from UVA/UVB rays, deeply hydrates, prevents blue light damage.",
    ingredients: "Hyaluronic Acid, Vitamin E",
    usage: "Take an adequate amount and apply evenly on face & neck 15 mins before sun exposure.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800"],
    price: 499,
    originalPrice: 599,
    discount: 16,
    rating: 4.8,
    reviewCount: 310,
    stockQuantity: 60,
    unit: "50g",
    tags: ["sun protection", "hydration", "spf50"]
  },
  {
    name: "Mamaearth Vitamin C Face Wash",
    slug: "mamaearth-vitamin-c-facewash",
    category: "Skin Care",
    subcategory: "Face Wash",
    brand: "Mamaearth",
    description: "Illuminating face wash with Vitamin C & Turmeric.",
    features: "Dermatologically tested, natural ingredients",
    benefits: "Brightens skin, promotes even skin tone, fights free radical damage.",
    ingredients: "Vitamin C, Turmeric, Aloe Vera",
    usage: "Apply on wet face, massage gently in circular motion, and rinse.",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800"],
    price: 259,
    originalPrice: 299,
    discount: 13,
    rating: 4.4,
    reviewCount: 520,
    stockQuantity: 100,
    unit: "100ml",
    tags: ["brightening", "vitamin c", "face wash"]
  },
  {
    name: "Cetaphil Gentle Skin Cleanser",
    slug: "cetaphil-gentle-cleanser",
    category: "Skin Care",
    subcategory: "Cleanser",
    brand: "Cetaphil",
    description: "Hydrating and soothing daily face wash for sensitive skin.",
    features: "Soap-free, hypoallergenic, non-comedogenic",
    benefits: "Cleanses without stripping moisture, defends against 5 signs of skin sensitivity.",
    ingredients: "Niacinamide, Panthenol, Hydrating Glycerin",
    usage: "Apply to skin and rub gently. Rinse or wipe off with soft tissue.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800"],
    price: 333,
    originalPrice: 399,
    discount: 16,
    rating: 4.9,
    reviewCount: 890,
    stockQuantity: 75,
    unit: "125ml",
    isFeatured: true,
    tags: ["sensitive skin", "cleanser", "hydrating"]
  },
  
  // Makeup
  {
    name: "MAC Studio Fix Fluid SPF 15 Foundation",
    slug: "mac-studio-fix-foundation",
    category: "Makeup",
    subcategory: "Foundation",
    brand: "MAC",
    description: "A modern foundation with a natural matte finish and broad spectrum protection.",
    features: "24-hour wear, buildable coverage",
    benefits: "Controls oil and shine, non-porous, reduces appearance of pores.",
    ingredients: "Water, Cyclopentasiloxane, Peg-10 Dimethicone...",
    usage: "Apply to face using a sponge or foundation brush.",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800"],
    price: 3300,
    originalPrice: 3300,
    discount: 0,
    rating: 4.8,
    reviewCount: 340,
    stockQuantity: 20,
    unit: "30ml",
    isFeatured: true,
    tags: ["matte", "long wear", "foundation"]
  },
  {
    name: "Maybelline New York Fit Me Matte + Poreless Liquid Foundation",
    slug: "maybelline-fit-me-foundation",
    category: "Makeup",
    subcategory: "Foundation",
    brand: "Maybelline",
    description: "Lightweight matte liquid foundation perfect for normal to oily skin.",
    features: "Matte finish, minimizes pores",
    benefits: "Blurs pores for a natural, seamless finish.",
    ingredients: "Micro-powders that control shine and blur pores.",
    usage: "Apply evenly to your face and blend with your fingers or a sponge.",
    image: "https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&q=80&w=800"],
    price: 549,
    originalPrice: 649,
    discount: 15,
    rating: 4.6,
    reviewCount: 1200,
    stockQuantity: 100,
    unit: "30ml",
    tags: ["matte", "poreless", "affordable"]
  },
  {
    name: "L'Oreal Paris Rouge Signature Matte Liquid Lipstick",
    slug: "loreal-rouge-signature-lipstick",
    category: "Makeup",
    subcategory: "Lipstick",
    brand: "L'Oréal",
    description: "Ultra-lightweight matte lip stain that delivers high pigment.",
    features: "Bare-lip sensation, no flaking",
    benefits: "Lasts all day, weightless feel, vibrant color.",
    ingredients: "Aqua, Dimethicone, Isododecane...",
    usage: "Apply with the precision applicator.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800"],
    price: 799,
    originalPrice: 899,
    discount: 11,
    rating: 4.5,
    reviewCount: 300,
    stockQuantity: 40,
    unit: "7ml",
    tags: ["matte", "liquid lipstick", "stain"]
  },
  
  // Body Care
  {
    name: "Plum BodyLovin' Vanilla Vibes Body Butter",
    slug: "plum-vanilla-vibes-body-butter",
    category: "Body Care",
    subcategory: "Body Butter",
    brand: "Plum",
    description: "Deeply moisturizing body butter with a warm vanilla fragrance.",
    features: "100% Vegan, Cruelty-free",
    benefits: "Intense hydration, leaves skin feeling soft and supple.",
    ingredients: "Shea Butter, Sunflower Oil, Vanilla Extract",
    usage: "Scoop and massage onto skin until fully absorbed.",
    image: "https://images.unsplash.com/photo-1615397323209-6bc82df0e7b8?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1615397323209-6bc82df0e7b8?auto=format&fit=crop&q=80&w=800"],
    price: 525,
    originalPrice: 650,
    discount: 19,
    rating: 4.7,
    reviewCount: 410,
    stockQuantity: 30,
    unit: "200g",
    isFeatured: true,
    tags: ["moisturizing", "vanilla", "vegan"]
  },
  {
    name: "Dot & Key Ceramides & Hyaluronic Skin Barrier Body Lotion",
    slug: "dot-key-ceramides-body-lotion",
    category: "Body Care",
    subcategory: "Body Lotion",
    brand: "Dot & Key",
    description: "Deeply hydrating body lotion that repairs the skin barrier.",
    features: "Non-greasy, fast-absorbing",
    benefits: "Provides 72-hour hydration, repairs dry and flaky skin.",
    ingredients: "5 Essential Ceramides, Hyaluronic Acid",
    usage: "Apply generously all over body after shower.",
    image: "https://images.unsplash.com/photo-1556228720-192a6af4e865?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1556228720-192a6af4e865?auto=format&fit=crop&q=80&w=800"],
    price: 395,
    originalPrice: 495,
    discount: 20,
    rating: 4.6,
    reviewCount: 220,
    stockQuantity: 45,
    unit: "250ml",
    tags: ["hydration", "ceramides", "barrier repair"]
  },
  
  // Facial
  {
    name: "O3+ Bridal Facial Kit Vitamin C Glowing Skin",
    slug: "o3-bridal-facial-kit",
    category: "Facial",
    subcategory: "Bridal Facial Kit",
    brand: "O3+",
    description: "A 10-step regimen that ensures wonderful results for brides.",
    features: "Professional grade, suitable for all skin types",
    benefits: "Boosts radiance, unifies skin tone, deeply hydrates.",
    ingredients: "Vitamin C, Glycolic Acid, Aloe Vera",
    usage: "Follow the 10-step instructions included in the box.",
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&q=80&w=800"],
    price: 3500,
    originalPrice: 3800,
    discount: 8,
    rating: 4.9,
    reviewCount: 150,
    stockQuantity: 10,
    unit: "1 Kit",
    isFeatured: true,
    tags: ["bridal", "glow", "professional"]
  },
  {
    name: "Lotus Herbals Radiant Gold Cellular Glow Facial Kit",
    slug: "lotus-gold-facial-kit",
    category: "Facial",
    subcategory: "Gold Facial Kit",
    brand: "Lotus Herbals",
    description: "Contains 24K Gold leaves and Papaya extracts for a golden glow.",
    features: "4-step kit (Exfoliator, Activator, Massage Cream, Mask)",
    benefits: "Revitalizes skin, removes dead cells, imparts a radiant glow.",
    ingredients: "24K Gold Foil, Papaya Extract, Horse Chestnut",
    usage: "Use step by step as directed on the packaging.",
    image: "https://images.unsplash.com/photo-1616887327341-26c7102e3b2f?auto=format&fit=crop&q=80&w=400",
    gallery: ["https://images.unsplash.com/photo-1616887327341-26c7102e3b2f?auto=format&fit=crop&q=80&w=800"],
    price: 1250,
    originalPrice: 1400,
    discount: 10,
    rating: 4.4,
    reviewCount: 380,
    stockQuantity: 25,
    unit: "1 Kit",
    tags: ["gold facial", "glow", "anti-aging"]
  },
];

const generateProducts = () => {
    let finalProducts = [...products];
    // Replicate to reach ~45 products
    for(let i=0; i<30; i++) {
        let baseProduct = products[i % products.length];
        finalProducts.push({
            ...baseProduct,
            name: `${baseProduct.name} - V${i+1}`,
            slug: `${baseProduct.slug}-v${i+1}`,
            sku: `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        });
    }
    
    return finalProducts.map((p) => ({
        ...p,
        sku: p.sku || `PROD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    }));
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB...");
    await Product.deleteMany();
    console.log("Cleared existing products.");
    const items = generateProducts();
    await Product.insertMany(items);
    console.log(`Successfully seeded ${items.length} products!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedDB();
