import React from "react";
import "../../assets/css/Account.css";
import { Input } from "@material-tailwind/react";
function InforAccount(props) {
  return (
    <div className="h-full w-full">
      <div className="InforAccountSection flex flex-col">
        <div className="title">
          <p>Thông Tin Cá Nhân</p>
        </div>
        <div className="InforAccountSection-content flex flex-col">
          <div className="userFullName flex">
            <div className="sub-title userFullName  ">Họ Tên</div>
            <input
              className="p-2 border-black "
              name="userFullName"
              type="text"
            />
          </div>
          <div className="userSex flex gap-2 items-center">
            <div className="sub-title ">Giới tính</div>
            <input type="radio" name="Male" id="" />
            <label htmlFor="Male">Nam</label>
            <input type="radio" name="feMale" id="" />
            <label htmlFor="feMale">Nữ</label>
          </div>
          <div className="userPhone">
            <div className="sub-title">Số điện thoại</div>
          </div>
          <div className="userEmail">
            <div className="sub-title">Email</div>
          </div>
          <div className="userAvatar">
            <div className="sub-title">Ngày sinh</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforAccount;
