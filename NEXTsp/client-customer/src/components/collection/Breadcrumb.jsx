import React from "react";
import "../../assets/css/collection.css";
function Breadcrumb(props) {
  return (
    <div>
      <nav aria-label="breadcrumb ">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/Homepage">Trang Chủ</a>
          </li>
          <a href = "/collection" class="breadcrumb-item active" aria-current="page">
            Danh Mục
          </a>
          <a class="breadcrumb-item active" aria-current="page">
            {props.titleCollection}
          </a>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
