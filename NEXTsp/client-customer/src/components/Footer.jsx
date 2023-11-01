import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="bg-footer w-full h-60 bg-white">
        <div className="footerSection flex gap-14 justify-center pt-10">
          <div className="footer-col-1 flex flex-col">
            <h1>Về NextSP Store</h1>
            <p>Giới Thiệu</p>
            <p>Tuyển Dụng</p>
          </div>
          <div className="footer-col-2">
            <h1>Chính Sách</h1>
            <p>Chính Sách Bảo Hành</p>
            <p>Chính Sách Thanh Toán</p>
            <p>Chính Sách Giao Hàng</p>
            <p>Chính Sách Bảo Mật</p>
          </div>
          <div className="footer-col-3">
            <h1>Thông Tin</h1>
            <p>Hệ Thống Cửa Hàng</p>
            <p>Trung Tâm Bảo Hành</p>
          </div>
          <div className="footer-col-4">
            <h1>Tổng Đài Hổ Trợ ( Gọi Miễn Phí )</h1>
            <p>
              Gọi Mua : <span className="phoneNumber">0123456789</span>
              <span> (8:00 - 21:00)</span>
            </p>
            <p>
              CSKH : <span className="phoneNumber">0123456789</span>
              <span> (8:00 - 21:00)</span>
            </p>
            <p>
              Email : <span>cskh@nextsp.com</span>
            </p>
          </div>
          <div className="footer-col-5">
            <h1>Đơn Vị Vận Chuyển</h1>
            <div className="image-section flex">
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=2006"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=2006"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=2006"
                alt=""
              />
              <img
                src="https://theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=2006"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
