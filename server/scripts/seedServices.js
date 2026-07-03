require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Service = require('../src/models/Service');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalashri';

const services = [
  // Nauvari Sarees
  { name: "Brahmani Nauvari", category: "Nauvari Saree", price: 1100, displayPrice: "₹1100", duration: 60, description: "Authentic Brahmani style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Peshawai Nauvari", category: "Nauvari Saree", price: 1500, displayPrice: "₹1500", duration: 60, description: "Royal Peshawai style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Mastani Nauvari", category: "Nauvari Saree", price: 1500, displayPrice: "₹1500", duration: 60, description: "Elegant Mastani style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Rajlaxmi Nauvari", category: "Nauvari Saree", price: 1700, displayPrice: "₹1700", duration: 60, description: "Premium Rajlaxmi style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },
  { name: "Lavanichi Nauvari", category: "Nauvari Saree", price: 1100, displayPrice: "₹1100", duration: 60, description: "Traditional Lavanichi style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop" },
  { name: "Jijau Nauvari", category: "Nauvari Saree", price: 1000, displayPrice: "₹1000", duration: 60, description: "Classic Jijau style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Mhalasa Nauvari", category: "Nauvari Saree", price: 1100, displayPrice: "₹1100", duration: 60, description: "Graceful Mhalasa style Nauvari saree stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Gent's Sovale", category: "Nauvari Saree", price: 300, displayPrice: "₹300", duration: 30, description: "Traditional Gent's Sovale stitching.", image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=400&fit=crop" },

  // Blouse Stitching
  { name: "4 Tuck Blouse", category: "Blouse Stitching", price: 300, displayPrice: "₹300 - ₹500", duration: 60, description: "Classic 4 Tuck blouse stitching with perfect fit.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "1 Tuck Blouse", category: "Blouse Stitching", price: 300, displayPrice: "₹300 - ₹500", duration: 60, description: "Sleek 1 Tuck blouse stitching.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Princess Cut Blouse", category: "Blouse Stitching", price: 400, displayPrice: "₹400 - ₹1000", duration: 60, description: "Elegant Princess Cut blouse for a modern look.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Katori Blouse", category: "Blouse Stitching", price: 300, displayPrice: "₹300 - ₹500", duration: 60, description: "Traditional Katori blouse stitching.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },
  { name: "Designer Blouse", category: "Blouse Stitching", price: 500, displayPrice: "Depends on design", duration: 120, description: "We stitch all types of fashionable, designer and customized blouses.", image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop" },

  // Aari Work
  { name: "Custom Aari Work", category: "Aari Work", price: 1200, displayPrice: "Starts at ₹1200", duration: 180, description: "Premium Aari Work available for Blouses, Dresses, Sarees, and Bridal Wear.", image: "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=400&fit=crop" },

  // Dresses
  { name: "Anarkali Dress", category: "Dress Stitching", price: 650, displayPrice: "₹650", duration: 120, description: "Beautiful Anarkali dress stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "One Piece Dress", category: "Dress Stitching", price: 700, displayPrice: "₹700 - ₹1000", duration: 120, description: "Custom One Piece dress stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Cigar Pant Dress", category: "Dress Stitching", price: 400, displayPrice: "₹400 - ₹600", duration: 90, description: "Modern Cigar Pant dress stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Patiyala Dress", category: "Dress Stitching", price: 400, displayPrice: "₹400 - ₹600", duration: 90, description: "Traditional Patiyala dress stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" },
  { name: "Dhoti Dress", category: "Dress Stitching", price: 400, displayPrice: "₹400 - ₹600", duration: 90, description: "Stylish Dhoti dress stitching.", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop" }
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    let added = 0;
    for (const svc of services) {
      const exists = await Service.findOne({ name: svc.name });
      if (!exists) {
        await Service.create(svc);
        added++;
        console.log("Added: " + svc.name);
      } else {
        await Service.updateOne({ name: svc.name }, svc);
        console.log("Updated: " + svc.name);
      }
    }

    console.log(`Successfully seeded ${added} new services.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
