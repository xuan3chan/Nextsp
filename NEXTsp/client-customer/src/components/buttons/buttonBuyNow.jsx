import React from "react";
import { Link } from "react-router-dom";
function ButtonBuyNow(props) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newItem = props.product;
  const [cartItems, setCart] = React.useState(cart);
  const updatedCart = [...cart, props.product];

  const buyNowBtn = () => {
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
    window.location.href = "/CartPage";
  };
  return (
    <Link to="/CartPage">
      <div className="btn-BuyNow btn text-white text-center p-2 flex flex-colflex items-center contents-center justify-center rounded-sm">
        <div className=" cursor-pointer" onClick={buyNowBtn}>
          Mua Ngay
        </div>
      </div>
    </Link>
  );
}

export default ButtonBuyNow;
