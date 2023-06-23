import React, { useState, useEffect, useMemo } from "react";
import CartService from "../services/CartService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const service = useMemo(() => new CartService(), []);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = () => {
      service
        .get()
        .then((items) => {
          setCartItems(items);
          const cartTotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          setTotal(cartTotal);
        })
        .catch((error) => {
          console.error("Error retrieving cart items:", error);
        });
    };

    fetchCartItems();
  }, [service]);

  const handleRemoveItem = async (itemId) => {
    try {
      await service.remove(itemId);
      const updatedCartItems = await service.get();
      setCartItems(updatedCartItems);
      setTotal(
        updatedCartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
      );
      console.log("Item removed successfully");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (productId, amount) => {
    let toUpdateItem;
    const updatedCartItems = cartItems.map((item) => {
      if (item.storeId === productId) {
        // Update the quantity of the matching product
        let newQuantity = item.quantity + amount;
        toUpdateItem = item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    try {
      console.log("amount - " + amount);
      await service.add(toUpdateItem, amount);
      console.log("Cart updated successfully");
      // Add any additional logic after the cart is updated

      // Update the total after successful cart update
      const updatedTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(updatedTotal);
    } catch (error) {
      console.error("Error updating cart:", error);
      // Handle the error appropriately
    }
  };

  const createOrder = async (data, actions) => {
    console.log(cartItems);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toString(), // Use the updated PayPal total
          },
        },
      ],
    });
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="card mb-3" key={item.storeId}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-text">
                      Price: {item.price * item.quantity}$
                    </p>
                    <div>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => handleQuantityChange(item.storeId, -1)}
                        disabled={item.quantity === 0}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-primary ms-2"
                        onClick={() => handleQuantityChange(item.storeId, 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleRemoveItem(item.storeId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <h3>
        To pay:{" "}
        {/* {cartItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)} */}
        {total}$
      </h3>
      <div className="container">
        <div className="text-center mt-4">
          <PayPalScriptProvider
            options={{
              clientId:
                "AdiNMdfhMPFOnbqAV6jXdfQicL9IrWC3wxa7mDRS2Yw4pLGlW94f40BPkVq8TUpMa5VVXGK3jZacjch8",
              components: "buttons",
              currency: "USD",
            }}
          >
            {total > 0 ? (
              <div className="d-flex justify-content-center">
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={(data, actions) => {
                    return actions.order
                      .capture()
                      .then(console.log("succefully payed"));
                  }}
                />
              </div>
            ) : (
              <div>
                <div className="alert alert-secondary" role="alert">
                  Please insert some products to your cart
                </div>
              </div>
            )}
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Cart;
