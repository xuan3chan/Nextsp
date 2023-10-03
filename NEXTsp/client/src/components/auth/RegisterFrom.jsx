import React, { useState } from "react";
import "../../assets/css/registerFrom.css";
import axios from "axios";

const RegisterFrom = () => {
  const apiUrl = "http://localhost:3001/useraccount";
  const [fullName, setFullName] = useState(""); // Thêm biến trạng thái cho Tên Đầy Đủ
  const [email, setEmail] = useState(""); // Thêm biến trạng thái cho Email
  const [accountName, setAccountName] = useState(""); // Thêm biến trạng thái cho Tài Khoản
  const [password, setPassword] = useState(""); // Thêm biến trạng thái cho Mật Khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm biến trạng thái cho Xác Nhận Mật Khẩu

  const handleRegister = () => {
    // Tạo đối tượng dữ liệu từ các biến trạng thái
    const postData = {
      fullName,
      email,
      accountName,
      password,
      confirmPassword,
    };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        console.log("Response data:", response.data);

        // Xóa giá trị trong các ô nhập liệu bằng cách cập nhật các biến trạng thái
        setFullName("");
        setEmail("");
        setAccountName("");
        setPassword("");
        setConfirmPassword("");
        console.log("Response data:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-black">
      <div className="form">
      <h1>Đăng Ký Tài Khoản</h1>
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="userName">
              Tên Đầy Đủ
            </label>
            <input
              className="form__input"
              type="text"
              id="firstName"
              placeholder="Tên Đầy Đủ"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Liên kết với biến trạng thái fullName
            />
          </div>

          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Liên kết với biến trạng thái email
            />
          </div>
          <div className="accountName">
            <label className="form__label" for="accountName">
              Tài Khoản{" "}
            </label>
            <input
              type="text"
              name=""
              id="lastName"
              className="form__input"
              placeholder="Tài Khoản"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)} // Liên kết với biến trạng thái accountName
            />
          </div>
          <div className="password">
            <label className="form__label" for="password">
              Mật Khẩu{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Liên kết với biến trạng thái password
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Xác Nhận Mật Khẩu{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Xác Nhận Mật Khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Liên kết với biến trạng thái confirmPassword
            />
          </div>
        </div>
        <div class="footer">
          <button
            onClick={handleRegister}
            type="submit"
            class="button-31 btn"
            role="button"
          >
            Đăng Ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;
