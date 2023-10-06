import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import "../../assets/css/registerFrom.css";
import axios from "axios";

const RegisterFrom = () => {
  // const apiUrl = "http://localhost:3001/useraccount";
  const apiUrl = "http://localhost:3101/auth/register";
  const [fullName, setFullName] = useState(""); // Thêm biến trạng thái cho Tên Đầy Đủ
  const [email, setEmail] = useState(""); // Thêm biến trạng thái cho Email
  const [accountName, setAccountName] = useState(""); // Thêm biến trạng thái cho Tài Khoản
  const [password, setPassword] = useState(""); // Thêm biến trạng thái cho Mật Khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm biến trạng thái cho Xác Nhận Mật Khẩu
  const loginPage = useNavigate();
  const [errors, setErrors] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});

  const handleFieldBlur = (fieldName) => {
    setFieldTouched({ ...fieldTouched, [fieldName]: true });
  };
  
  const validateForm = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = "Tên không được để trống";
    }

    if (!email.trim()) {
      errors.email = "Email không được để trống";
    }

    if (!accountName.trim()) {
      errors.accountName = "Tên tài khoản không được để trống";
    }

    if (!password.trim()) {
      errors.password = "Mật khẩu không được để trống";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    return errors;
  };

  const handleRegister = () => {
    // Tạo đối tượng dữ liệu từ các biến trạng thái
    const postData = {
      fullName,
      email,
      accountName,
      password,
      confirmPassword,
    };
  
    // Khởi tạo một đối tượng lỗi rỗng
    const formErrors = {};
  
    // Kiểm tra hợp lệ cho từng trường
    if (!fullName) {
      formErrors.fullName = "Vui lòng nhập họ và tên.";
    }
  
    if (!email) {
      formErrors.email = "Vui lòng nhập địa chỉ email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Địa chỉ email không hợp lệ.";
    }
  
    if (!accountName) {
      formErrors.accountName = "Vui lòng nhập tên tài khoản.";
    }
  
    if (!password) {
      formErrors.password = "Vui lòng nhập mật khẩu.";
    }
  
    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }
  
    // Nếu có lỗi, cập nhật đối tượng lỗi
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; // Không tiếp tục xử lý nếu có lỗi
    }
  
    // Nếu không có lỗi, tiếp tục xử lý đăng ký
    axios
      .post(apiUrl, postData)
      .then((response) => {
        console.log("Response data:", response.data);
  
        // Xóa giá trị trong các ô nhập liệu
        setFullName("");
        setEmail("");
        setAccountName("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-tl from-login-pink via-login-blue to-login-green">
      <div className="text-center w-[600px] max-h[900px] pt-[50px] px-10 border-2 border-white rounded-xl bg-[#ece9fe]/30 shadow-md">
        <h1 className="text-4xl pb-5">Đăng ký</h1>
        <div className="flex flex-col items-start">
          <label className="ml-1 mb-2" htmlFor="firstName">Họ và tên: </label>
          <input id="firstName" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            placeholder="Tên Đầy Đủ"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={() => handleFieldBlur("fullName")}
          />
          {fieldTouched.fullName && errors.fullName && <div className="text-red-500 float-right		">{errors.fullName}</div>}          <label className="ml-1 mb-2" htmlFor="email">Email: </label>
          <input id="email" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}


          <label className="ml-1 mb-2" htmlFor="username">Tên tài khoản: </label>
          <input id="username" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="text"
            // name=""
            placeholder="Username"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          {errors.accountName && <div className="text-red-500 float-right		">{errors.accountName}</div>}

          <label className="ml-1 mb-2" htmlFor="password">Tạo mật khẩu: </label>
          <input id="password" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="text-red-500 float-right		">{errors.password}</div>}

          <label className="ml-1 mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu: </label>
          <input id="confirmPassword" className="w-full py-2 px-3 mb-4 rounded-xl"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <div className="text-red-500 float-right	">{errors.confirmPassword}</div>}

          <button className="px-3 py-2 rounded w-full text-white my-3 mt-5 bg-blue-700"
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

export default RegisterFrom;
