const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require("../Models/CartModel");

// Get all cart items for a specific client
router.get("/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const cart = await Cart.find({ clientId: clientId });
    if (cart.length === 0) {
      console.log("New cart");
      const newCart = new Cart({ clientId: clientId });
      await newCart.save();
      res.json(newCart.cartItems);
    } else {
      console.log(`/cart/${clientId}, GET - Retrieve cart items for client`);
      res.json(cart[0].cartItems);
    }
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ error: "Error getting cart items" });
  }
});

// Get cart total price for a specific client
router.get("/:clientId/total", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const cart = await Cart.find({ clientId: clientId });
    let totalPrice = 0;

    for (const item of cart.cartItems) {
      const itemPrice = item.price * item.quantity;
      totalPrice += itemPrice;
    }

    console.log(
      `/cart/${clientId}/total, GET - Retrieve total price for client`
    );
    res.json({ totalPrice });
  } catch (error) {
    console.error("Error calculating total price:", error);
    res.status(500).json({ error: "Error calculating total price" });
  }
});

// Add item to cart for a specific client
router.post("/:clientId/", async (req, res) => {
  try {
    console.log("test");
    const clientId = req.params.clientId;
    const { storeId, name, price, image, quantity } = req.body;

    // Check if there is an existing cart for the client
    const existingCart = await Cart.findOne({ clientId: clientId });

    if (existingCart) {
      // Existing cart found, add/update the item in the cartItems array
      const existingItemIndex = existingCart.cartItems.findIndex(
        (item) => item.storeId == storeId
      );

      if (existingItemIndex !== -1) {
        // Existing item found, update its quantity
        console.log(
          `current quantity - ${existingCart.cartItems[existingItemIndex].quantity}`
        );
        existingCart.cartItems[existingItemIndex].quantity +=
          parseInt(quantity);
        console.log(
          `after quantity - ${existingCart.cartItems[existingItemIndex].quantity}`
        );
      } else {
        // Existing item not found, add a new item to the cartItems array
        existingCart.cartItems.push({
          storeId: String(storeId),
          name,
          price,
          image,
          quantity: parseInt(quantity),
        });
      }
      console.log(existingCart);
      await existingCart.save();
      await mongoose.connection.db
        .collection("carts")
        .updateOne(
          { clientId: clientId },
          { $set: { cartItems: existingCart.cartItems } }
        );
      console.log(`/cart/${clientId}/, POST - Item added to existing cart`);
      res.json(existingCart.cartItems);
    } else {
      // No existing cart found, create a new cart and save it
      const newCart = new Cart({
        clientId,
        cartItems: [
          { storeId, name, price, image, quantity: parseInt(quantity) },
        ],
      });
      await newCart.save();
      console.log(`/cart/${clientId}/, POST - New cart created and item added`);
      res.json(newCart.cartItems);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Error adding item to cart" });
  }
});

router.put("/:clientId/:storeId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { storeId } = req.params;
    let { quantity } = req.body;
    console.log(`storeId-${storeId}, quantity-${quantity}`);
    // Find the item in the cart
    const cart = await Cart.findOne({ clientId: clientId });
    let item = cart.cartItems.find((item) => item.storeId == storeId);
    if (item) {
      let newQuantity = item.quantity + quantity;
      item = { ...item, quantity: newQuantity };
      const itemIndex = cart.cartItems.findIndex(
        (item) => item.storeId == storeId
      );
      cart.cartItems[itemIndex] = item; // Update the cartItems array with the modified item
      console.log(item);
      await cart.save();
      console.log("saved");
      return res.status(200).json(cart.cartItems);
    } else {
      return res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    res.status(500).json({ error: "Error updating item quantity in cart" });
  }
});

// Remove item from cart by storeId for a specific client
router.delete("/:clientId/:storeId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const { storeId } = req.params;
    let cart = await Cart.findOne({ clientId: clientId });
    if (cart) {
      cart.cartItems = cart.cartItems.filter(
        (item) => item.storeId !== storeId
      );
      cart.save();
      console.log(
        `/cart/${clientId}/${storeId}, DELETE - id-${storeId} has been removed from the cart`
      );
      cart.cartItems;
      res.json(cart.cartItems);
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Error removing item from cart" });
  }
});

// Clear cart for a specific client
router.delete("/:clientId/", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    let cart = await Cart.findOne({ clientId: clientId });
    if (cart) {
      cart.cartItems = [];
      cart.save();
      console.log(`/cart/${clientId}/, DELETE - Cart cleared for client`);
      res.json([]);
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Error clearing cart" });
  }
});

module.exports = router;
