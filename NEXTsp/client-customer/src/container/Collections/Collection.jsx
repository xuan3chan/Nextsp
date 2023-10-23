import React from "react";
import { Breadcrumb, Header } from "../../components";
import "../../assets/css/collection.css";
<<<<<<< HEAD
<<<<<<< HEAD
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {
  
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
      <Paginnation></Paginnation>
      </div>
=======
=======
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
import "../../assets/css/main.css";
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";
import RiseLoader from "react-spinners/RiseLoader";
import { useState, useEffect, override } from "react";
function Collection(props) {
  const titleCollection = "Tất Cả Sản Phẩm";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <div className="flex text-center justify-center items-center contents-center w-full h-100vh">
      {isLoading ? (
        <div className="loading">
        <RiseLoader color="#212529" />
        </div>
      ) : (
        <div className="color-bg bg-slate-200 w-full">
          <div className="w-5/6 mr-auto ml-auto flex flex-col ">
            <Header></Header>
            <Breadcrumb titleCollection={titleCollection}></Breadcrumb>
            <div className="container_content mr-auto ml-auto">
              <ProductList titleCollection={titleCollection}></ProductList>
            </div>
            <Paginnation></Paginnation>
          </div>
        </div>
      )}
<<<<<<< HEAD
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
=======
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {
  
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
      <Paginnation></Paginnation>
      </div>
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
    </div>
  );
}

export default Collection;
