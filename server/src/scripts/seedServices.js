const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("../models/Service");

dotenv.config({ path: ".env" });


const services = [
  // Hair Category
  {
    name: "Layer Cut",
    description: "Multi-layered haircut for volume and movement.",
    category: "Hair",
    price: 800,
    duration: 45,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
    benefits: ["Adds volume", "Removes dead ends", "Stylish look"],
    featured: true,
    popular: true,
    isActive: true
  },
  {
    name: "Hair Spa (L'Oreal)",
    description: "Deep nourishing hair spa using L'Oreal Professional products.",
    category: "Hair",
    price: 1200,
    discountPrice: 999,
    duration: 60,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=400",
    benefits: ["Deep conditioning", "Scalp massage", "Stress relief"],
    featured: true,
    popular: true,
    isActive: true
  },
  {
    name: "Keratin Treatment",
    description: "Protein smoothing treatment for frizz-free, straight hair.",
    category: "Hair",
    price: 4500,
    discountPrice: 3999,
    duration: 180,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400",
    benefits: ["Frizz-free", "Silky smooth", "Long-lasting straightness"],
    featured: true,
    popular: false,
    isActive: true
  },
  {
    name: "Global Hair Color",
    description: "Full head hair coloring using premium ammonia-free colors.",
    category: "Hair",
    price: 3500,
    duration: 120,
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=400",
    benefits: ["Even color coverage", "Shine boost", "Grey coverage"],
    featured: false,
    popular: true,
    isActive: true
  },

  // Face Category
  {
    name: "O3+ Bridal Facial",
    description: "10-step premium facial for ultimate bridal glow.",
    category: "Face",
    price: 3000,
    duration: 90,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400",
    benefits: ["Radiant glow", "Deep cleansing", "Skin tightening"],
    featured: true,
    popular: true,
    isActive: true
  },
  {
    name: "Diamond Facial",
    description: "Skin polishing facial with diamond bhasma for instant fairness.",
    category: "Face",
    price: 1800,
    discountPrice: 1500,
    duration: 60,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400",
    benefits: ["Instant fairness", "Anti-aging", "Cell regeneration"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "D-Tan Pack (Face & Neck)",
    description: "Removal of sun tan using professional D-Tan packs.",
    category: "Face",
    price: 500,
    duration: 30,
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400",
    benefits: ["Removes tan", "Evens skin tone", "Cooling effect"],
    featured: false,
    popular: true,
    isActive: true
  },

  // Eyebrows & Eyes
  {
    name: "Eyebrow Threading",
    description: "Shaping of eyebrows using threading technique.",
    category: "Eyebrows & Eyes",
    price: 50,
    duration: 10,
    image: "https://images.unsplash.com/photo-1582791653818-fb1c8cc93006?auto=format&fit=crop&q=80&w=400",
    benefits: ["Perfect shape", "Painless technique", "Long-lasting"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "Upper Lip Threading",
    description: "Removal of upper lip hair.",
    category: "Eyebrows & Eyes",
    price: 30,
    duration: 5,
    image: "https://images.unsplash.com/photo-1512496015851-a1fbaf69289b?auto=format&fit=crop&q=80&w=400",
    benefits: ["Clean look", "Quick service"],
    featured: false,
    popular: true,
    isActive: true
  },

  // Waxing
  {
    name: "Full Arms Waxing (Rica)",
    description: "Painless Rica wax for full arms.",
    category: "Waxing",
    price: 450,
    duration: 20,
    image: "https://images.unsplash.com/photo-1579590892257-2e1d0354124f?auto=format&fit=crop&q=80&w=400",
    benefits: ["Painless", "Removes tan", "Slow hair growth"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "Full Legs Waxing (Rica)",
    description: "Painless Rica wax for full legs.",
    category: "Waxing",
    price: 650,
    duration: 30,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400",
    benefits: ["Smooth skin", "Painless", "Removes tan"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "Full Body Wax (Chocolate)",
    description: "Full body chocolate waxing.",
    category: "Waxing",
    price: 1500,
    discountPrice: 1299,
    duration: 90,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400",
    benefits: ["Nourishing", "Less pain", "Aromatic"],
    featured: true,
    popular: false,
    isActive: true
  },

  // Body
  {
    name: "Spa Pedicure",
    description: "Relaxing foot spa with scrub, massage and mask.",
    category: "Body",
    price: 600,
    duration: 45,
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe459e98b?auto=format&fit=crop&q=80&w=400",
    benefits: ["Soft heels", "Relaxation", "Removes dead skin"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "Spa Manicure",
    description: "Relaxing hand spa with scrub, massage and mask.",
    category: "Body",
    price: 500,
    duration: 40,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400",
    benefits: ["Soft hands", "Relaxation", "Nail care"],
    featured: false,
    popular: true,
    isActive: true
  },
  {
    name: "Full Body Polishing",
    description: "Exfoliating and hydrating full body polish.",
    category: "Body",
    price: 2500,
    discountPrice: 1999,
    duration: 120,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400",
    benefits: ["Glowing skin", "Removes dead skin", "Deep hydration"],
    featured: true,
    popular: false,
    isActive: true
  },

  // Makeup
  {
    name: "Bridal HD Makeup",
    description: "High Definition flawless makeup for your special day.",
    category: "Makeup",
    price: 12000,
    duration: 180,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=400",
    benefits: ["Flawless finish", "Long-lasting", "Camera-ready"],
    featured: true,
    popular: true,
    isActive: true
  },
  {
    name: "Party Makeup",
    description: "Elegant makeup for parties and events.",
    category: "Makeup",
    price: 2500,
    duration: 60,
    image: "https://images.unsplash.com/photo-1512496015851-a1fbaf69289b?auto=format&fit=crop&q=80&w=400",
    benefits: ["Customized look", "Long-lasting", "Enhances features"],
    featured: false,
    popular: true,
    isActive: true
  }
];

const generateServices = () => {
    let finalServices = [...services];
    // Replicate to reach ~50 services
    const categories = ["Hair", "Face", "Eyebrows & Eyes", "Waxing", "Body", "Makeup"];
    for(let i=0; i<35; i++) {
        let baseService = services[i % services.length];
        finalServices.push({
            ...baseService,
            name: `${baseService.name} - Variation ${i+1}`,
            category: categories[i % categories.length]
        });
    }
    return finalServices;
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB...");
    await Service.deleteMany();
    console.log("Cleared existing services.");
    
    const items = generateServices();
    await Service.insertMany(items);
    console.log(`Successfully seeded ${items.length} services!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
};

seedDB();
