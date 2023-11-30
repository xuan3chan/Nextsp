import React, { Fragment } from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTask } from "react-icons/bi";
import { BsHeadphones } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import SearchFunction from "./Header/SearchFunction";
import LogoPage from "../assets/img/Logo.png";
import { FaClipboardCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

function Header(props) {
  const [Categories, setCategories] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [userId, setUserId] = useState("");
  const apiBrand = process.env.REACT_APP_GET_LIST_CATE_AND_BRAND_API;
  const apiUrl = process.env.REACT_APP_GET_USER_API;
  const token = localStorage.getItem("accessToken");
  const [activeNavItem, setActiveNavItem] = useState(null);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(activeNavItem === navItem ? null : navItem);
  };

  const handleCategoryItemClick = (event, category) => {
    // Prevent the default behavior of the link (closing the dropdown)
    event.preventDefault();
    // Handle additional logic if needed
  };
  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccountName(response.data.user.fullName);
        setUserId(response.data.user._id);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("accountName", response.data.user.fullName);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(apiBrand)
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [cart, setCart] = useState([]);
  const [counterCart, setCounterCart] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  
    const totalQuantity = cartData.reduce((total, item) => total + item.count, 0);
    setCounterCart(totalQuantity);
  }, []);
  

  return (
    <div>
      <div className="header z-20 flex justify-center relative">
        <Link to="/homepage" className="header_logo">
          <img className="" src={LogoPage} alt="" />
        </Link>
        <div className="navbar flex ">
          <Link to="/Homepage">Trang Chủ</Link>
          <div className="dropdown">
            <div className="dropdown-btn-container flex justify-center items-center">
              <div className="dropbtn flex justify-center items-center">
                <FontAwesomeIcon className="mr-1" icon={faBars} />
                <Link to="/Collection">Danh mục</Link>
                <i className="fa fa-caret-down"></i>
              </div>
              <div className="dropdown-content  flex flex-col w-48 ">
                {Categories &&
                  Categories.map((category) => {
                    if (category.status === "Active") {
                      return (
                        <div
                          className="category-item text-black flex contents-center"
                          key={category._id}
                        >
                          <a
                            className="category-link"
                            href={`/Collection/${category.nameCategory}`}
                          >
                            <span>{category.nameCategory}</span>
                            <FontAwesomeIcon
                              className="category-icon"
                              icon={faCaretRight}
                            />
                          </a>
                          <div className="brand-menu">
                            {category.brands &&
                              category.brands.map((brand) => (
                                <a
                                  className="brand-link"
                                  href={`/Collection/${category.nameCategory}/${brand.nameBrand}`}
                                  key={brand._id}
                                >
                                  {brand.nameBrand}
                                </a>
                              ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="navBar-mobile absolute left-1">
          <div className="dropdown relative">
            <div className="dropdown-btn-container flex justify-center items-center">
              <a className="dropbtn flex justify-center items-center">
                <FontAwesomeIcon className="mr-1" icon={faBars} />
                <i className="fa fa-caret-down"></i>
              </a>
              <div
                className={`${
                  activeNavItem === "item1" ? "active" : ""
                } dropdown-content dropdown-content-mb flex flex-col w-56 left-6 absolute`}
              >
                <div className="dropdown-title text-black p-3">
                  Danh Mục Sản Phẩm
                </div>
                {Categories &&
                  Categories.map((category) => {
                    if (category.status === "Active") {
                      return (
                        <div
                          className="category-item category-item-mb text-black flex contents-center w-full"
                          key={category._id}
                        >
                          <a
                            className="category-link w-full"
                            href={`/Collection/${category.nameCategory}`}
                          >
                            <span>{category.nameCategory}</span>
                          </a>
                          <FontAwesomeIcon
                            className="category-icon"
                            icon={faCaretRight}
                            onClick={(e) =>
                              handleCategoryItemClick(e, category)
                            }
                          />
                          <div className="brand-menu-mb  flex flex-col w-full">
                            {category.brands &&
                              category.brands.map((brand) => (
                                <a
                                  className="brand-link w-full"
                                  href={`/Collection/${category.nameCategory}/${brand.nameBrand}`}
                                  key={brand._id}
                                >
                                  {brand.nameBrand}
                                </a>
                              ))}
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </div>
        <SearchFunction />
        <div className="header_right_section pl-4 pr-4">
          <div className=" navItem hotLine tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BsHeadphones></BsHeadphones>
            </div>
            <p className="">Hotline 1900.9999</p>
          </div>
          <div className=" navItem tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BiTask></BiTask>
            </div>
            <Link to="/Account" className="w-20">
              Trạng Thái Đơn Hàng
            </Link>
          </div>
          <div className="navItem cart opacity-60 hover:cursor-pointer hover:opacity-100 text-sm">
            <div className="boxIcon">
              <PiShoppingCartSimpleBold></PiShoppingCartSimpleBold>
            </div>
            <div className="number-counter">{counterCart}</div>
            <Link to={"/CartPage"}>Giỏ Hàng </Link>
          </div>
          <div className="header_user_module">
            {localStorage.getItem("accessToken") === null ? (
              <Link to="/LoginUser">
                <button className="user_module_login">
                  <div className="boxIcon">
                    <AiOutlineUser />
                  </div>
                  <p>Đăng Nhập</p>
                </button>
              </Link>
            ) : (
              <Link to="/Account">
                <button className="user_module_login relative">
                  <div className="boxIcon">
                    <AiOutlineUser />
                  </div>
                  <p>Hello, {accountName}</p>
                </button>
                <div className="LoginOption absolute top-18 bg-white text-black h-28 rounded-lg p-4 ">
                  <ul className="flex flex-col gap-2 ">
                    <li className=" border-b-gray-300 p-2">
                      <Link className="flex items-center gap-1" to={`/Account`}>
                        <FaUser />
                        Thông tin tài khoản
                      </Link>
                    </li>
                    <li className=" border-b-gray-400 p-2">
                      <Link
                        className="  flex items-center gap-1"
                        to={`/Account`}
                      >
                        <FaClipboardCheck />
                        Lịch sử đơn hàng
                      </Link>
                    </li>
                  </ul>
                </div>
              </Link>
            )}
          </div>
          <div className="logOutSection">
            {localStorage.getItem("accessToken") !== null ? (
              <button
                className="logOutButton"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("accountName");
                  localStorage.removeItem("accountRole");
                  window.location.reload();
                }}
              >
                Đăng Xuất
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
