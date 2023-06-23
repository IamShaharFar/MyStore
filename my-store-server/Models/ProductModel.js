const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  storeId: Number,
  name: String,
  description: String,
  brand: String,
  price: Number,
  image: String,
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
