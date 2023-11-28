import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/img/Logo_2.png";
import "../../assets/css/Login.css";
import { Link } from "react-router-dom";

function LoginFromNew(props) {
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "https://nextsp-server.id.vn/api/auth/login";

  const handleLogin = () => {
    const data = {
      accountName: accountName,
      password: password,
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
        setError("Đăng nhập thất bại");
      });
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-full flex items-center justify-center content-center">
      <div className="LoginFormSection ml-auto mr-auto w-1/4">
        <input
          type="radio"
          name="optionScreen"
          id="SignIn"
          hidden
          checked
        ></input>
        <input type="radio" name="optionScreen" id="SignUp" hidden></input>
        <section>
          <div id="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="OptionSection">
            <label for="SignIn">Đăng Nhập</label>
            <label for="SignUp">Đăng Ký</label>
          </div>
          ``{" "}
          <form action="" id="SignInFormData">
            <input
              type="text"
              id="username"
              placeholder="Tài Khoản"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              onKeyDown={handleEnterPress}
            ></input>
            <input
              type="password"
              id="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnterPress}
            ></input>
            <span>
              <input type="checkbox" id="staySingedIn" checked></input>
              <label for="staySingedIn">Lưu tài khoản</label>
            </span>
            <button type="button" title="Sing In" onClick={handleLogin}>
              Đăng Nhập
            </button>

            <a id="forgotPassword">Quên Mật Khẩu?</a>
          </form>
        </section>
      </div>
    </div>
  );
}

export default LoginFromNew;
