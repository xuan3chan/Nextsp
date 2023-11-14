import React from "react";
import "../../assets/css/main.css";
import { useState, useEffect } from "react";
function ButtonAddToCart(props) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newItem = props.product;
  const [cartItems, setCart] = React.useState(cart);
  const updatedCart = [...cart, props.product];
  const addToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // If it exists, increase the count of that item
      setCart((prevCart) =>
        prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      // If it doesn't exist, add the new item to the cart
      setCart((prevCart) => [...prevCart, { ...newItem, count: 1 }]);
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  return (
    <div className="w-1/2">
      <div
        onClick={addToCart}
        className="btn-AddToCart bg-black text-white text-center p-2 flex items-center contents-center justify-center rounded-sm cursor-pointer"
      >
        <p>Thêm vào giỏ hàng</p>
      </div>
    </div>
  );
}

export default ButtonAddToCart;
