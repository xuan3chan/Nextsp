import React from 'react';
import Header from './Header';
import '../../../assets/css/homepage.css';
import BannerTop from './BannerTop';

function Homepage(props) {
    return (
        <div>
        <BannerTop></BannerTop>
        <Header></Header>
        </div>
    );
}

export default Homepage;