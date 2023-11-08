 import React from 'react';
 import '../../assets/css/main.css'
 function ButtonBuyNow(props) {
    const handleBuyBtn = () => {
        alert("Không Bán");
      };
    return (
        <div>
        <div className="btn p-1  flex justify-center btn-sell ">
        Mua Ngay
      </div>
        </div>
    );
 }
 
 export default ButtonBuyNow;