import React from "react";

function ProductList(props) {
  const products = [
    {
      id: 1,
      title: "Iphone 12 Pro Max",
      price: 30000000,
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 2,
      title: "Samsung Galaxy S21",
      price: 25000000,
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 3,
      title: "Samsung Galaxy S21",
      price: 25000000,
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 4,
      title: "Samsung Galaxy S21",
      price: 25000000,
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },

    // Thêm các sản phẩm khác tương tự
  ];

  return (
    <div className="productList w-3/4 mr-auto ml-auto ">
      <h2 className="titleList">Sản Phẩm Mới</h2>
      <div className=" flex flex-wrap gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="productItem flex flex-col  border-4 border-black-500/100 p-4"
          >
            <img
              src={product.imageUrl}
              alt=""
              className="product_image w-65 h-60"
            />
            <h1 className="product_title">{product.title} </h1>
            <p className="product_price">{product.price} VNĐ</p>
            <div className="over-button flex gap-4">
            <div className="btn p-1  flex justify-center btn-sell ">Mua Ngay</div>
            <div className="btn p-1 flex justify-center btn-addCart">Thêm Vào Giỏ</div>
          </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
