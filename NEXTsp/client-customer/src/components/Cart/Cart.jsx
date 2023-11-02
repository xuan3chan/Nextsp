import React from "react";
import { useCart } from "./CartContext"; // Import the CartContext

function ShoppingCart() {
  const { cart } = useCart(); // Access the cart state from the context

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>{item.nameProduct}</li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
