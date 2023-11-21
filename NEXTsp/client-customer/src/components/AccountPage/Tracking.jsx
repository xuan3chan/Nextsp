import React, { useEffect, useState } from "react";
import "../../assets/css/Account.css";
import axios from "axios";

function Tracking(props) {
  const [OrderDetail, setOrderDetail] = useState([]);
  const [UserId, setUserId] = useState("");
  const token = localStorage.getItem("accessToken");
  const apiUrl = `http://localhost:3101/api/orders/getbyuser/${UserId}`;
  const Image = "https://wiki.dave.eu/images/4/47/Placeholder.png";
  useEffect(() => {
    setUserId(localStorage.getItem("userId")); // Move this line up

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [UserId, apiUrl]); // Add dependencies to the useEffect dependency array

  return (
    <div>
      <div className="h-full w-full">
        <div className="InforAccountSection flex flex-col px-4">
          <div className="title text-center">
            <p> Kiểm Tra Đơn Hàng Đã Đặt</p>
          </div>
          <div className="content">
            <ul className="content__body flex flex-col gap-4">
              {OrderDetail.map((Order, index) => (
                <li key={index} className="content__body__title py-6 flex flex-col ">
                  <p className="content__body__subTitle" >Mã đơn hàng : {Order._id}</p>
                  <p className="content__body__subTitle" >Tên Người Nhận : {Order.fullName}</p>
                  <p className="content__body__subTitle" >Số Điện Thoại: {Order.phone}</p>
                  <p className="content__body__subTitle" >Địa Chỉ : {Order.address}</p>
                  <p className="content__body__subTitle" >Trạng thái : {Order.tracking}</p>
                  <span className="content__body__subTitle" >San Pham Da Dat: </span>
                  <div className="productSection h-20 flex flex-row w-full mt-4">
                    <img src={Image} className=" w-20 h-20 object-fill"></img>
                    <div className="textSection ml-4 h-10 flex flex-col">
                      <span className="productTitle w-full h-4">
                        PC Lorest in the world
                      </span>
                      <span className="productPrice w-full h-4">Free</span>
                    </div>
                  </div>
                  <div className="productSection h-20 flex flex-row w-full mt-4">
                  <img src={Image} className=" w-20 h-20 object-fill"></img>
                  <div className="textSection ml-4 h-10 flex flex-col">
                    <span className="productTitle w-full h-4">
                      PC Lorest in the world
                    </span>
                    <span className="productPrice w-full h-4">Free</span>
                  </div>
                </div>
                  <p className="content__body__subTitle flex justify-end" >Tổng tiền: {Order.totalPrice}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
