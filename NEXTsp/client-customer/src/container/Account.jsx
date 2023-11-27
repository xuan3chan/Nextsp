import React, { useState } from "react";
import Header from "../components/Header";
import Tracking from "../components/AccountPage/Tracking";
import ProfileImage from "../assets/img/profileAvt.png";
import Address from "../components/AccountPage/Address";
import Logout from "../components/AccountPage/LogoutTracking";
import IAccount from "../components/AccountPage/IAccount";
import { FaUserAlt } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Footer from "../components/Footer";

function Account() {
  const [activeTab, setActiveTab] = useState("tracking");
  const token = localStorage.getItem("accessToken");
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <IAccount />;
      case "tracking":
        return <Tracking />;
      case "logout":
        return <Logout />;
      default:
        return null;
    }
  };

  const userName = localStorage.getItem("accountName");

  return (
    <div className="wrapper rounded-lg h-full ">
      <Header></Header>
      <div className=" max-[3000px]:">
        {token == null ? (
          <div className="flex gap-4 h-full w-3/4 mr-auto ml-auto overflow-hidden">
            <div className="left-sidebar rounded-lg h-full flex flex-col mt-20 bg-white gap-2 pb-10 overflow-hidden">
              <div className="Profile-name flex items-center border-b-2 border-black p-4 gap-4">
                <div className="profileAvatar w-16 h-16 text-lg">
                  <img src={ProfileImage} alt="" />
                </div>
                <div className="profileName ">
                  <p>Xin Chào {userName}</p>
                </div>
              </div>
              <div className="menu-section  flex flex-col items-start p-2 gap-4 ml-4 mt-4">
                <button
                  className={`menu-item flex items-center gap-2 text-lg ${
                    activeTab === "tracking" ? "active-tab" : ""
                  }`}
                  onClick={() => setActiveTab("tracking")}
                >
                  <FaClipboardCheck />
                  Kiểm tra trạng thái
                </button>
              </div>
            </div>
            <div
              id="content"
              className="bg-white rounded-lg flex flex-col mt-20 h-full w-3/4 gap-2 p-4 pb-10 overflow-hidden"
            >
              {renderContent("tracking")}
            </div>
          </div>
        ) : (
          <div className="AccountSection flex gap-4 h-full w-4/5 mr-auto ml-auto overflow-hidden">
            <div className="left-sidebar rounded-lg h-full flex flex-col mt-20 w-1/5 bg-white gap-2 pb-10 overflow-hidden">
              <div className="Profile-name flex items-center border-b-2 border-black p-4 gap-4">
                <div className="profileAvatar w-16 h-16 text-lg">
                  <img src={ProfileImage} alt="" />
                </div>
                <div className="profileName ">
                  <p>Xin Chào {userName}</p>
                </div>
              </div>
              <div className="menu-section  flex flex-col items-start p-2 gap-4 ml-4 mt-4">
                <button
                  className={`menu-item flex items-center gap-2 text-lg ${
                    activeTab === "profile" ? "active-tab" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <FaUserAlt />
                  Thông tin tài khoản
                </button>
                <button
                  className={`menu-item flex items-center gap-2 text-lg ${
                    activeTab === "tracking" ? "active-tab" : ""
                  }`}
                  onClick={() => setActiveTab("tracking")}
                >
                  <FaClipboardCheck />
                  Kiểm tra trạng thái
                </button>
                <button
                  className={`menu-item flex items-center gap-2 text-lg ${
                    activeTab === "logout" ? "active-tab" : ""
                  }`}
                  onClick={() => setActiveTab("logout")}
                >
                  {localStorage.getItem("accessToken") !== null ? (
                    <button
                      className={`logOutButton flex items-center gap-2 text-lg ${
                        activeTab === "logout" ? "active-tab" : ""
                      }`}
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("accountName");
                        localStorage.removeItem("accountRole");
                        window.location.reload();
                      }}
                    >
                      <FaSignOutAlt />
                      Đăng Xuất
                    </button>
                  ) : (
                    <div></div>
                  )}
                </button>
              </div>
            </div>
            <div
              id="content"
              className="bg-white rounded-lg flex flex-col mt-20 h-full w-3/4 gap-2 p-4 pb-10 overflow-hidden"
            >
              {renderContent()}
            </div>
          </div>
        )}
      </div>
      <Footer className="overflow-hidden"></Footer>
    </div>
  );
}

export default Account;
