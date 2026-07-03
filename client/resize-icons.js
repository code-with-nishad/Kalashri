import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputImg = "C:/Users/NISHAD/.gemini/antigravity/brain/4601691a-aeed-49ee-84ec-c49a8905357b/media__1783076084777.jpg";
const publicDir = "c:/Users/NISHAD/OneDrive/Desktop/Kalashri/Kalashri/client/public";

async function generateIcons() {
  try {
    // 1. favicon.png (64x64 for good resolution)
    await sharp(inputImg)
      .resize(64, 64)
      .toFile(path.join(publicDir, "favicon.png"));
      
    // 2. apple-touch-icon.png (180x180)
    await sharp(inputImg)
      .resize(180, 180)
      .toFile(path.join(publicDir, "apple-touch-icon.png"));

    // 3. icon-192.png (192x192)
    await sharp(inputImg)
      .resize(192, 192)
      .toFile(path.join(publicDir, "icons", "icon-192.png"));

    // 4. icon-512.png (512x512)
    await sharp(inputImg)
      .resize(512, 512)
      .toFile(path.join(publicDir, "icons", "icon-512.png"));

    // 5. maskable-icon.png (512x512)
    await sharp(inputImg)
      .resize(512, 512)
      .toFile(path.join(publicDir, "icons", "maskable-icon.png"));

    console.log("Icons generated successfully.");
  } catch (error) {
    console.error("Error generating icons:", error);
  }
}

generateIcons();
