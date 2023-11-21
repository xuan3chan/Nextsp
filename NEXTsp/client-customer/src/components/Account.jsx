import React, { useState } from "react";
import Header from "./Header";
import Tracking from "./AccountPage/Tracking";
import ProfileImage from "../assets/img/profileAvt.png";
import Address from "./AccountPage/Address";
import Logout from "./AccountPage/Logout";
import InforAccount from "./AccountPage/InforAccount";
import { FaUserAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Footer from "./Footer";
function Account() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <InforAccount />;
      case "tracking":
        return <Tracking />;
      case "address":
        return <Address />;
      case "logout":
        return <Logout />;
      default:
        return null;
    }
  };
  const userName = localStorage.getItem("accountName");
  return (
    <div className="wrapper bg-cart">
      <Header></Header>
      <div className=" h-full">
        <div className="flex gap-4 h-full w-3/4 mr-auto ml-auto">
          <div className="left-sidebar flex flex-col mt-20 w-1/5 bg-white gap-2">
            <div className="Profile-name flex items-center border-b-2 border-black p-4 gap-4">
              <div className="profileAvatar w-16 h-16 text-lg">
                <img src={ProfileImage} alt="" />
              </div>
              <div className="profileName ">
                <p>Xin Chào {userName}</p>
              </div>
            </div>
            <div className="menu-section flex flex-col items-start p-2 gap-4 ml-4 mt-4">
              <button
                className="menu-item flex items-center gap-2 text-lg"
                onClick={() => setActiveTab("profile")}
              >
                <FaUserAlt />
                Thông tin tài khoản
              </button>
              <button
                className="menu-item flex items-center gap-2 text-lg"
                onClick={() => setActiveTab("tracking")}
              >
                <FaClipboardCheck />
                Kiểm tra trạng thái
              </button>
              <button
                className="menu-item flex items-center gap-2 text-lg"
                onClick={() => setActiveTab("address")}
              >
                <IoLocation />
                Địa Chỉ
              </button>
              <button
                className="menu-item flex items-center gap-2 text-lg"
                onClick={() => setActiveTab("logout")}
              >
                <FaSignOutAlt />
                Đăng Xuất
              </button>
            </div>
          </div>
          <div
            id="content"
            className="bg-white flex flex-col mt-20 h-full w-3/4 gap-2 p-4"
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
