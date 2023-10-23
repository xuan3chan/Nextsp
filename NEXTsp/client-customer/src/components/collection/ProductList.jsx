import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";


function ProductList(props) {
  const [products, setProducts] = React.useState([]);

<<<<<<< HEAD
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3003/Products");
=======
  const ApiProducts = "http://localhost:3000/Products";
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
    <div className="productList max-h-full mx-auto w-full bg-white rounded-md pb-4">
<<<<<<< HEAD
      <h1 className="CategoryTitle ">Máy Tính Laptop</h1>
=======
      <h1 className="CategoryTitle ">{props.titleCollection}</h1>
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
      <FilterButtonSection></FilterButtonSection>
      <div className=" flex flex-wrap  gap-1 content-center justify-center pt-12">
      {products
        .filter(product => product.type === "Laptop")
<<<<<<< HEAD
        .map((product, index) => (
=======
        .map((product) => (
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
              <div
                key={products.id}
                className="productItem-collection w-2/12 flex flex-col p-4 gap-1 "
              >
                <div className="product_image w-72 h-52 object-contain">
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="w-full h-44 object-contain "
                  />
                </div>
                <div className="product_title">
                  <h1 className=" max-[]: h-16 truncate ">{product.title} </h1>
                </div>
                <div>
                  <p className="product_oldPrice">{formatPrice(product.oldPrice)}</p>
                  <p className="product_price font-sans">{formatPrice(product.price)}</p>
                </div>
                <div className="product_rating flex gap-1 items-center">
                <img src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png" alt="" className="w-6 h-6"/>
                <img src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png" alt="" className="w-6 h-6"/>
                <img src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png" alt="" className="w-6 h-6"/>
                <img src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png" alt="" className="w-6 h-6"/>
                <img src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png" alt="" className="w-6 h-6"/>
                  <p className="text-xs	">(5 đánh giá)</p>
                </div>
<<<<<<< HEAD
                <div className="over-button flex gap-4 items-center justify-center mt-6">
=======
                <div className="over-button flex gap-4 items-center justify-center mt-4">
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
