require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const Service = require("./src/models/Service");
const Gallery = require("./src/models/Gallery");

const seedData = async () => {
    try {
        await connectDB();

        console.log("Seeding database...");

        // 1. Seed Services
        await Service.deleteMany({});
        console.log("Cleared existing services...");

        const services = [
            {
                name: "Nauvari Saree Stitching",
                category: "Fashion",
                description: "Authentic traditional Maharashtrian Nauvari Saree stitching with perfect fit and pleats.",
                price: 1500,
                duration: 60,
                image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop",
                isActive: true
            },
            {
                name: "Bridal Makeup Package",
                category: "Beauty",
                description: "Complete premium bridal makeup including hair styling, draping, and HD makeup.",
                price: 15000,
                duration: 180,
                image: "https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=400&fit=crop",
                isActive: true
            },
            {
                name: "Designer Blouse Stitching",
                category: "Fashion",
                description: "Custom designer blouse stitching with advanced patterns and perfect fitting.",
                price: 800,
                duration: 60,
                image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop",
                isActive: true
            },
            {
                name: "Aari Work (Heavy)",
                category: "Fashion",
                description: "Intricate handcrafted Aari embroidery for bridal wear and designer outfits.",
                price: 3500,
                duration: 60,
                image: "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=400&fit=crop",
                isActive: true
            },
            {
                name: "Premium Hair Spa",
                category: "Hair",
                description: "Deep nourishing hair spa treatment for silky, smooth, and healthy hair.",
                price: 1200,
                duration: 60,
                image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&fit=crop",
                isActive: true
            }
        ];

        await Service.insertMany(services);
        console.log("Inserted Sample Services!");

        // 2. Seed Gallery
        await Gallery.deleteMany({});
        console.log("Cleared existing gallery images...");

        const galleryImages = [
            {
                title: "Royal Nauvari Bride",
                image: "https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=400&fit=crop",
                category: "Traditional Wear"
            },
            {
                title: "Elegant Designer Dress",
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&fit=crop",
                category: "Fashion"
            },
            {
                title: "Premium Bridal Look",
                image: "https://images.unsplash.com/photo-1516975080661-460d3fcb6215?w=400&fit=crop",
                category: "Bridal"
            },
            {
                title: "Intricate Aari Work",
                image: "https://plus.unsplash.com/premium_photo-1682089872205-dbbb4af4bf52?w=400&fit=crop",
                category: "Aari Work"
            },
            {
                title: "Designer Blouse Pattern",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?w=400&fit=crop",
                category: "Fashion"
            },
            {
                title: "Hair Styling & Spa",
                image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&fit=crop",
                category: "Hair"
            }
        ];

        await Gallery.insertMany(galleryImages);
        console.log("Inserted Sample Gallery Images!");

        console.log("Database seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedData();
