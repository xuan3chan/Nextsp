import React from "react";
import "../../assets/css/collection.css";
import { useParams } from "react-router-dom";
function Breadcrumb(props) {
  const params = useParams();
  return (
    <div className="w-3/4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/Homepage">Trang Chủ</a>
          </li>
          <a
            href="/collection"
            className="breadcrumb-item active"
            aria-current="page"
          >
            Danh Mục
          </a>
          <a className="breadcrumb-item active" aria-current="page">
            {params.nameCategory === undefined
              ? "Sản Phẩm"
              : params.nameCategory === ""
              ? " "
              : params.nameCategory}
          </a>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
