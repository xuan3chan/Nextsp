import React from "react";
import "../../assets/css/collection.css";
function Breadcrumb(props) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/Homepage">Trang Chủ</a>
          </li>
          <li class="breadcrumb-item">
<<<<<<< HEAD
            <a href="/products">Danh Mục</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {props.titleCollection}
=======
            <a href="/products">Collection</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Laptop
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
