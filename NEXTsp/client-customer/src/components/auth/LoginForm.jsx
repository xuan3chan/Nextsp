import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo_2.png";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
const apiUrl = "https://nextsp-server.id.vn/api/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("null");
  const [errors, setErrors] = useState({});

  const handleLogin = () => {
    const data = {
      accountName: accountName,
      password: password,
    };
    const handleFieldBlur = (fieldName) => {
      setErrors({ ...errors, [fieldName]: undefined });
    };
    axios
      .post(apiUrl, data)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("accountName", response.data.accountName);
          setTimeout(() => {
            navigate("/homepage");
          }, 200);
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        if (error.response) {
          setError("Đăng nhập thất bại");
        } else {
          setError("null");
        }
      });
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className=" w-full flex flex-col justify-center items-center bg-gradient-to-tl bg-color ">
      <div className="logoSection w-full bg-white">
        <div className="flex items-center content-center">
          <div className="ml-28 logo">
            <Link to="/homepage">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <span className="LoginSectionTitle border-l-2 border-black pl-4 w-56 font-semibold text-xl">
            Trang Đăng Nhập
          </span>
        </div>
      </div>
      <div className="LoginSection relative ">
        <div className="Form absolute right-32 top-10 text-center pt-[50px] px-10 border-2 border-white rounded-xl bg-white">
          <h1 className="text-4xl pb-5">Đăng Nhập</h1>
          <div className="flex flex-col items-start">
            <label className="ml-1 mb-2" htmlFor="username">
              Tên tài khoản:
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
              Tạo mật khẩu:
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
            {error == "null" ? (
              ""
            ) : (
              <div className="text-red-500 float-right">{error}</div>
            )}
            <div className="RegisterAnswer flex gap-1">
              <span>Bạn chưa có tài khoản?</span>
              <a className=" text-blue-700 underline" href="/register">
                Đăng ký
              </a>
            </div>
            <button
              className="px-3 py-2 rounded w-full text-white my-3 mt-5 btn"
              onClick={handleLogin}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
