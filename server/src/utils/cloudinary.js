const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
    api_key: process.env.CLOUDINARY_API_KEY || "demo_key",
    api_secret: process.env.CLOUDINARY_API_SECRET || "demo_secret",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "salon-uploads",
        allowedFormats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    },
});

const upload = multer({ storage: storage });

module.exports = {
    cloudinary,
    upload,
};
