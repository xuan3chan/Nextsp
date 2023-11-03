import React from "react";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import {
  Header,
  BannerSales,
  BannerScroll,
  SloganListSection,
  ProductList,
  Footer,
  BannerTop,
} from "../components";
import "../assets/css/homepage.css";
import "../assets/css/main.css";
import ProductListAll from "../components/homepage/ProductListAll";

function Homepage(props) {
  const CollectionBrand = ["Apple", "Apple2", "Apple3"];
  const title = ["Apple", "Apple2", "Apple3"];
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
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
                <ProductListAll
                  title="Sản Phẩm Nổi Bật"
                ></ProductListAll>
                <ProductList
                  title={title[1]}
                  CollectionBrand={CollectionBrand[1]}
                ></ProductList>
                <ProductList title="PC - Máy Bàn"></ProductList>
                <ProductList title="Gear Gaming"></ProductList>
                <ProductList title="Linh Kiện Máy Tính"></ProductList>
              </div>
            </div>
            <BannerSales />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Homepage;
