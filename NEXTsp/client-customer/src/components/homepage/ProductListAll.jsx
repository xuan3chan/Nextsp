import React from "react";
import axios from "axios"; // Add this line
import { Link } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import RiseLoader from "react-spinners/RiseLoader";
import { useState, useEffect } from "react";
import StarRating from "../Products/StarRating";

function ProductList(props) {
  const [products, setProducts] = React.useState([]);
  const ApiProducts = process.env.REACT_APP_GET_ALL_PRODUCTS_API;

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);
      setProducts(result.data.products);
      console.log(result.data.products);
    };
    fetchData();
  }, []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="productList w-full p-4 mr-auto ml-auto bg-white rounded-md">
      {isLoading && (
        <div className="loading">
          <RiseLoader
            className="w-full h-full"
            color="#000000 "
            loading={isLoading}
            size={30}
          />
        </div>
      )}
      <div className="title-Section flex items-center relative pb-4 ml-6">
        <h2 className="titleList text-center">Sản Phẩm Mới</h2>
        <div className="subTitle flex content-center items-center h-10 ml-8 pl-8 gap-3">
          <div className="icon">
            <FaTruckMoving className="fill-red-600" />
          </div>
          <p className="subtitleList">Giao hàng miễn phí</p>
        </div>
        <div className="moreBtn flex justify-center gap-4 mt-4 mb- absolute right-0">
          <Link
            to={`/Collection`}
            className="btn-seeMore flex justify-center items-center gap-2"
          >
            Xem Thêm
            <BiSolidRightArrow className="" />
          </Link>
        </div>
      </div>
      <div className="ProductList2 flex flex-wrap gap-4 content-center justify-center">
        {products.reverse() &&
          products.map((product) => (
            <div
              key={product.id}
              className="productItem flex flex-col border-black-500/100 p-4 gap-1 items-center justify-center"
            >
              <Link
                className="w-full items-center justify-center"
                to={`/products/${product.id}`}
              >
                <div className="product_image w-60 h-52 object-cover flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-60 h-44 object-contain"
                  />
                </div>
                <div className="textSection flex flex-col px-9">
                  <div className="product_title">
                    <h1 className="h-16">{product.nameProduct} </h1>
                  </div>
                  <div>
                    <p className="product_oldPrice">
                      {formatPrice(product.oldprice)}
                    </p>
                    <p className="product_price">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="product_rating flex gap-1 items-center">
                    <StarRating rating={product.averageRating} />
                    <p className="text-xs">({product.numReviews} đánh giá)</p>
                  </div>
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
