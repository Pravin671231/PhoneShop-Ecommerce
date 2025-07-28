const express = require("express");
const {
  createAddr,
  getAllAddr,
  updateAddr,
  deleteAddr,
} = require("../controllers/addressController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// Create Address
router.post("/", protect, createAddr);

// Get all addresses of user
router.get("/", protect, getAllAddr);

// Update address
router.put("/:id", protect, updateAddr);

// Delete address
router.delete("/:id", protect, deleteAddr);

module.exports = router;
