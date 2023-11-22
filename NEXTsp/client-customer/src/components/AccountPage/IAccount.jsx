import React from "react";
import "../../assets/css/Account.css";
import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
function IAccount(props) {
  const [accountName, setAccountName] = useState("");
  const [phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const apiUrl = "http://localhost:3101/api/auth/user";
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAccountName(response.data.user.fullName);
        setPhone(response.data.user.phoneNumber);
        setEmail(response.data.user.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="h-full w-full">
      <div className="InforAccountSection flex flex-col gap-2">
        <div className="title">
          <p>Thông Tin Cá Nhân</p>
        </div>
        <div className="I-Item InforAccountSection-content flex flex-col gap-4">
          <div className="userFullName flex gap-2 items-center">
            <div className="sub-title">Họ Tên</div>
            <input
              className="sub-title-content p-2 border-black font-normal"
              name="userFullName"
              type="text"
              defaultValue={accountName}
            />
          </div>
          <div className="I-Item userSex flex gap-2 items-center">
            <div className="sub-title">Giới tính</div>
            <div className="sub-title-content flex items-center gap-1">
              <input type="radio" name="Male" id="sex" />
              <label htmlFor="Male">Nam</label>
              <input type="radio" name="feMale" id="sex" />
              <label htmlFor="feMale">Nữ</label>
            </div>
          </div>
          <div className="I-Item userPhone flex gap-2 items-center">
            <div className="sub-title">Số điện thoại</div>
            <input
              className="sub-title-content p-2 border-black font-normal"
              name="phone"
              type="text"
            />
            <button className="btnChange">Thay Đổi</button>
          </div>
          <div className="userEmail flex gap-2 items-center">
            <div className="sub-title">Email</div>
            <input
              className="sub-title-content p-2 border-black font-normal"
              name="email"
              type="text"
              defaultValue={Email}
            />
            <button className="btnChange">Thay Đổi</button>
          </div>
          <div className="userBirth flex gap-2 items-center">
            <div className="sub-title">Ngày sinh</div>
            <span className="sub-title-content w-2/3">
              <input className="p-2 " type="date" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IAccount;
