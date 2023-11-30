import React from "react";
import { Link } from "react-router-dom";
function ButtonBuyNow(props) {
  const newItem = props.product;

  // Load the cart from local storage on component mount
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = React.useState(cartFromLocalStorage);

  const buyNowBtn = () => {
    const existingItemIndex = cart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      setCart((prevCart) =>
        prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...newItem, count: 1 }]);
    }
    window.location.href = "/CartPage";
  };
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div className="btn-BuyNow btn text-white text-center p-2 flex flex-colflex items-center contents-center justify-center rounded-sm">
      <div className=" cursor-pointer" onClick={buyNowBtn}>
        Mua Ngay
      </div>
    </div>
  );
}

export default ButtonBuyNow;
