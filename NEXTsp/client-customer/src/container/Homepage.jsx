import React from 'react';
import { BannerTop, Header, BannerSales, BlogSection,BannerScroll,SloganListSection,ProductList } from '../components'; 
import '../assets/css/homepage.css';
function Homepage(props) {
    return (
        <div>
          <BannerTop></BannerTop>
          <Header></Header>
          <div className="container_content">
          <BannerScroll/>
          <SloganListSection/>
          <ProductList></ProductList>
          <ProductList></ProductList>
          
          <BannerSales/>
          <BlogSection/>
          </div>
        </div>
    );
}

export default Homepage;