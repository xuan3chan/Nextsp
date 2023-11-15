import React from "react";
import "../../assets/css/homepage.css";
import BannerImage from "../../assets/img/banner_scrl_img.png";
import ButtonPrevHero from "../../assets/icons/chevron-left.svg";
import ButtonNextHero from "../../assets/icons/chevron-right.svg";
function BannerScroll() {
  return (
    <div>
      <div className="BannerScroll-background">
        <div className="BannerScroll-Arrow__left">
          <img src={ButtonPrevHero} alt="Prev" />
        </div>
        <div className="BannerScroll-left">
          <div className="BannerScroll-content">
            Mọi Thứ Bạn Muốn Đều Có tại shop.
          </div>
          <button className="px-8 py-2 mt-10 hover:bg-gray-800 bg-black text-white">
            Mua ngay
          </button>
        </div>
        <div className="BannerScroll-right">
          <img src={BannerImage} alt="Ảnh Banner"></img>
        </div>
        <div className="BannerScroll-Arrow__right">
          <img src={ButtonNextHero} alt="Next" />
        </div>
      </div>
    </div>
  );
}

export default BannerScroll;
