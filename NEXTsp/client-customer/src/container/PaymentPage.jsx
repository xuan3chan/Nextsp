import React from "react";
import { Header } from "../components";
import axios from "axios";
function PaymentPage(props) {
  const customerInformation = JSON.parse(
    localStorage.getItem("customerInformation")
  );
  const totalPrice = localStorage.getItem("totalPrice");
  const fullName = customerInformation.recipientName;
  const phoneNumber = customerInformation.phoneNumber;
  const email = customerInformation.email;
  const address = customerInformation.address;
  const codImageLink =
    "https://file.hstatic.net/200000636033/file/pay_2d752907ae604f08ad89868b2a5554da.png";
  const qrImageLink = "https://cdn-icons-png.flaticon.com/512/5371/5371682.png";

  const handlePostOrder = () => {
    const token = localStorage.getItem("accessToken");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
    const customerInformation = JSON.parse(
      localStorage.getItem("customerInformation")
    );
    const totalPrice = localStorage.getItem("totalPrice");
    const orderDetails = cart.map((item) => ({
      productId: item.id,
      quantity: item.count,
      price: item.price,
    }));
    const data = {
      orderDetails,
      totalQuantity,
      totalPrice,
      customerInformation,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post("http://localhost:3101/api/orders/getall", data, config)
      .then((res) => {
        alert("Đặt hàng thành công");
        localStorage.removeItem("cart");
        localStorage.removeItem("totalQuantity");
        localStorage.removeItem("totalPrice");
        localStorage.removeItem("customerInformation");
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-cart">
      <Header></Header>
      <div className="pt-24 w-full pb-24">
        <div className="CustomerInformationSection ml-auto mr-auto border-spacing-1">
          <div className="customerInformation pb-8">
            <h1 className="title text-center w-full">Thanh Toán Đơn Hàng</h1>
            <div className="w-3/5 mr-auto ml-auto">
              <div className="iOrder border-b-2 border-black p-8">
                <div className="iOrder-title">
                  <h1 className="">Thông Tin Đặt Hàng</h1>
                </div>
                <div className="iOrder-content">
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tên Người Nhận</h1>
                    </div>
                    <div className="iOrder-content-item-content">
                      <h1 className="">{fullName}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Số Điện Thoại</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{phoneNumber}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Email</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{email}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Địa Chỉ</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{address}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tạm Tính</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{totalPrice}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Phí Vận Chuyển</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">Miễn Phí</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tổng Tiền</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{totalPrice}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paymentStep border-b-2 border-black p-8">
                <div className="paymentStep-title">
                  Chọn hình thức thanh toán
                </div>
                <div className="paymentStep-cod flex gap-3">
                  <input type="radio" name="Cod" id="" />
                  <img className=" w-6 h-6" src={codImageLink} alt="" />
                  <label htmlFor=""> Thanh toán khi giao hàng (COD)</label>
                </div>
                <div className="paymentStep-qr flex gap-3">
                  <input type="radio" name="qr" id="" />
                  <img className=" w-6 h-6" src={qrImageLink} alt="" />
                  <label htmlFor=""> Thanh toán chuyển khoản (QR)</label>
                </div>
              </div>
              <div className="totalPrice">
                <div className="iOrder-content-item flex gap-10 w-full relative">
                  <div className="iOrder-content-item-title ">
                    <h1 className="">Tổng Tiền</h1>
                  </div>
                  <div className="iOrder-content-item-content absolute right-0">
                    <h1 className="">{totalPrice}</h1>
                  </div>
                </div>
              </div>
              <div className="btnSection flex justify-center">
                <div onClick={handlePostOrder} className="btn">
                  Thanh Toán Hoàn Tất
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
