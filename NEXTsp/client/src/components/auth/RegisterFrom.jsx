import React, { useState } from "react";
import {Link} from 'react-router-dom'
import "../../assets/css/registerFrom.css";
import axios from "axios";

const RegisterFrom = () => {
  // const apiUrl = "http://localhost:3001/useraccount";
  const apiUrl = "http://localhost:3101/api/register";
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
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-login-pink via-login-blue to-login-green">
      <div className="text-center w-[400px] h-fit pt-[50px] px-10 border-2 border-white rounded-xl bg-[#ece9fe]/30 shadow-md">
        <h1 className="text-4xl pb-5">Đăng ký</h1>
        <div className="flex flex-col items-start">
          <label className="ml-1 mb-2" htmlFor="firstName">Họ và tên: </label>
          <input id="firstName" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            placeholder="Tên Đầy Đủ"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label className="ml-1 mb-2" htmlFor="email">Email: </label>
          <input id="email" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="ml-1 mb-2" htmlFor="username">Tên tài khoản: </label>
          <input id="username" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            // name=""
            placeholder="Username"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <label className="ml-1 mb-2" htmlFor="password">Tạo mật khẩu: </label>
          <input id="password" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="ml-1 mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu: </label>
          <input id="confirmPassword" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="px-3 py-2 rounded w-full text-white my-3 mt-5 bg-blue-700"
            onClick={handleRegister}
          >
            Đăng ký
          </button>
          <p className="py-4"> 
            Bạn đã có tài khoản? <Link to='/login' className="text-blue-700">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;
