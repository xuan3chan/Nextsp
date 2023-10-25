import React from "react";
import { Breadcrumb, Header } from "../../components";
import "../../assets/css/collection.css";
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {

  const titleCollection = "PC - Máy Tính Bàn";
  
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
      <Breadcrumb titleCollection ={titleCollection} ></Breadcrumb>
      <ProductList titleCollection ={titleCollection}></ProductList>
      <Paginnation></Paginnation>
      </div>
    </div>
  );
}

export default Collection;
