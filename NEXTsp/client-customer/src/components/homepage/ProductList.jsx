import React from "react";
import axios from "axios";

import { FaTruckMoving } from "react-icons/fa";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

function ProductList(props) {
  const [products, setProducts] = React.useState([]);
  const ApiProducts = "http://localhost:3101/api/products/getall";

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);
      setProducts(result.data.products);
    };
    fetchData();
  }, []);
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available ";
  }

  return (
    <div className="productList p-4 mr-auto ml-auto bg-white rounded-md">
      <div className="title-Section flex items-center relative pb-4 ml-6">
        <h2 className="titleList text-center">{props.title}</h2>
        <div className="subTitle flex content-center items-center h-10 ml-8 pl-8 gap-3 ">
          <div className="icon">
            <FaTruckMoving className=" fill-red-600" />
          </div>
          <p className="subtitleList">Giao hàng miễn phí</p>
        </div>
        <div className="flex justify-center gap-4 mt-4 mb- absolute right-0">
          <div className="btn-seeMore flex justify-center items-center gap-2">
            Xem Thêm
            <BiSolidRightArrow className="" />
          </div>
        </div>
      </div>
      <div className=" flex w-max flex-wrap gap-4 content-center justify-center">
        {products.map(
          (product, index) =>
            index < 4 && (
              <Link
                to={`/products/${product.id}`}
                key={index}
                className="productItem flex flex-col  border-black-500/100 p-4 gap-1 "
              >
                <div className="product_image w-72 h-52 object-contain">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-44 object-contain "
                  />
                </div>
                <div className="product_title">
                  <h1 className=" ">{product.nameProduct} </h1>
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
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default ProductList;
