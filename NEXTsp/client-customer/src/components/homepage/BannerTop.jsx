import React from "react";
import "../../assets/css/homepage.css";
import bannerTop from "../../assets/img/banner_top.png";
import BannerImg from "../../assets/img/banner/banner_center.png";

function BannerTop(props) {
  return (
    <div>
      <img src={bannerTop} alt="" className="banner_top z-30 fixed top-0" />
    </div>
  );
}

export default BannerTop;
