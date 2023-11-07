import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function MainContentSection(props) {
  const [product, setProduct] = useState(null);
  const param = useParams();

  console.log(param);

  const ApiProducts = `http://localhost:3101/api/products/getdetails/${param.id}/`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(ApiProducts);
        if (result.data && typeof result.data.product === "object") {
          setProduct(result.data.product);
        } else {
          console.error("Invalid API response data structure:", result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ApiProducts]);
  const handleBuyBtn = () => {
    alert("Không Bán");
  };
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available "; // You can change this message to your preferred text
  }
  const handleAddCart = () => {
    localStorage.setItem("cart", JSON.stringify(product));
  };
  return (
    <div>
      {product && (
        <div
          key={product._id}
          className="flex flex-col gap-6 mt-8 mr-8 ml-8 border-b-2 h-96"
        >
          <div className="productTitle h-22">{product.nameProduct}</div>
          <div className="priceSection flex gap-2 h-8">
            <div className="productPrice">{formatPrice(product.price)}</div>
            <div className="productOldPrice">
              {formatPrice(product.oldprice)}
            </div>
            <div className="productSale">-17%</div>
          </div>
          <div className="btnSection flex gap-2">
            <div className="btn-BuyNow bg-black text-white text-center p-2 flex flex-col items-center rounded-sm">
              <a className=" cursor-pointer" onClick={handleBuyBtn}>
                Mua Ngay
              </a>
              <p>Giao hàng tận nơi hoặc nhận tại cửa hàng</p>
            </div>
            <div className="btn-AddToCart bg-black text-white text-center p-2 flex items-center rounded-sm">
              <p onClick={handleAddCart}>Thêm vào giỏ hàng</p>
            </div>
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
