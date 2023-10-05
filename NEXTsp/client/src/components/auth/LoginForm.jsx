import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    const postData = {
      userName,
      password,
    };
    axios
      .post("http://localhost:3101/login", postData)
      .then((response) => {
        console.log("Response data:", response.data);
        setUserName("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-login-pink via-login-blue to-login-green">
      <div className="text-center w-[400px] h-fit pt-[50px] px-10 border-2 border-white rounded-xl bg-[#ece9fe]/30 shadow-md">
        <h1 className="text-4xl pb-5"> Đăng nhập</h1>
        <div className="flex flex-col items-start">
          <label className="ml-1 mb-2" htmlFor="userName">Nhập tài khoản: </label>
          <input id="userName" className="w-full py-2 px-3 mb-4 rounded-xl"
            placeholder="Username hoặc email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label className="ml-1 mb-2" htmlFor="password">Nhập mật khẩu </label>
          <input id="password" className="w-full py-2 px-3 rounded-xl"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="px-3 py-2 rounded w-full text-white my-3 mt-5 bg-blue-700"
            onClick={handleLogin}
          >
            Tiếp tục
          </button>
          <p className="py-4">
            Bạn chưa có tài khoản? <Link to="/register" className="text-blue-700">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginForm;