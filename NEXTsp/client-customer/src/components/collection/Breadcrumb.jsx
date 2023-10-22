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
            <a href="/products">Collection</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Laptop
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
