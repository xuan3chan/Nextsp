import React from "react";

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
    <div>
      <div
        onClick={addToCart}
        className="btn p-1 flex justify-center btn-addCart"
      >
        Thêm Vào Giỏ
      </div>
    </div>
  );
}

export default ButtonAddToCart;
