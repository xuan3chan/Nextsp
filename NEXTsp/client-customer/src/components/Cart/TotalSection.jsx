import React from "react";
import { useState } from "react";

function TotalSection(props) {
  const [cart, setCart] = useState([]);
  const totalPrice = localStorage.getItem("totalPrice");
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  return (
    <div>
      <div className=" border-t-2 mb-8 border-black border-opacity-30 mt-10">
        <p className="totalShip w-full flex relative mt-4 ">
          <p className="mainText w-30">Phí Vận Chuyển:</p>
          <p className="subText absolute right-4 ">Miễn Phí</p>
        </p>
        <p className="totalOrder flex relative">
          <p className="mainText w-30">Tổng Tiền:</p>
          <p className="subText absolute right-4 ">{formatPrice(totalPrice)}</p>
        </p>
      </div>
    </div>
  );
}

export default TotalSection;
