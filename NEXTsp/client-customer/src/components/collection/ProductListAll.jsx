import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import "../../assets/css/main.css";
import { useEffect, useState } from "react";
import { BsSortDown } from "react-icons/bs";
import StarRating from "../Products/StarRating";

function ProductListAll(props) {
  const [products, setProducts] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(1); // Initial page index
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setProducts(props.products);
    console.log(products);
  }, [props.products]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortIncreasing = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setProducts(sortedProducts);
  };

  const sortDecreasing = () => {
    const sortProducts = [...products].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setProducts(sortProducts);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:3101/api/products/getall"
      );
      setProducts(result.data.products);
    };

    fetchData();
  }, []);

  // Function to handle page change
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available "; // You can change this message to your preferred text
  }

  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">Tất Cả Sản Phẩm</h1>
      <div className="w-36">
        <button className="btnFilter btnSort w-36" onClick={toggleDropdown}>
          <BsSortDown></BsSortDown>Sắp Xếp Theo
        </button>

        {isOpen && (
          <div className="sort-dropdown flex flex-col">
            <button onClick={sortIncreasing}>Giá: Thấp đến Cao</button>
            <button onClick={sortDecreasing}>Giá: Cao đên Thấp</button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-1 content-center justify-center pt-12 pb-4">
        {products &&
          products
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
                      className="w-full h-44 object-contain "
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
export default ProductListAll;
