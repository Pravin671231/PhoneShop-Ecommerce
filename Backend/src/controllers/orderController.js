const Order = require("../model/Order");
const Product = require("../model/Product");

//create Orders
const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ message: "No orders" });
  }
  try {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  } catch (error) {
    console.log("Error in createOrder controller", error);
    res.status(400).json({ message: error.message });
  }
};

//get myOrder

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product",
      "title price"
    );
    res.json(orders);
  } catch (error) {
    console.log("Error in getMyOrder controller", error);
    res.status(500).json({ message: error.message });
  }
};

//get allOrders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "title price");
    res.json(orders);
  } catch (error) {
    console.log("Error in getAllOrder controller", error);
    res.status(500).json({ message: error.message });
  }
};

//paid controllers
const markOrderAsPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.isPaid) {
      // Optionally handle case if order is already paid
      return res.status(400).json({ message: "Order is already paid" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.status = "Paid";

    // Decrease stock of each product in the order
    for (const item of order.orderItems) {
      const product = await Product.findById(item.product);

      if (product) {
        product.countInStock -= item.qty;
        if (product.countInStock < 0) product.countInStock = 0; // avoid negative stock

        await product.save();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error in markOrderAsPaid controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, markOrderAsPaid };
