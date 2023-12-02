import React from "react";
import bgBannerSales from "../../assets/img/Apple-Iphone-15-Pro-PNG.png";
const BannerSales = () => {


  return (
    <div className="w-full h-[490px] bg-[#EDF1F3] relative flex justify-center items-center">
      <img
        src={bgBannerSales}
        alt="SALES"
        className="absolute w-[600px] right-0 bottom-0 px-5 "
      />
      <div className="w-[900px] z-10">
        <p className="text-2xl">Giảm giá 10%</p>
        <h1 className="text-6xl font-lato-light font-light mt-2">
          Các mặt hàng iphone
        </h1>
        <button className="px-8 py-2 mt-10 hover:bg-gray-800 bg-black text-white">
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default BannerSales;
