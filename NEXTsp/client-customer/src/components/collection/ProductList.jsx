import React from "react";
import "../../assets/css/collection.css";
function ProductList(props) {
  const products = [
    {
      id: 1,
      type: "laptop",
      title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 2,
      type: "laptop",
      title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://cdn.originpc.com/img/compare-all/gaming-desktops/genesis-7000-series-system-image.png",
    },
    {
      id: 3,
      type: "laptop",

      title: "Laptop gaming MSI GF63 12UCX 841VN",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 4,
      type: "laptop",
      title: "Laptop gaming ASUS TUF Gaming F15 FX507ZV4",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://product.hstatic.net/200000478869/product/-gallery-650wl-top.png__1920x1080_q100_crop-fit_optimize_subsampling-2_fa701dafb7a944e19962532afc446fcd.png",
    },
    {
      id: 5,
      type: "laptop",
      title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
      id: 6,
      type: "PC",
      title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://product.hstatic.net/200000478869/product/-gallery-650wl-top.png__1920x1080_q100_crop-fit_optimize_subsampling-2_fa701dafb7a944e19962532afc446fcd.png",
    },
    {
      id: 7,
      type: "PC",
      title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
      oldPrice: "4.000.000",
      price: "3.000.000",
      imageUrl:
        "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
    },
    {
        id: 8,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 9,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 10,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 11,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 12,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 13,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 14,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 15,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 16,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },
      {
        id: 17,
        type: "PC",
        title: "Laptop Asus Vivobook 15X OLED A1505VA L1114W",
        oldPrice: "4.000.000",
        price: "3.000.000",
        imageUrl:
          "https://vcdn-sohoa.vnecdn.net/2021/12/30/Image-ExtractWord-0-Out-7288-1640840203.png",
      },



    // Thêm các sản phẩm khác tương tự
  ];

  return (
    <div className="productList mx-auto bg-white rounded-md">
      <h2 className="titleList mb-4">{props.title}</h2>
      <div className=" flex flex-wrap gap-1 content-center justify-center">
        {products.map(
          (product, index) =>
            index < 10 && (
              <div
                key={product.id}
                className="productItem flex flex-col  border-4 border-black-500/100 p-4 gap-1 "
              >
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
                  <p className="product_oldPrice">{product.oldPrice}đ</p>
                  <p className="product_price">{product.price}đ</p>
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
