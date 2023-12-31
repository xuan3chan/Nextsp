import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import "../assets/css/Payment.css";
import Swal from "sweetalert2";
function PaymentPage(props) {
  const [cart, setCart] = React.useState([]);
  const [FullCart, setFullCart] = React.useState([]);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(storedCart) || [];
    setCart(parsedCart);
  }, []);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  // Update payment method when the customer selects a different option

  const handlePaymentChange = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };
  const codImageLink =
    "https://file.hstatic.net/200000636033/file/pay_2d752907ae604f08ad89868b2a5554da.png";
  const qrImageLink = "https://cdn-icons-png.flaticon.com/512/5371/5371682.png";
  const customerInformation = JSON.parse(
    localStorage.getItem("customerInformation")
  );
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  const userId = localStorage.getItem("userId");
  const totalPrice = localStorage.getItem("totalPrice");
  const fullName = customerInformation.fullName;
  const phone = customerInformation.phone;
  const address = customerInformation.address;
  const tracking = "pending";
  const totalPriceNumber = Number(totalPrice);
  const addInfo = `NextSP Store, userId: ${userId}`;
  const accountName = localStorage.getItem("accountName");
  const imageUrlQR = `https://img.vietqr.io/image/tpb-04144454101-compact2.jpg?amount=${totalPriceNumber}&addInfo=${addInfo}&accountName=${"Nguyễn Văn Thiện"}`;
  const payment = selectedPayment;
  const product = cart.map((item) => ({
    productId: item.id,
    quantity: item.count,
  }));

  const data = {
    userId,
    product,
    address,
    phone,
    fullName,
    payment,
    tracking,
  };

  const apiUrl = process.env.REACT_APP_ADD_ORDER_API;

  const handleOrder = () => {
    axios
      .post(apiUrl, data)
      .then((response) => {
        // Handle success
        console.log("Order placed successfully:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error placing order:", error);
      });
    Swal.fire({
      title: "Thành Công!",
      text: "Đặt hàng thành công",
      icon: "success",
      confirmButtonText: "OK",
    });
    setTimeout(() => {
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("customerInformation");
      window.location.href = "/homepage";
    }, 2000);
  };

  return (
    <div className="bg-cart">
      <Header></Header>
      <div className="pt-24 w-full pb-24">
        <div className="CustomerInformationSection ml-auto mr-auto border-spacing-1">
          <div className="customerInformation pb-8">
            <h1 className="title text-center w-full">Thanh Toán Đơn Hàng</h1>
            <div className="w-4/5 mr-auto ml-auto">
              <div className="iOrder border-b-2 border-black p-8">
                <div className="iOrder-title">
                  <h1 className="">Thông Tin Đặt Hàng</h1>
                </div>
                <div className="iOrder-content">
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tên Người Nhận:</h1>
                    </div>
                    <div className="iOrder-content-item-content">
                      <h1 className="">{fullName}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Số Điện Thoại:</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{phone}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Địa Chỉ:</h1>
                    </div>
                    <div className="iOrder-content-item-content ">
                      <h1 className="">{address}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tạm Tính:</h1>
                    </div>
                    <div className="iOrder-content-item-content iOrder-price ">
                      <h1 className="">{formatPrice(totalPrice)}</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Phí Vận Chuyển:</h1>
                    </div>
                    <div className="iOrder-content-item-content iOrder-price">
                      <h1 className="">Miễn Phí</h1>
                    </div>
                  </div>
                  <div className="iOrder-content-item flex gap-10">
                    <div className="iOrder-content-item-title w-40">
                      <h1 className="">Tổng Tiền:</h1>
                    </div>
                    <div className="iOrder-content-item-content iOrder-price">
                      <h1 className="">{formatPrice(totalPrice)}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="paymentStep border-b-2 border-black p-8">
                <div className="paymentStep-title">
                  Chọn hình thức thanh toán
                </div>
                <div className="paymentStep-cod flex gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="COD"
                    checked={selectedPayment === "COD"}
                    onChange={() => handlePaymentChange("COD")}
                  />
                  <img className="w-6 h-6" src={codImageLink} alt="" />
                  <label htmlFor="COD"> Thanh toán khi giao hàng (COD)</label>
                </div>

                <div className="paymentStep-qr flex flex-col">
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="QR"
                      checked={selectedPayment === "Banking"}
                      onChange={() => handlePaymentChange("Banking")}
                    />
                    <img className="w-6 h-6" src={qrImageLink} alt="" />
                    <label htmlFor="QR"> Thanh toán chuyển khoản (QR)</label>
                  </div>
                  {selectedPayment === "Banking" && (
                    <img
                      className="QRbanking w-72 h-86"
                      src={imageUrlQR}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="totalPrice">
                <div className="iOrder-content-item flex gap-10 w-full relative">
                  <div className="iOrder-content-item-title ">
                    <h1 className="">Tổng Tiền</h1>
                  </div>
                  <div className="iOrder-content-item-content absolute right-0">
                    <h1 className="">{formatPrice(totalPrice)}</h1>
                  </div>
                </div>
              </div>
              <div className="btnSection flex justify-center">
                <div onClick={handleOrder} className="btn">
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
