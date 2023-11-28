import React, { useState, useEffect } from "react";
import "../../assets/css/Account.css";
import axios from "axios";

const LogoutTracking = () => {
  const [Order, setOrderDetail] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [visibleProduct, setVisibleProduct] = useState(2);
  const apiUrl = `https://nextsp-server.id.vn/api/orders/searchorder/${orderId}`;

  useEffect(() => {
    if (orderId) {
      axios
        .get(apiUrl)
        .then((response) => {
          setOrderDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [orderId, apiUrl]);

  const formatPrice = (price) => {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  };

  const showMoreProduct = () => {
    setVisibleProduct(visibleProduct + 10);
  };

  const handleTracking = () => {
    setOrderId(document.getElementById("searchInput").value);
  };

  return (
    <div>
      <div className="InforAccountSection flex flex-col items-center justify-center">
        <div className="title">Nhập Mã Đơn Hàng Để Tra Cứu</div>
        <div className="search-container relative">
          <input
            type="text"
            id="searchInput"
            placeholder="Nhập Mã Đơn Hàng Để Tra Cứu..."
          ></input>
          <button onClick={handleTracking} className="" id="searchButton">
            Tracking
          </button>
        </div>
        <div className="mt-4 content w-full">
          <span>Kết Quả Tìm Kiếm</span>
          <li
            key={Order._id}
            className="content__body__title py-6 flex flex-col "
          >
            <p className="content__body__subTitle flex gap-1">
              <div className="subTitle_mainTitle maintTitle_idOrd">
                Mã đơn hàng :
              </div>
              <span>{Order._id}</span>
            </p>
            <p className="content__body__subTitle flex gap-1">
              <div className="subTitle_mainTitle">Tên Người Nhận :</div>
              <span>{Order.fullName}</span>
            </p>
            <p className="content__body__subTitle flex gap-1">
              <div className="subTitle_mainTitle">Số Điện Thoại:</div>
              <span>{Order.phone}</span>
            </p>
            <p className="content__body__subTitle flex gap-1">
              <div className="subTitle_mainTitle"> Địa Chỉ :</div>
              <span>{Order.address}</span>
            </p>
            <p className="content__body__subTitle flex gap-1">
              <div className="subTitle_mainTitle"> Trạng thái :</div>
              <span>{Order.tracking}</span>
            </p>
            <span className="content__body__subTitle flex ">
              <div className="subTitle_mainTitle">Sản Phẩm Đã Đặt:</div>
            </span>
            {Array.isArray(Order.product) &&
              Order.product.map((orderItem) => (
                <div
                  key={orderItem.productId._id}
                  className="productSection h-24 flex flex-row w-full mt-4 "
                >
                  <div className="imageSection relative w-20 h-full">
                    {orderItem.productId.images &&
                      orderItem.productId.images.length > 0 && (
                        <img
                          src={orderItem.productId.images[0]}
                          className="w-24 h-20 object-cover"
                          alt=""
                        />
                      )}
                    <div className="numberQuantity absolute bottom-4 right-0 bg-slate-200 ">
                      x{orderItem.quantity}
                    </div>
                  </div>
                  <div className="textSection ml-4 h-full flex flex-col justify-center items-center">
                    <span className="product-Title text-left w-full justify-center">
                      {orderItem.productId.nameProduct}
                    </span>
                    <div className="priceSection text-left flex flex-col w-full h-10">
                      <span className="product-Price w-28">
                        {formatPrice(orderItem.productId.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {Array.isArray(Order.product) &&
              Order.product.length > visibleProduct && (
                <button onClick={showMoreProduct}>Xem thêm</button>
              )}
            <p className="content__body__subTitle flex justify-end">
              Tổng tiền: {formatPrice(Order.totalPrice)}
            </p>
          </li>
        </div>
      </div>
    </div>
  );
};

export default LogoutTracking;
