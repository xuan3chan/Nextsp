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
<<<<<<< HEAD
            <a href="/products">Collection</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Laptop
=======
=======
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
            <a href="/products">Danh Mục</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {props.titleCollection}
<<<<<<< HEAD
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
=======
            <a href="/products">Collection</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Laptop
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
