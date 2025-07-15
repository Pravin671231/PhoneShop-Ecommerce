const express = require("express");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  markOrderAsPaid,
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/pay", protect, markOrderAsPaid);
module.exports = router;
