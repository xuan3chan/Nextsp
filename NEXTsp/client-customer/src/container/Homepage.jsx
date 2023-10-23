import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";

>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";

=======
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
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
=======
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
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
<<<<<<< HEAD
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
=======

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
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
    </div>
  );
}

export default Homepage;
