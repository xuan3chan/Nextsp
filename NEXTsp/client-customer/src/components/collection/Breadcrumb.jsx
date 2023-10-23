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
            <a href="/products">Collection</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Laptop
=======
            <a href="/products">Danh Mục</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {props.titleCollection}
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
