const API_URL = "http://localhost:1616/newcart/1";
class CartService {
  async get() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error getting cart items");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting cart items:", error);
      throw error;
    }
  }

  async getCartTotal() {
    try {
      const cartItems = await this.get();
      let totalPrice = 0;

      for (const item of cartItems) {
        const itemPrice = item.price * item.quantity;
        totalPrice += itemPrice;
      }

      console.log(totalPrice + " total price");
      return totalPrice;
    } catch (error) {
      // Handle the error appropriately, such as displaying an error message
      console.error("Error calculating total price:", error);
      throw error;
    }
  }

  async add(p, quantity) {
    try { 
      console.log("service p");
      console.log(p);
      console.log("service amount");
      console.log(quantity);
      const cartItems = await this.get();
      const existingItem = cartItems.find((item) => item.storeId === p.storeId);
      console.log("service existing item", existingItem);
  
      if (existingItem) {
        const response = await fetch(`${API_URL}/${existingItem.storeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({quantity:quantity}),
        });
  
        if (!response.ok) {
          throw new Error("Error updating item quantity in cart");
        }
      } else {
        // Item is not in the cart, add a new item
        const newItem = { ...p, quantity, storeId: p.storeId }; // Assign the storeId property
        console.log("new item");
        console.log(newItem);
        const item = {
          storeId: newItem.storeId,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: newItem.quantity,
        };
        console.log(JSON.stringify(item));
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
  
        if (!response.ok) {
          throw new Error("Error adding item to cart");
        }
      }
  
      const updatedCartItems = await this.get();
      return updatedCartItems;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  }

  async remove(id) {
    try {
      console.log("to remove from cart" + id)
      const url = `${API_URL}/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error removing item from cart");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      throw error;
    }
  }

  async removeAll() {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error clearing cart");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
}

export default CartService;
