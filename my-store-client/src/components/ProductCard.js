import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import CartService from "../services/CartService";
import styles from "../Styles/ProductCard.css"

const ProductCard = ({storeId , name, price, image }) => {
  const service = new CartService();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleClick = () => {
    AddToCart();
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  const AddToCart = async () => {
    try {
      let item = { storeId:storeId, name:name, price:price, image:image }
      console.log("product card")
      console.log(item)
      await service.add({ storeId, name, price, image }, 1);
      console.log("Item added to cart successfully");
      // Add any additional logic after the item is added to the cart
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle the error appropriately
    }
  };

  return (
    <div style={styles} className="product-card" key={storeId}>
      <img src={image} className="product-card-img" alt={name}/>
      <div className="product-card-info">
        <p className="text-title">{name}</p>
        <p className="text-body">Product description and details</p>
      </div>
      <div className="product-card-footer">
        <span className="text-title">${price}</span>
        <div className="position-relative">
          <button onClick={handleClick} className="btn btn-primary border-0">
            <i className="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          {showAnimation && <span className="cart-animation">+1</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
