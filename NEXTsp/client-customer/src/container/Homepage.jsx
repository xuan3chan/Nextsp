import React from "react";
import {
  Header,
  BannerSales,
  BlogSection,
  BannerScroll,
  SloganListSection,
  ProductList,
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
          <div className="flex flex-col w-4/5 contents-center mr-auto ml-auto gap-10">
            <SloganListSection></SloganListSection>
            <ProductList title="Sản phẩm mới"></ProductList>
            <ProductList title="Laptop"></ProductList>
            <ProductList title="PC - Máy Bàn"></ProductList>
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
