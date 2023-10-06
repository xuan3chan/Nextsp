import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [accountName, setaccountName] = useState("");
  const [password, setPassword] = useState("");
  const [dataFromDB, setDataFromDB] = useState([]);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [error, setError] = useState(""); // Thêm state để quản lý lỗi

  useEffect(() => {
    axios.get("http://localhost:3000/userAccount").then((response) => {
      setDataFromDB(response.data);
    });
  }, []);

  const handleLogin = () => {
<<<<<<< HEAD
    // Kiểm tra xem accountName và password có khớp với dữ liệu trong db.json không
    const isMatch = dataFromDB.some(
      (item) => item.accountName === accountName && item.password === password
    );

    if (isMatch) {
      setIsLoginSuccessful(true);
      setError(""); // Reset lỗi nếu đăng nhập thành công
      navigate("/Homepage"); // Chuyển hướng đến trang dashboard sau khi đăng nhập thành công
    } else {
      setIsLoginSuccessful(false);
      setError("Tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
    console.log("đăng nhập thành công");
  };
//Check Check
=======
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
>>>>>>> 086b11812d59b667a5b112a3cbed5896e6ca83f9
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
            placeholder="accountName hoặc email"
            value={accountName}
            onChange={(e) => setaccountName(e.target.value)}
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
          {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi nếu có */}
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
