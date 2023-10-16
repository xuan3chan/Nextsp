import React from 'react';
import { Header, BannerSales, BlogSection, BannerScroll,SloganListSection,ProductList, Footer} from '../components'; 
import '../assets/css/homepage.css';
function Homepage(props) {
    return (
        <div>
          <Header></Header>
          <div className="container_content mt-[56px]">
            <BannerScroll/>
            <SloganListSection/>
            <ProductList></ProductList>
            <ProductList></ProductList>
            
            <BannerSales/>
            <BlogSection/>
          </div>
          <Footer/>
        </div>
    );
}

export default Homepage;