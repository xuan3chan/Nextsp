import React from 'react';
import { BannerTop, Header, BannerSales, BlogSection } from '../components'; 
import '../assets/css/homepage.css';

function Homepage(props) {
    return (
        <div>
          <BannerTop></BannerTop>
          <Header></Header>
          <BannerSales/>
          <BlogSection/>
        </div>
    );
}

export default Homepage;