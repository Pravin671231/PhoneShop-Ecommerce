const Product = require("../model/Product");

//getProduct
const getProduct = async (req, res) => {
  const product = await Product.find({});
  try {
    if (product) {
      res.status(200).json({ count: product.length, product });
    }
  } catch (error) {
    console.log("Error in getProduct controller", error);
  }
};

//get Product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in getProductById controller", error);
    res.status(400).json({ message: "Invalid Product Id" });
  }
};

//create Products
const createProduct = async (req, res) => {
  const { title, description, price, brand, countInStock,rating } = req.body;
  const image = req.file?.path || req.body.image;
  try {
    const product = await Product.create({
      title,
      description,
      price,
      brand,
      image,
      rating,
      countInStock,
    });
    const created = await product.save();
    res.status(201).json(created);
  } catch (error) {
    console.log("Error in createProduct controller", error);
    res.status(400).json({ message: error.message });
  }
};

//updateProduct
const updateProduct = async (req, res) => {
  const { title, description, price, brand,rating, countInStock } = req.body;
    const image = req.file?.path || req.body.image;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.brand = brand || product.brand;
      product.image = image || product.image;
      product.rating = rating || product.rating;
      product.countInStock = countInStock || product.countInStock;

      const updated = await product.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.log("Error in updateProduct controller", error);
    res.status(400).json({ message: error.message });
  }
};

//deleteProduct
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in deleteProduct controller", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
