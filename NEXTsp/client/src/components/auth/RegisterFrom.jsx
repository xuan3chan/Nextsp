import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../../assets/css/registerFrom.css";
import axios from "axios";

const RegisterForm = () => {
  const apiUrl = "http://localhost:3101/auth/register";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginPage = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFieldBlur = (fieldName) => {
    setErrors({ ...errors, [fieldName]: undefined });
  };

  const validateForm = () => {
    const formErrors = {};

    if (!fullName.trim()) {
      formErrors.fullName = "Tên không được để trống";
    }

    if (!email.trim()) {
      formErrors.email = "Email không được để trống";
    }

    if (!accountName.trim()) {
      formErrors.accountName = "Tên tài khoản không được để trống";
    }

    if (!password.trim()) {
      formErrors.password = "Mật khẩu không được để trống";
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    const postData = {
      fullName,
      email,
      accountName,
      password,
      confirmPassword,
    };

    axios.post(apiUrl, postData)
      .then((response) => {
        console.log("Response data:", response.data);
        setFullName("");
        setEmail("");
        setAccountName("");
        setPassword("");
        setConfirmPassword("");
        // Redirect to login page or do something else
        loginPage('/login');
      })
      .catch((error) => {
        console.error("Error:", error.response);
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          // Handle unexpected errors
          setErrors({ general: "Something went wrong. Please try again." });
        }
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-login-pink via-login-blue to-login-green">
      <div className="text-center w-[600px] max-h[900px] pt-[50px] px-10 border-2 border-white rounded-xl bg-[#ece9fe]/30 shadow-md">
        <h1 className="text-4xl pb-5">Đăng ký</h1>
        <div className="flex flex-col items-start">
          <label className="ml-1 mb-2" htmlFor="firstName">Họ và tên: </label>
          <input
            id="firstName"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            placeholder="Tên Đầy Đủ"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleFieldBlur("fullName")}
          />
          {errors.fullName && <div className="text-red-500 float-right">{errors.fullName}</div>}

          <label className="ml-1 mb-2" htmlFor="email">Email: </label>
          <input
            id="email"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}

          <label className="ml-1 mb-2" htmlFor="username">Tên tài khoản: </label>
          <input
            id="username"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            placeholder="Username"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          {errors.accountName && <div className="text-red-500 float-right">{errors.accountName}</div>}

          <label className="ml-1 mb-2" htmlFor="password">Tạo mật khẩu: </label>
          <input
            id="password"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="text-red-500 float-right">{errors.password}</div>}

          <label className="ml-1 mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu: </label>
          <input
            id="confirmPassword"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="text-red-500 float-right">{errors.confirmPassword}</div>}

          {errors.general && <div className="text-red-500">{errors.general}</div>}

          <button
            className="px-3 py-2 rounded w-full text-white my-3 mt-5 bg-blue-700"
            onClick={handleRegister}
          >
            Tiếp tục
          </button>

          <p className="py-4">
            Bạn đã có tài khoản? <Link to='/login' className="text-blue-700">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
