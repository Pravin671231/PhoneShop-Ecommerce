const express = require("express");
const {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middlewares/upload");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getProduct);
router.get("/:id", getProductById);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
