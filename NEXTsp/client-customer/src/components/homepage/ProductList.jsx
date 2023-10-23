import React from "react";
import axios from "axios";

import {FaTruckMoving} from "react-icons/fa";
import {BiSolidRightArrow}  from "react-icons/bi";
function ProductList(props) {
  const [products, setProducts] = React.useState([]);
  const ApiProducts = "http://localhost:3000/products";

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);

      setProducts(result.data);
    };

    fetchData();
  }, []);
  function formatPrice(price) {
    return `${price.toLocaleString()}đ`;
  }
  return (



    <div className="productList p-12 mr-auto ml-auto bg-white rounded-md">
      <h2 className="titleList mb-4 text-center">{props.title}</h2>
      <div className=" flex w-max flex-wrap gap-4 content-center justify-center">
        {products.map(
          (product, index) =>
            index < 4 && (
              <div
                key={product.id}
                className="productItem flex flex-col  border-black-500/100 p-4 gap-1 "
              >
                <div className="product_image w-72 h-52 object-contain">
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="w-full h-44 object-contain "
                  />
                </div>
                <div className="product_title">
                  <h1 className=" ">{product.title} </h1>
                </div>
                <div>
                  <p className="product_oldPrice font-bold RobotoViet">
                    {formatPrice(product.oldPrice)}
                  </p>
                  <p className="product_price font-normal RobotoViet">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="over-button flex gap-4 items-center justify-center mt-3">
                  <div className="btn p-1  flex justify-center btn-sell ">
                    Mua Ngay
                  </div>
                  <div className="btn p-1 flex justify-center btn-addCart">
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
