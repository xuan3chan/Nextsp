import React, { Fragment } from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { faBars, faCaretRight, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

=======
import {
  faBars,
  faCaretRight,
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { BiTask } from "react-icons/bi";
import { BsHeadphones } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
function Header(props) {
  const [Categories, setCategories] = useState(null);
  const [Brands, setBrands] = useState(null);

  useEffect(() => {
    // Define the API URLs
<<<<<<< HEAD
    const apiUrl1 = 'http://localhost:3003/Categories';
    const apiUrl2 = 'http://localhost:3003/Brands';
=======
    const apiUrl1 = "http://localhost:3000/Categories";
    const apiUrl2 = "http://localhost:3000/Brands";
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118

    // Make parallel requests
    const request1 = axios.get(apiUrl1);
    const request2 = axios.get(apiUrl2);

    // Wait for both requests to complete
    Promise.all([request1, request2])
      .then(([response1, response2]) => {
        setCategories(response1.data);
        setBrands(response2.data);
      })
<<<<<<< HEAD
      .catch(error => {
        console.error('Error fetching data:', error);
=======
      .catch((error) => {
        console.error("Error fetching data:", error);
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
      });
  }, []);
  return (
    <Fragment>
<<<<<<< HEAD
      <div className="header z-20 fixed">
=======
      <div className="header z-20 fixed flex justify-center ">
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
        <div className="header_logo"></div>
        <div class="navbar">
          <a href="../Homepage">Trang Chủ</a>
          <a href="/Blog">Bài Viết</a>
          <div className="dropdown">
            <button className="dropbtn">
              <FontAwesomeIcon className="mr-1" icon={faBars} />
              Danh Mục
              <i className="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content flex flex-col">
<<<<<<< HEAD
            {Categories && Categories.map((item, index) => (
                <a className=" text-left	 " href={`/Collection/${item.categoryLink}`}>{item.categoryName}</a>
               ))
            }
          </div>
=======
              {Categories &&
                Categories.map((item) => (
                  <a
                    className="dropDownItem flex items-center justify-start gap-2 relative "
                    href={`/Collection/${item.categoryLink}`}
                  >
                    {item.categoryName}{" "}
                    <FontAwesomeIcon
                      className="absolute right-3"
                      icon={faCaretRight}
                    />
                  </a>
                ))}
            </div>
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
          </div>
        </div>
        <div className="header_searching_module">
          <div class="wrap">
            <div class="search">
              <input
                type="text"
<<<<<<< HEAD
                class="searchTerm"
=======
                class="searchTerm text-black"
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
                placeholder="Nhập Thứ Cần Tìm Kiếm"
              ></input>
              <button type="submit" class="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="header_right_section">
          <div className="header_cart opacity-60 hover:cursor-pointer hover:opacity-100">
            <FontAwesomeIcon icon={faCartShopping} />
            Giỏ Hàng
          </div>
          <div className="header_user_module">
            <Link to='/Login'>
              <button className="user_module_login">
                <FontAwesomeIcon icon={faUser} /> Đăng nhập
=======
        <div className="header_right_section pl-4 pr-4">
          <div className=" navItem tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BsHeadphones></BsHeadphones>
            </div>
            <p className="">Hotline 1900.9999</p>
          </div>
          <div className=" navItem tracking-order opacity-60 hover:cursor-pointer hover:opacity-100">
            <div className="boxIcon">
              <BiTask></BiTask>
            </div>
            <p className="">Trạng Thái Đơn Hàng</p>
          </div>
          <div className="navItem opacity-60 hover:cursor-pointer hover:opacity-100 text-sm">
            <div className="boxIcon">
              <PiShoppingCartSimpleBold></PiShoppingCartSimpleBold>
            </div>
            <p>Giỏ Hàng</p>
          </div>
          <div className="header_user_module">
            <Link to="/Login">
              <button className="user_module_login">
                <div className="boxIcon">
                  <AiOutlineUser></AiOutlineUser>
                </div>
                <p>Đăng Nhập</p>
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

<<<<<<< HEAD
export default Header;
=======
export default Header;
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
