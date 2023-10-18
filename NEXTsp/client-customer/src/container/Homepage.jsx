import React from "react";
import {
  Header,
  BannerSales,
  BlogSection,
  BannerScroll,
  SloganListSection,
  ProductNewList,
  Footer,
} from "../components";
import "../assets/css/homepage.css";

function Homepage(props) {
  return (
    <div>
      <Header></Header>
      <div className="container_content mt-[56px] bg-gray-100">
        <BannerScroll />
        <div className="container-product-section inline-block relative">
        <div className="flex flex-col w-4/5 contents-center mr-auto ml-auto gap-8 ">
        <SloganListSection></SloganListSection>
          <ProductNewList title="Sản phẩm mới"></ProductNewList>
          <ProductNewList title="Laptop"></ProductNewList>
          <ProductNewList title="PC - Máy Bàn"></ProductNewList>
          </div>
        </div>

        <BannerSales />
        <BlogSection />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
