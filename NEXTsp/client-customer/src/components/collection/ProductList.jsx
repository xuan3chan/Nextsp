import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import Pagination from "./Pagination";
import { useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { BsSortDown } from "react-icons/bs";
import StarRating from "../Products/StarRating";

function ProductList(props) {
  const { category, nameCategory } = useParams();
  const [products, setProducts] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(1);
  const itemsPerPage = 10;
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ApiProducts = "http://localhost:3101/api/products/getall";
  useEffect(() => {
    axios
      .get(ApiProducts)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [ApiProducts]);

  useEffect(() => {
    // Ensure that products is not undefined before filtering
    if (products) {
      const productByCategory = products.filter(
        (product) => product.category.name === category
      );
      const productByBrand = products.filter(
        (product) =>
          product.brand.name === nameCategory &&
          product.category.name === category
      );

      nameCategory == null
        ? setFilteredProducts(productByCategory)
        : setFilteredProducts(productByBrand);
    } else {
      // Handle the case where products is undefined
      setFilteredProducts([]);
    }
  }, [category, nameCategory, products]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available";
  }

  useEffect(() => {
    setProducts(props.products);
    console.log(products);
  }, [props.products]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortIncreasing = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setFilteredProducts(sortedProducts);
  };

  const sortDecreasing = () => {
    const sortProducts = [...filteredProducts].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setFilteredProducts(sortProducts);
  };
  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">
        {nameCategory == null ? category : nameCategory}
      </h1>
      <div className="flex gap-6 ml-20 mt-6">
        <div>
          <button className="btnFilter btnSort" onClick={toggleDropdown}>
            <BsSortDown></BsSortDown>Sắp Xếp Theo
          </button>

          {isOpen && (
            <div className="sort-dropdown flex flex-col">
              <button onClick={sortIncreasing}>Giá: Thấp đến Cao</button>
              <button onClick={sortDecreasing}>Giá: Cao đên Thấp</button>
            </div>
          )}
        </div>
      </div>
      <div className=" flex flex-wrap gap-1 w-4/5 justify-center pt-12 items-center pb-8 mr-auto ml-auto">
        {filteredProducts
          .slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="productItem flex flex-col border-black-500/100 p-4 gap-1 items-center justify-center"
            >
              <Link to={`/products/${product.id}`}>
                <div className="product_image w-60 h-52 object-cover">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-60 h-44 object-contain "
                  />
                </div>
                <div className="textSection flex flex-col">
                  <div className="product_title text-left">
                    <h1 className=" max-[]: h-16 truncate ">
                      {product.nameProduct}{" "}
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
          ))}
      </div>
      <Pagination
        pageIndex={pageIndex}
        pageCount={Math.ceil(
          (Array.isArray(products) ? products.length : 0) / itemsPerPage
        )}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default ProductList;
