import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function ProductList(props) {
  const param = useParams();
  const [products, setProducts] = React.useState([]);
  const ApiProducts = "http://localhost:3101/api/products/getall";
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);
      setProducts(result.data.products);
    };
    console.log(JSON.stringify(products.brand));
    fetchData();
  }, []);
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }

  const handleAddCart = () => {
    localStorage.setItem("cart", JSON.stringify(products));
  };
  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">{param.nameCategory}</h1>
      <FilterButtonSection />
      <div className=" flex flex-wrap  gap-1 content-center justify-center pt-12 pb-4">
        {products
          .filter((product) => product.brand.name === props.CollectionBrand)
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
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
                        alt=""
                        className="w-6 h-6"
                      />
                      <p className="text-xs	">(5 đánh giá)</p>
                    </div>
                  </Link>
                  <div className="over-button flex gap-4 items-center justify-center mt-6">
                    <div className="btn p-1  flex justify-center btn-sell ">
                      Mua Ngay
                    </div>
                    <div
                      onClick={handleAddCart}
                      className="btn p-1 flex justify-center btn-addCart"
                    >
                      Thêm Vào Giỏ
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
}
export default ProductList;
