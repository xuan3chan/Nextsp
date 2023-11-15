import React from "react";
import "../../assets/css/collection.css";
import { FaCheckCircle } from "react-icons/fa";
function FlaskSale(props) {
  return (
    <div>
      <div className="Flask-Sale-Section border-black border-spacing-1 ">
        <div className="FlaskSale-Title flex justify-center items-center">
          Khuyến Mãi
        </div>
        <div className="FlaskSale-desc h-full flex justify-center items-center flex-col ">
          <h1 className="FlaskSale-main-text">Khuyến Mãi Ưu Đãi Lên Đến 50%</h1>
          <div className="flex flex-col items-center h-3/4">
            <div className="flex items-center h-16 w-3/4 gap-1">
              <FaCheckCircle />
              <p>
                Vivobook Tựu Trường, Ưu Đãi Tới TUF" (Từ 01.08 đến 31.10.2023)
              </p>
            </div>
            <div className="flex items-center h-16 w-3/4 gap-1">
              <FaCheckCircle />
              <p>
                Vivobook Tựu Trường, Ưu Đãi Tới TUF" (Từ 01.08 đến 31.10.2023)
              </p>
            </div>
            <div className="flex items-center h-16 w-3/4 gap-1">
              <FaCheckCircle />
              <p>
                Vivobook Tựu Trường, Ưu Đãi Tới TUF" (Từ 01.08 đến 31.10.2023)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlaskSale;
