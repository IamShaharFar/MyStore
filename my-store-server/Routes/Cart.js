const express = require("express");
const router = express.Router();
const CartItem = require("../Models/CartItemModel");

// Get all cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    console.log("/cart , Get. cart items" );
    res.json(cartItems);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Error getting cart items" });
  }
});

// Get cart total price
router.get("/total", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    let totalPrice = 0;

    for (const item of cartItems) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }

    console.log("/cart/total, Get. " + totalPrice + " total price");
    res.json({ totalPrice });
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({ error: "Error calculating total price" });
  }
});

// Add item to cart
router.post("/", async (req, res) => {
  try {
    const { storeId, name, price, image, quantity } = req.body;
    const existingItem = await CartItem.findOne({ storeId });

    if (existingItem) {
      // Item is already in the cart, update the quantity
      const updatedCartItem = await CartItem.updateOne({ storeId }, { $set: { quantity: quantity } });
  console.log("Item already exists in the cart, quantity updated");
    } else {
      // Item is not in the cart, add a new item
      const newItem = new CartItem({ storeId, name, price, image, quantity });
      await newItem.save();
      console.log("item added to the cart " + newItem)
    }

    const updatedCartItems = await CartItem.find();
    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
});

// Update item quantity in cart
router.put("/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const { quantity } = req.body;

    // Find the item in the cart
    const cartItem = await CartItem.findOne({ storeId });

    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Update the quantity
    cartItem.quantity = quantity;
    await cartItem.save();
    console.log(`/cart/:storeId, Put. ${quantity} quantity updated for id-${storeId}`)

    // Fetch updated cart items
    const updatedCartItems = await CartItem.find();
    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    res.status(500).json({ error: "Error updating item quantity in cart" });
  }
});


// Remove item from cart by storeId
router.delete("/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    await CartItem.deleteMany({ storeId });
    console.log(`/cart/:storeId, Delete. id-${storeId} has deleted from the cart`);
    const updatedCartItems = await CartItem.find();
    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Error removing item from cart" });
  }
});

// Clear cart
router.delete("/", async (req, res) => {
  try {
    await CartItem.deleteMany();
    console.log("all the cart items has been deleted");
    res.json([]);
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Error clearing cart" });
  }
});

module.exports = router;
