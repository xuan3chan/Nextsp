import React from "react";
import { useState } from "react";
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
  const imageLink =
    "https://product.hstatic.net/200000722513/product/image-removebg-preview__49_.png_b1bb06c9d6bc4aefb692eb347a9f784e_grande.jpg";
  return (
    <div>
      <div className="flex w-full h-40 items-center content-center gap-4 border-b-2">
        <div className="flex flex-col w-24 h-30 ">
          <img src={imageLink} alt="" className="productImage" />
          <button className="deleteBtn">Xóa</button>
        </div>
        <div className="productInfo flex gap-20">
          <h2 className="productTitle">Màn hình cong ASUS TUF GAMING VG34VQL3A 34" 2K 180Hz HDR chuyên game</h2>
          <div className="flex flex-col">
          <div className="flex flex-col items-end">
          <p className="productPrice">30.000.000</p>
          <p className="productOldPrice">30.000.000</p>
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
