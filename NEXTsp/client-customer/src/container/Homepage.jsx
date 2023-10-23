import React from "react";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";

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
    </div>
  );
}

export default Homepage;
