import React from 'react';
import { Header, BannerSales, BlogSection, BannerScroll,SloganListSection,ProductNewList, Footer, ProductSlide} from '../components'; 
import '../assets/css/homepage.css';
import BannerLeft from '../assets/img/banner/banner_left.png'
import BannerRight from '../assets/img/banner/banner_right.png'

function Homepage(props) {
    return (
        <div>
          <Header></Header>
          <div className="container_content mt-[56px] bg-gray-100">
            <img className='BannerLeft ' src={BannerLeft} alt=""></img>
            <img className='BannerRight ' src ={BannerRight} alt=''></img>
            <BannerScroll/>
            <ProductSlide/>
            <SloganListSection/>
            <ProductNewList title = "Sản phẩm mới"></ProductNewList>
            <ProductNewList title = "Laptop" ></ProductNewList>
            <ProductNewList title = "PC - Máy Bàn" ></ProductNewList>
            <BannerSales/>
            <BlogSection/>
          </div>
          <Footer/>
        </div>
    );
}

export default Homepage;