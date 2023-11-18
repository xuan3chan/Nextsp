import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import "../assets/css/Payment.css";

function PaymentPage(props) {
  const [cart, setCart] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [methods, setMethods] = useState(null);
  const codImageLink =
    "https://file.hstatic.net/200000636033/file/pay_2d752907ae604f08ad89868b2a5554da.png";
  const qrImageLink = "https://cdn-icons-png.flaticon.com/512/5371/5371682.png";

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = JSON.parse(storedCart) || [];
    const cartWithCount = parsedCart.map((item) => ({ ...item, count: 1 }));
    setCart(cartWithCount);
  }, []);

  const customerInformation = JSON.parse(
    localStorage.getItem("customerInformation")
  );

  const { fullName, phone, address } = customerInformation;
  const userId = localStorage.getItem("userId");
  const totalPrice = Number(localStorage.getItem("totalPrice"));

  const imageUrlQR = `https://img.vietqr.io/image/tpb-04144454101-compact2.jpg?amount=${totalPrice}&addInfo=NextSP%20Store%20Payment,%20userId:${userId}&accountName=Nguy%E1%BB%85n%20V%C4%83n%20Thi%E1%BB%87n`;

  const handlePaymentChange = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setMethods(
      paymentMethod === "QR"
        ? { qr: true, transfer: false }
        : { qr: false, transfer: true }
    );
  };

  const handleOrder = () => {
    const userId = localStorage.getItem("userId");
    const totalPrice = Number(localStorage.getItem("totalPrice"));
    const fullName = customerInformation.fullName;
    const phone = customerInformation.phone;
    const address = customerInformation.address;
    const tracking = "pending";
    const payment = "COD";
    const addInfo = `NextSP Store Payment, userId: ${userId}`;
    const accountName = "Nguyễn Văn Thiện";
    const imageUrlQR = `https://img.vietqr.io/image/tpb-04144454101-compact2.jpg?amount=${totalPrice}&addInfo=${addInfo}&accountName=${accountName}`;
    const product = cart.map((item) => ({
      productId: item.id,
      quantity: item.count,
    }));
    const data = {
      userId,
      product,
      totalPrice,
      address,
      phone,
      fullName,
      payment,
      tracking,
    };

    const apiUrl = "http://localhost:3101/api/orders/add";

    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log("Order placed successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });

    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("customerInformation");
    window.location.href = "/homepage";
    alert("Đặt hàng thành công");
  };
  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "";
  }
  return (
    <div className="bg-cart">
      <Header></Header>
      <div className="pt-24 w-full pb-24">
        <div className="CustomerInformationSection ml-auto mr-auto border-spacing-1">
          <div className="customerInformation pb-8">
            <h1 className="title text-center w-full">Thanh Toán Đơn Hàng</h1>
            <div className="w-4/5 mr-auto ml-auto">
              {/* ... (rest of your code) */}
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
                  <img className=" w-6 h-6" src={codImageLink} alt="" />
                  <label htmlFor="COD"> Thanh toán khi giao hàng (COD)</label>
                </div>
                <div className="paymentStep-qr flex flex-col">
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="QR"
                      checked={selectedPayment === "QR"}
                      onChange={() => handlePaymentChange("QR")}
                    />
                    <img className="w-6 h-6" src={qrImageLink} alt="" />
                    <label htmlFor="QR"> Thanh toán chuyển khoản (QR)</label>
                  </div>
                  <img
                    className="QRbanking w-72 h-86"
                    src={imageUrlQR}
                    alt=""
                  />
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
