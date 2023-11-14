import React from "react";
import { Breadcrumb, Header } from "../components";
import "../assets/css/main.css";
import "../assets/css/CustomerInformation.css";
import { useState } from "react";
import TotalSection from "../components/Cart/TotalSection";
import axios from "axios";
function CustomerShipping(props) {
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });

  // Hàm xử lý khi người dùng thay đổi giá trị của các trường
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm xử lý khi người dùng submit form
  const handleSubmit = (e) => {
    localStorage.setItem(
      "customerInformation",
      JSON.stringify({
        fullName: formData.recipientName,
        phone: formData.phoneNumber,
        address: formData.address,
        email: formData.email,
      })
    );
    e.preventDefault();
    window.location.href = "/payment";
  };

  return (
    <div className="bg-cart h-full">
      <Header></Header>
      <div className="pt-24 w-full">
        <div className="CustomerInformationSection ml-auto mr-auto border-spacing-1">
          <div className="customerInformation pb-8">
            <h1 className="title text-center w-full">Thông Tin Khách Hàng</h1>
            <form className="shipping-form" onSubmit={handleSubmit}>
              <div className="flex w-full gap-4">
                <div className="form-group w-1/2">
                  <label htmlFor="recipientName">Tên người nhận:</label>
                  <input
                    type="text"
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    required
                    placeholder="Bắt buộc nhập"
                  />
                </div>
                <div className="form-group w-1/2">
                  <label htmlFor="phoneNumber">Số điện thoại:</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="Bắt buộc nhập"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Bắt buộc nhập"
                />
              </div>
              <div className="w-full h-10 flex items-center gap-1">
                <input type="radio" name="shipping" id="shipping" />
                <label htmlFor="shipping">Giao hàng tận nơi</label>
              </div>
              <div className="form-group">
                <label htmlFor="email">Địa Chỉ:</label>
                <input
                  type="address"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Bắt buộc nhập"
                />
              </div>
              <TotalSection></TotalSection>
              <button className="btn  justify-center " type="submit">
                Xác Nhận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerShipping;
