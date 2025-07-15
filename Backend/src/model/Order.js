const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, default: "dummy" },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Shipped"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
