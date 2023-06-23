const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
module.exports = CartItem;
