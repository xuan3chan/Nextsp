import React from "react";
import "../assets/css/main.css";
import "../assets/css/collection.css";
import { useParams } from "react-router-dom";
import { Breadcrumb, Header } from "../components";
import RiseLoader from "react-spinners/RiseLoader";
import { useState, useEffect, override } from "react";
import Paginnation from "../components/collection/Paginnation";
import ProductList from "../components/collection/ProductList";
import ProductListAll from "../components/collection/ProductListAll";

function Collection(props) {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    // Simulate a data loading delay
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
      <div className="color-bg bg-slate-200 w-full">
        <div className="w-5/6 mr-auto ml-auto flex flex-col">
          <Header></Header>
          <Breadcrumb></Breadcrumb>
          <div className="container_content ">
            {params.nameCategory !== undefined ? (
              <ProductList CollectionBrand={params.nameCategory}></ProductList>
            ) : (
              <ProductListAll amountProduct="999"></ProductListAll>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
