import React from "react";
import axios from "axios";
<<<<<<< HEAD



function ProductList(props) {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3003/Products");
=======
import {FaTruckMoving} from "react-icons/fa";
import {BiSolidRightArrow}  from "react-icons/bi";
function ProductList(props) {
  const [products, setProducts] = React.useState([]);
  const ApiProducts = "http://localhost:3000/products";

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(ApiProducts);
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118

      setProducts(result.data);
    };

    fetchData();
  }, []);
  function formatPrice(price) {
    return `${price.toLocaleString()}đ`;
  }
  return (
<<<<<<< HEAD
    <div className="productList p-12 mr-auto ml-auto bg-white rounded-md">
      <h2 className="titleList mb-4 text-center">{props.title}</h2>
=======
    <div className="productList p-4 mr-auto ml-auto bg-white rounded-md">
      <div className="TitleSection ml-6 h-16 flex items-center relative">
        <h2 className="titleList text-left">{props.title}</h2>
        <h3 className="subTitleList flex justify-center items-center ml-6 gap-2" ><FaTruckMoving></FaTruckMoving>  Miễn Phí Giao Hàng</h3>
        <a href = {`/Collection/${props.CollectionName}`} className="MoreInfro  absolute right-3 flex items-center gap-2"><p>Xem Thêm</p><BiSolidRightArrow></BiSolidRightArrow></a>
        </div>

>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
      <div className=" flex w-max flex-wrap gap-4 content-center justify-center">
        {products.map(
          (product, index) =>
            index < 4 && (
              <div
                key={product.id}
                className="productItem flex flex-col  border-black-500/100 p-4 gap-1 "
              >
<<<<<<< HEAD
              <div className="product_image w-72 h-52 object-contain">
              <img
                src={product.imageUrl}
                alt=""
                className="w-full h-44 object-contain "
              />
              </div>
              <div className ="product_title">
              <h1 className=" ">{product.title} </h1>
              </div>
                <div>
                  <p className="product_oldPrice font-bold RobotoViet">{formatPrice(product.oldPrice)}</p>
                  <p className="product_price font-normal RobotoViet">{formatPrice(product.price)}</p>
                </div>
                <div className="product_rating flex gap-1 items-center">
                  <p>⭐</p>
                  <p>⭐</p>
                  <p>⭐</p>
                  <p>⭐</p>
                  <p>⭐</p>
                  <p className="text-xs	">(5 đánh giá)</p>
                </div>
                <div className="over-button flex gap-4 items-center justify-center">
=======
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
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
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
