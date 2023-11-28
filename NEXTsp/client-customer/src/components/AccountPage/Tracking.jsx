import React, { useEffect, useState } from "react";
import "../../assets/css/Account.css";
import axios from "axios";
import { format } from "date-fns";
import LogoutTracking from "./LogoutTracking";
import Pagination from "../collection/Pagination";
function Tracking(props) {
  const [orderDetails, setOrderDetails] = useState([]);
  const itemsPerPage = 5;
  const [Product, setProduct] = useState([]);
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const apiUrl = `https://nextsp-server.id.vn/api/orders/getbyuser/${userId}`;
  const [pageIndex, setPageIndex] = React.useState(1);
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };
  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrderDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId, apiUrl]);

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }

  const [visibleProduct, setVisibleProduct] = useState(2); // Số lượng hình ảnh hiển thị ban đầu

  const showMoreProduct = () => {
    setVisibleProduct(visibleProduct + 10); // Tăng số lượng hình ảnh được hiển thị khi nhấn nút "Xem thêm"
  };

  return (
    <div>
      <div className="h-full w-full">
        <div className="InforAccountSection flex flex-col py-4">
          <div className="title text-center">
            {token == null ? (
              <div>
                <LogoutTracking />
              </div>
            ) : (
              <div className="content">
                <p> Kiểm Tra Đơn Hàng Đã Đặt</p>
                <ul className="content__body flex flex-col gap-4">
                  {orderDetails.length === 0 && (
                    <div className="text-center">Bạn chưa đặt hàng</div>
                  )}
                  {orderDetails
                    .slice(
                      (pageIndex - 1) * itemsPerPage,
                      pageIndex * itemsPerPage
                    )
                    .map((Order, index) => (
                      <li
                        key={Order._id}
                        className="content__body__title py-6 flex flex-col "
                      >
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle maintTitle_idOrd">
                            Mã đơn hàng :
                          </div>
                          {Order._id}
                        </p>
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle">
                            Ngày Đặt Hàng :
                          </div>
                          {format(new Date(Order.createdAt), "dd/MM/yyyy")}
                        </p>
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle">
                            Tên Người Nhận :
                          </div>
                          {Order.fullName}
                        </p>
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle">
                            Số Điện Thoại:
                          </div>
                          {Order.phone}
                        </p>
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle"> Địa Chỉ :</div>
                          {Order.address}
                        </p>
                        <p className="content__body__subTitle flex gap-1">
                          <div className="subTitle_mainTitle">
                            {" "}
                            Trạng thái :
                          </div>
                          {Order.tracking}
                        </p>
                        <span className="content__body__subTitle flex ">
                          <div className="subTitle_mainTitle-1">
                            Sản Phẩm Đã Đặt: {Order.product.length} loại sản
                            phẩm
                          </div>
                        </span>
                        {Order.product
                          .slice(0, visibleProduct)
                          .map((orderItem, index) => (
                            <div
                              key={index}
                              className="productSection h-24 flex flex-row w-full mt-4 "
                            >
                              {orderItem.productId &&
                                orderItem.productId.images && (
                                  <div className="imageSection relative w-20 h-full">
                                    <img
                                      src={orderItem.productId.images[0]}
                                      className="w-24 h-20 object-cover"
                                      alt=""
                                    />
                                    <div className="numberQuantity absolute bottom-4 right-0 bg-slate-200 ">
                                      x{orderItem.quantity}
                                    </div>
                                  </div>
                                )}
                              <div className="textSection ml-4 h-full flex flex-col justify-center items-center">
                                {orderItem.productId && (
                                  <span className="product-Title text-left w-full justify-center">
                                    {orderItem.productId.nameProduct}
                                  </span>
                                )}
                                {orderItem.productId && (
                                  <span className="product-OldPrice text-left w-full flex flex-col ">
                                    {formatPrice(orderItem.productId.oldprice)}
                                  </span>
                                )}
                                {orderItem.productId && (
                                  <div className="priceSection text-left flex flex-col w-full h-10">
                                    <span className="product-Price w-28">
                                      {formatPrice(orderItem.productId.price)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                        {Order.product.length > visibleProduct && (
                          <button onClick={showMoreProduct}>Xem thêm</button>
                        )}

                        <p className="content__body__subTitle flex justify-end">
                          Tổng tiền: {formatPrice(Order.totalPrice)}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <Pagination
          pageIndex={pageIndex}
          pageCount={Math.ceil(
            (Array.isArray(orderDetails) ? orderDetails.length : 0) /
              itemsPerPage
          )}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Tracking;
