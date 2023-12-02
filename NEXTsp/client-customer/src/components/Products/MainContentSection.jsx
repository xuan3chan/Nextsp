import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/Products.css";
import ButtonAddToCart from "../buttons/buttonAddToCart";
import ButtonBuyNow from "../buttons/buttonBuyNow";
import StarRating from "./StarRating";
function MainContentSection(props) {
  const [product, setProduct] = useState(null);
  const param = useParams();
  const ApiProducts = `https://nextsp-server.id.vn/api/products/getdetails/${param.id}/`;

  const fetchData = async () => {
    try {
      const response = await axios.get(ApiProducts);
      return response.data.product;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    const fetchDataAndSetProduct = async () => {
      try {
        const productData = await fetchData();
        setProduct(productData);
      } catch (error) {}
    };

    fetchDataAndSetProduct();
  }, []);

  //Format Price Function
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available "; // You can change this message to your preferred text
  }
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (product) {
      const discount =
        ((product.oldprice - product.price) / product.oldprice) * 100;
      setDiscount(Math.round(discount));
    }
  }, [product]);
  return (
    <div>
      {product && (
        <div
          key={product._id}
          className="DetailProduct flex flex-col gap-6 mt-8 mr-8 ml-8 border-b-2 pb-4"
        >
          <div className="productTitle h-22">{product.nameProduct}</div>
          <div className="productRating flex gap-2">
            <StarRating rating={product.averageRating} />
          </div>
          <div className="priceSection flex content-center items-center gap-2 h-8">
            <div className="productPrice productPriceDetail">
              {formatPrice(product.price)}
            </div>
            <div className="productOldPrice productOldPriceDetail m-0">
              {formatPrice(product.oldprice)}
            </div>
            <div className="productSale">{discount} %</div>
          </div>
          <div className="btnSection flex gap-2 w-80">
            <ButtonBuyNow product={product} />
            <ButtonAddToCart product={product} />
          </div>
          <div className="productPolicySection flex flex-col gap-1">
            <span>✔ Bảo hành chính hãng 24 tháng.</span>
            <span>✔ Hỗ trợ đổi mới trong 7 ngày.</span>
            <span>✔ Miễn phí giao hàng toàn quốc.</span>
            <span>✔ Trả góp 0%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContentSection;
