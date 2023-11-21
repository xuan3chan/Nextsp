import React from "react";
import SloganItem from "./SloganItem";
import "../../assets/css/homepage.css";
import { MdOutlineSupportAgent, MdOutlineSecurity } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";

function SloganListSection() {
  return (
    <div className="flex contents-center justify-center w-full">
      <div className="SloganListSection flex flex-wrap gap-3">
        <SloganItem
          icon=<FaTruck />
          title="Giao hàng miễn phí"
          desc="Cho đơn hàng từ 500.000đ trở lên"
        />
        <SloganItem
          icon=<MdOutlineSupportAgent />
          title="Hỗ trợ 24/7"
          desc="Hotline: 1900 1000"
        />
        <SloganItem
          icon=<CiDiscount1 />
          title="Giảm giá 20%"
          desc="Cho đơn hàng từ 500.000đ trở lên"
        />
        <SloganItem
          icon=<MdOutlineSecurity />
          title="Bảo Mật Thông Tin"
          desc="Đảm bảo thông tin khách hàng được bảo mật"
        />
      </div>
    </div>
  );
}

export default SloganListSection;
