import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  console.log(req.user);
  console.log("hai");
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else {
    res.status(404);
    throw new Error("Product not found");
  }
});
export const getProductsByName = asyncHandler(async (req, res) => {
  console.log("Search query:", req.query.name);

  const product = await Product.find({
    name: { $regex: new RegExp(req.query.name, "i") }, // Case-insensitive search
  });

  if (product.length > 0) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


export const updateProduct = asyncHandler(async (req, res) => {
  try {
    console.log("hai");
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
export const createProducts = asyncHandler(async (req, res) => {
  const {
    category,
    name,
    location,
    description,
    contact,
    website,
    image,
    email,
    instagram,
    facebook,
    whatsapp,
    user,
  } = req.body;

  const userExists = await Product.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const product = await Product.create({
    category,
    name,
    location,
    description,
    contact,
    website,
    image,
    user,
    email,
    instagram,
    facebook,
    whatsapp
  });
  if (product) {
    res.status(201).json({ message: "Product added successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
