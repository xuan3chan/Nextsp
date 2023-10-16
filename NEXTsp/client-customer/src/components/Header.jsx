import React from "react";
import "../assets/css/homepage.css";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretRight, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Header(props) {
  return (
    <div>
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
            <div className="dropdown-content">
              <a className="dropdown-item">
                Laptop
                <FontAwesomeIcon icon={faCaretRight} />
              </a>
              <a className="dropdown-item">
                PC Gaming
                <FontAwesomeIcon icon={faCaretRight} />
              </a>
              <a className="dropdown-item">
                Linh Kiện PC
                <FontAwesomeIcon icon={faCaretRight} />
              </a>
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
              <FontAwesomeIcon icon={faSearch}/>
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
    </div>
  );
}

export default Header;
