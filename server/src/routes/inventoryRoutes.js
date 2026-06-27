const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
    getProducts,
    createProduct,
    updateProduct,
    logTransaction,
    getProductHistory,
} = require("../controllers/inventoryController");

// All inventory operations are for admins only
router.use(protect);
router.use(authorize("admin"));

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);

router.post("/:id/transaction", logTransaction);
router.get("/:id/history", getProductHistory);

module.exports = router;
