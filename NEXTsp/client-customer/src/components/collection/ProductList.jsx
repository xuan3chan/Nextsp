import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ButtonBuyNow from "../button/buttonBuyNow";
import ButtonAddToCart from "../button/buttonAddToCart";
import Paginnation from "./Paginnation";
function ProductList(props) {
  const param = useParams();
  const [products, setProducts] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(1); // Initial page index
  const itemsPerPage = 10;

  const ApiProducts = "http://localhost:3101/api/products/getall";
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);
      setProducts(result.data.products);
    };
    console.log(JSON.stringify(products.brand));
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
  const generateStarIcons = (rating) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <img
          key={i}
          src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
          alt=""
          className="w-6 h-6"
        />
      );
    }
    return starIcons;
  };

  const handleAddCart = () => {
    localStorage.setItem("cart", JSON.stringify(products));
  };
  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">{param.nameCategory}</h1>
      <FilterButtonSection />
      <div className=" flex flex-wrap  gap-1 content-center justify-center pt-12 flex-col items-center pb-8">
        {products
          .filter((product) => product.brand.name === props.CollectionBrand) // Filter products by brand
          .map(
            (product, index) =>
              index < 1 && (
                <div
                  key={product.id}
                  className="productItem flex flex-col  border-black-500/100 p-4 gap-1 "
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="product_image w-72 h-52 object-contain">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-full h-44 object-contain "
                      />
                    </div>
                    <div className="product_title">
                      <h1 className=" max-[]: h-16 truncate ">
                        {product.nameProduct}{" "}
                      </h1>
                    </div>
                    <div>
                      <p className="product_oldPrice">
                        {formatPrice(product.oldprice)}
                      </p>
                      <p className="product_price font-sans">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="product_rating flex gap-1 items-center">
                      {generateStarIcons(product.rating)}
                      <p className="text-xs">(5 đánh giá)</p>
                    </div>
                  </Link>
                  <div className="over-button flex gap-4 items-center justify-center mt-3">
                    <ButtonBuyNow
                      className="btn p-1  flex justify-center btn-sell "
                      product={product}
                    />
                    <ButtonAddToCart product={product} />
                  </div>
                </div>
              )
          )}
      </div>
      <Paginnation
        pageIndex={pageIndex}
        pageCount={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default ProductList;
