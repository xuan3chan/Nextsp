import React from "react";
import "../assets/css/main.css";
import "../assets/css/collection.css";
import { useParams } from "react-router-dom";
import { Breadcrumb, Header } from "../components";
import RiseLoader from "react-spinners/RiseLoader";
import { useState, useEffect, override } from "react";
import ProductList from "../components/collection/ProductList";
import ProductListAll from "../components/collection/ProductListAll";
import Footer from "../components/Footer";
function Collection(props) {
  const [isLoading, setIsLoading] = useState(true);
  const { category, nameCategory } = useParams();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1400);
  }, []);
  return (
    <div className="flex text-center justify-center items-center contents-center w-full h-100vh pb-14">
      {isLoading ? (
        <div className="loading w-full h-full flex justify-center content-center items-center">
          <RiseLoader color="#212529" />
        </div>
      ) : null}
      <div className="CollectionSection color-bg bg-slate-200 w-4/5">
        <div className="mr-auto ml-auto flex flex-col">
          <Header></Header>
          <Breadcrumb titleCollection = "Tất Cả Sản Phẩm"></Breadcrumb>
          <div className="container_content ">
            {nameCategory || category ? (
              <ProductList
                CollectionBrand={nameCategory || category}
              ></ProductList>
            ) : (
              <ProductListAll amountProduct="999"></ProductListAll>
            )}
          </div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Collection;
