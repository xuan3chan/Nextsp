import React from 'react';
import SloganItem from './SloganItem';
import "../../assets/css/homepage.css";
function SloganListSection(props) {
    return (
        <div className='flex items-center'>
            <div className="SloganListSection w-3/4 flex flex-wrap justify-center items-center ml-auto mr-auto">
            <SloganItem title="Giao hàng miễn phí" desc="Cho đơn hàng từ 500.000đ trở lên"/>
            <SloganItem title="Hỗ trợ 24/7" desc="Hotline: 1900 1000"/>
            <SloganItem title="Giảm giá 20%" desc="Cho đơn hàng từ 500.000đ trở lên"/>
            <SloganItem title="Bảo Mật Thông Tin" desc="Đảm bảo thông tin khách hàng được bảo mật"/>
            </div>
        </div>
    );
}

export default SloganListSection;