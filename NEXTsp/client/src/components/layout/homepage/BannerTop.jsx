import React from 'react';
import '../../../assets/css/homepage.css';
import bannerTop from '../../../assets/img/banner_top.png';

function BannerTop(props) {
    return (
        <div>
        <img src={bannerTop} alt="" className="banner_top" />
        </div>
    );
}

export default BannerTop;