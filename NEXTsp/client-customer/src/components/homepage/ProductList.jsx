import React from "react";
import { Link } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import ButtonBuyNow from "./ButtonBuyNow";
import ButtonAddToCart from "./ButtonAddToCart";

function ProductList(props) {
  const starUrl =
    "https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png";

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }

  return (
    <div className="productList p-4 mr-auto ml-auto bg-white rounded-md">
      <div className="title-Section flex items-center relative pb-4 ml-6">
        <h2 className="titleList text-center">{props.title}</h2>
        <div className="subTitle flex content-center items-center h-10 ml-8 pl-8 gap-3">
          <div className="icon">
            <FaTruckMoving className="fill-red-600" />
          </div>
          <p className="subtitleList">Giao hàng miễn phí</p>
        </div>
        <div className="flex justify-center gap-4 mt-4 mb- absolute right-0">
          <Link to={`/Collection`} className="btn-seeMore flex justify-center items-center gap-2">
            Xem Thêm
            <BiSolidRightArrow className="" />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 content-center justify-center">
        {props.products.map((product) => (
          <div className="productItem flex flex-col border-black-500/100 p-4 gap-1" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <div className="product_image w-72 h-52 object-contain">
                <img src={product.images[0]} alt="" className="w-full h-44 object-contain" />
              </div>
              <div className="product_title">
                <h1>{product.nameProduct}</h1>
              </div>
              <div>
                <p className="product_oldPrice font-bold RobotoViet">
                  {formatPrice(product.oldprice)}
                </p>
                <p className="product_price font-normal RobotoViet">{formatPrice(product.price)}</p>
              </div>
              <div className="product_rating flex gap-1 items-center">
                <img src={starUrl} alt="" className="w-6 h-6" />
                <img src={starUrl} alt="" className="w-6 h-6" />
                <img src={starUrl} alt="" className="w-6 h-6" />
                <img src={starUrl} alt="" className="w-6 h-6" />
                <img src={starUrl} alt="" className="w-6 h-6" />
                <p className="text-xs">(5 đánh giá)</p>
              </div>
            </Link>
            <div className="over-button flex gap-4 items-center justify-center mt-3">
              <ButtonBuyNow product={product} />
              <ButtonAddToCart product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
