import React from "react";

function ProcessBar() {
  return (
    <div>
      <div className="ProcessSection flex gap-4 justify-center align-top">
        <div className="Process-item CartStep bg-step ">
          <div className="process-Icon CartStep-Icon">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="process-Title">Giỏ Hàng</div>
        </div>
        <div className="Process-item InfoStep bg-step">
          <div className="process-Icon">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="process-Title">Thông Tin Đặt Hàng</div>
        </div>
        <div className="Process-item PaymentStep bg-step">
          <div className="process-Icon">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="process-Title">Thanh Toán</div>
        </div>
        <div className=" Process-item FinishStep bg-step">
          <div className="process-Icon">
            <i className="fa fa-shopping-cart"></i>
          </div>
          <div className="process-Title">Hoàn Tất</div>
        </div>
      </div>
    </div>
  );
}

export default ProcessBar;
