import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/img/Logo_2.png";
import Footer from "../../components/Footer";
import "../../assets/css/Login.css";
const RegisterForm = () => {
  const apiUrl = "https://nextsp-server.id.vn/api/auth/register";
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

    axios
      .post(apiUrl, postData)
      .then((response) => {
        console.log("Response data:", response.data);
        setFullName("");
        setEmail("");
        setAccountName("");
        setPassword("");
        setConfirmPassword("");
        // Redirect to login page or do something else
        loginPage("/loginUser");
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
    <div className=" w-full flex flex-col justify-center items-center bg-gradient-to-tl bg-color">
      <div className="logoSection w-full bg-white">
        <div className="ml-28 flex items-center content-center pt-4">
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <span className=" border-l-2 border-black pl-4 w-56 font-semibold text-xl">
            Trang Đăng Nhập
          </span>
        </div>
      </div>
      <div className="RegistSection relative ">
        <div className="Form absolute right-64 top-10 text-center pt-[50px] px-10 border-2 border-white rounded-xl bg-white">
          <h1 className="text-4xl pb-5">Đăng ký</h1>
          <div className="flex flex-col items-start">
            <label className="ml-1 mb-2" htmlFor="firstName">
              Họ và tên:{" "}
            </label>
            <input
              id="firstName"
              className="w-full py-2 px-3 mb-4 rounder-sm"
              type="text"
              placeholder="Tên Đầy Đủ"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => handleFieldBlur("fullName")}
            />
            {errors.fullName && (
              <div className="text-red-500 float-right">{errors.fullName}</div>
            )}

            <label className="ml-1 mb-2" htmlFor="email">
              Email:{" "}
            </label>
            <input
              id="email"
              className="w-full py-2 px-3 mb-4 rounder-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}

            <label className="ml-1 mb-2" htmlFor="username">
              Tên tài khoản:{" "}
            </label>
            <input
              id="username"
              className="w-full py-2 px-3 mb-4 rounder-sm"
              type="text"
              placeholder="Tải Khoản"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            {errors.accountName && (
              <div className="text-red-500 float-right">
                {errors.accountName}
              </div>
            )}

            <label className="ml-1 mb-2" htmlFor="password">
              Tạo mật khẩu:{" "}
            </label>
            <input
              id="password"
              className="w-full py-2 px-3 mb-4 rounder-sm"
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-red-500 float-right">{errors.password}</div>
            )}

            <label className="ml-1 mb-2" htmlFor="confirmPassword">
              Xác nhận mật khẩu:{" "}
            </label>
            <input
              id="confirmPassword"
              className="w-full py-2 px-3 mb-4 rounder-sm"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 float-right">
                {errors.confirmPassword}
              </div>
            )}

            {errors.general && (
              <div className="text-red-500">{errors.general}</div>
            )}

            <button
              className="px-3 py-2 rounded w-full text-white my-3 mt-5 btn"
              onClick={handleRegister}
            >
              Tiếp tục
            </button>
            <p className="py-4">
              Bạn đã có tài khoản?{" "}
              <Link to="/LoginUser" className=" text-blue-400">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RegisterForm;
