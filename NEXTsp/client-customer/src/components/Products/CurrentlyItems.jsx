import React, { useEffect, useState } from "react";
import axios from "axios"; // Add this line
import { Link } from "react-router-dom";
import { FaTruckMoving } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import StarRating from "../Products/StarRating";

function CurrentlyItems(props) {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("currentItem");
    const parsedProducts = JSON.parse(storedProducts) || [];
    setProducts(parsedProducts); // Set parsedCart to the cart state
  }, []);

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return;
  }
  function shortenProductName(productName, maxLength) {
    if (productName.length <= maxLength) {
      return productName;
    } else {
      return productName.substring(0, maxLength - 3) + "...";
    }
  }

  const AvailableProducts = products.filter(
    (product) => product.status === "Active"
  );
  const imagePlaceHolder = "https://via.placeholder.com/350";
  return (
    <div>
      <div className="productList  w-full  p-4 mr-auto ml-auto bg-white rounded-md">
        <div className="title-Section flex items-center relative pb-4 ml-6">
          <h3 className="titleList text-lg text-center">
            Sản phẩm xem gần đây
          </h3>
          <div className="subTitle flex content-center items-center h-10 ml-8 pl-8 gap-3"></div>
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
        <div className="ProductList2 flex flex-wrap gap-4 items-start">
          {products.map(
            (product, index) =>
              index < 5 && (
                <div
                  key={product.id}
                  className="productItem flex flex-col border-black-500/100 p-4 gap-1 items-center justify-center"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="product_image w-60 h-52 object-cover">
                      <img
                        src={
                          product.images[0] == null
                            ? imagePlaceHolder
                            : product.images[0]
                        }
                        alt=""
                        className="w-full h-44 object-contain "
                      />
                    </div>
                    <div className="textSection flex flex-col">
                      <div className="product_title text-left">
                        <h1 className="h-20">
                          {shortenProductName(product.nameProduct, 50)}
                        </h1>
                      </div>
                      <div>
                        <p className="product_oldPrice text-left">
                          {formatPrice(product.oldprice)}
                        </p>
                        <p className="product_price text-left">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="product_rating flex gap-1 items-center">
                      <StarRating rating={product.averageRating} />
                      <p className="text-xs">({product.numReviews} đánh giá)</p>
                    </div>
                  </Link>
                  <div className="over-button flex gap-4 items-center justify-center mt-3">
                    <ButtonBuyNow product={product} />
                    <ButtonAddToCart product={product} />
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentlyItems;
