import React from "react";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";

>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
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
<<<<<<< HEAD

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
=======
import "../assets/css/main.css";
function Homepage(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="loading">
          <RiseLoader color="#212529" />
        </div>
      ) : (
        <div>
          <Header></Header>
          <div className="container_content mt-[56px] color-bg">
            <BannerScroll />
            <div className="container-product-section inline-block relative">
              <div className="flex flex-col w-4/5 contents-center mr-auto ml-auto gap-10">
                <SloganListSection></SloganListSection>
                <ProductList
                  title="Sản phẩm mới"
                  CollectionName=""
                ></ProductList>
                <ProductList
                  title="Laptop"
                  CollectionName="Laptop"
                ></ProductList>
                <ProductList
                  title="PC - Máy Bàn"
                  CollectionName="PC"
                ></ProductList>
                <ProductList
                  title="Gear Gaming"
                  CollectionName="PhuKien"
                ></ProductList>
                <ProductList
                  title="Linh Kiện Máy Tính"
                  CollectionName="LinhKien"
                ></ProductList>
              </div>
            </div>
            <BannerSales />
            <BlogSection />
          </div>
          <Footer />
        </div>
      )}
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
    </div>
  );
}

export default Homepage;
