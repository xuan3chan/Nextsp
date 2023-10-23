import React from "react";
import { Breadcrumb, Header } from "../../components";
import "../../assets/css/collection.css";
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {
<<<<<<< HEAD
<<<<<<< HEAD
  
=======
  const titleCollection = "PC - Máy Tính Bàn";
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
  const titleCollection = "PC - Máy Tính Bàn";
=======
  
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
<<<<<<< HEAD
<<<<<<< HEAD
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
=======
      <Breadcrumb titleCollection ={titleCollection} ></Breadcrumb>
      <ProductList titleCollection ={titleCollection}></ProductList>
>>>>>>> 4d72f579d0da82d2ea58f16fcf48cf514b99e118
=======
      <Breadcrumb titleCollection ={titleCollection} ></Breadcrumb>
      <ProductList titleCollection ={titleCollection}></ProductList>
=======
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
>>>>>>> cf830381dfc55af02a0186b8d0852ca2e5b7a295
      <Paginnation></Paginnation>
      </div>
    </div>
  );
}

export default Collection;
