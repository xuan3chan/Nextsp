import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3101/api/auth/login";
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage errors

  const handleLogin = () => {
    const postData = {
      accountName,
      email: "", // You can send an empty string for email or remove it from the request if not needed
      password,
    };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        console.log("Response data:", response.data);

        // Reset input fields
        setAccountName("");
        setPassword("");

        // Store the token in local storage
        localStorage.setItem("accessToken", response.data.accessToken);

        // Navigate to the homepage
        navigate("/Homepage");
      })
      .catch((error) => {
        console.error("Error:", error.response.data.message);
        setError("Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-login-pink via-login-blue to-login-green">
      <div className="text-center w-[400px] h-fit pt-[50px] px-10 border-2 border-white rounded-xl bg-[#ece9fe]/30 shadow-md">
        <h1 className="text-4xl pb-5"> Đăng nhập</h1>
        <div className="flex flex-col items-start">
          <label className="ml-1 mb-2" htmlFor="accountName">
            Nhập tài khoản:{" "}
          </label>
          <input
            id="accountName"
            className="w-full py-2 px-3 mb-4 rounded-xl"
            placeholder="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <label className="ml-1 mb-2" htmlFor="password">
            Nhập mật khẩu{" "}
          </label>
          <input
            id="password"
            className="w-full py-2 px-3 rounded-xl"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            className="px-3 py-2 rounded w-full text-white my-3 mt-5 bg-blue-700"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
          <p className="py-4">
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-700">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
