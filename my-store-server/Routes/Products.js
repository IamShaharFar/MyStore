const express = require("express");
const router = express.Router();
const ProductModel = require("../Models/ProductModel");


// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      res.status(404).json({ error: `Product with ID ${id} not found` });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: `Error fetching product with ID ${id}` });
  }
});

// Create a new product
router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;
  try {
    const newProduct = new ProductModel(...product);
    const savedProduct = await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: `Error creating product with ID ${id}` });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ error: `Product with ID ${id} not found` });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: `Error deleting product with ID ${id}` });
  }
});

module.exports = router;
