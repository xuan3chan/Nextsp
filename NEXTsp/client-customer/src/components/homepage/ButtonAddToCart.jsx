import React from "react";

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
    <div>
      <div onClick = {addToCart} className="btn p-1 flex justify-center btn-addCart">
        Thêm Vào Giỏ
      </div>
    </div>
  );
}

export default ButtonAddToCart;
