import React from "react";
import { Link } from "react-router-dom";
function ButtonBuyNow(props) {
  const handleBuyBtn = () => {
    alert("Không Bán");
  };

  return (
    <Link to="/CartPage">
      <div className="btn-BuyNo btn text-white text-center p-2 flex flex-colflex items-center contents-center justify-center rounded-sm">
        <a className=" cursor-pointer" onClick={handleBuyBtn}>
          Mua Ngay
        </a>
      </div>
    </Link>
  );
}

export default ButtonBuyNow;
