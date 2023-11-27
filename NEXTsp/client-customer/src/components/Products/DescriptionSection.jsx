import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function DescriptionSection(props) {
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

  return (
    <div>
      <div className="containerDescSection w-96 mb-8">
        {product && (
          <div>
            <div className="descTitle">Mô Tả Sản Phẩm</div>
            <div className="productDesc">
              <span className="font-bold text-lg">
                Thông Tin Chi Tiết Sản Phẩm {product.nameProduct}
              </span>
              <p>{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionSection;
