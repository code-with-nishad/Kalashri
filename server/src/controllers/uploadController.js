const asyncHandler = require("../utils/asyncHandler");
const sendResponse = require("../utils/sendResponse");

exports.uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        return sendResponse(res, 400, false, "Please upload an image file.", null);
    }

    // req.file.path contains the public Cloudinary URL created by multer-storage-cloudinary
    const imageUrl = req.file.path;

    sendResponse(res, 200, true, "Image uploaded successfully", { url: imageUrl });
});
