import React, { Fragment } from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Header(props) {

  const danhmuc = [
    {
      id: 1,
      name: "Laptop",
      link: "/Laptop",
      brands: ["HP", "Dell", "Lenovo"]
    },
    {
      id: 2,
      name: "Điện Thoại",
      link: "/Dienthoai",
      brands: ["Samsung", "Apple", "Xiaomi"]
    },
    {
      id: 3,
      name: "Phụ Kiện",
      link: "/Phukien",
      brands: ["Sony", "Logitech", "JBL"]
    }
  ];
  
  return (
    <Fragment>
      <div className="header z-20 fixed">
        <div className="header_logo"></div>
        <div class="navbar">
          <a href="Homepage">Trang Chủ</a>
          <a href="/Blog">Bài Viết</a>
          <div className="dropdown">
            <button className="dropbtn">
              <FontAwesomeIcon className="mr-1" icon={faBars} />
              Danh Mục
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content flex flex-col">
              {danhmuc.map((item, index) => {
                return (
                  <Link className="relative group" to={`${item.link}`} key={item.id}>
                    {item.name} <FontAwesomeIcon icon={faCaretRight} />
                    <div className="category_container shadow-md hidden flex-col absolute top-0 left-full bg-white text-black w-60 group-hover:flex ">
                      {item.brands.map((brand, index) => {
                        return (
                          <Link className="category_item" 
                            to={`${item.link}/${brand}`} key={index}>
                            {brand}
                          </Link>
                        );
                      })}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="header_searching_module">
          <div class="wrap">
            <div class="search">
              <input
                type="text"
                class="searchTerm"
                placeholder="Nhập Thứ Cần Tìm Kiếm"
              ></input>
              <button type="submit" class="searchButton">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="header_right_section">
          <div className="header_cart opacity-60 hover:cursor-pointer hover:opacity-100">
            <FontAwesomeIcon icon={faCartShopping} />
            Giỏ Hàng
          </div>
          <div className="header_user_module">
            <Link to='/Login'>
              <button className="user_module_login">
                <FontAwesomeIcon icon={faUser} /> Đăng nhập
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;