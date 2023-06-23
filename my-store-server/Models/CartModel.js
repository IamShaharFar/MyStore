const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true
  },
  cartItems: [] 
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
