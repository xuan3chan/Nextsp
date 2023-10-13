import React from 'react';
import { BannerTop, Header, BannerSales } from '../components'; 
import '../assets/css/homepage.css';

function Homepage(props) {
    return (
        <div>
          <BannerTop></BannerTop>
          <Header></Header>
          <BannerSales/>
        </div>
    );
}

export default Homepage;