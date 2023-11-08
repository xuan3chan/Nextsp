import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
function ProductAdded(props) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3101/api/products/getall").then((res) => {
      console.log(res.data.products);
    });
  }, []);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const imgLink = [cart[0].images[0]];
  const productNameAdded = [cart[0].nameProduct];
  const productPriceAdded = [cart[0].price];
  const productOldPriceAdded = [cart[0].oldprice];
  return (
    <div>
      <div className="flex w-full h-40 items-center content-center gap-4 border-b-2">
        <div className="flex flex-col w-24 h-30 ">
          <img src={imgLink} alt="" className="productImage" />
          <button className="deleteBtn">Xóa</button>
        </div>
        <div className="productInfo flex gap-20">
          <h2 className="productTitle">{productNameAdded}</h2>
          <div className="flex flex-col">
            <div className="flex flex-col items-end">
              <p className="productPrice">{productPriceAdded}</p>
              <p className="productOldPrice">{productOldPriceAdded}</p>
            </div>
            <p className="productQuantity flex">
              <button className="btnCart" onClick={decrement}>
                -
              </button>
              <div className="quality-counter">{count}</div>
              <button className="btnCart" onClick={increment}>
                +
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdded;
