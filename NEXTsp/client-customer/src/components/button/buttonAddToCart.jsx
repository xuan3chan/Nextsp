import React from "react";
import "../../assets/css/main.css";

function ButtonAddToCart(props) {
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = () => {
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(props.product);
  localStorage.setItem("cart", JSON.stringify(cart));
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
