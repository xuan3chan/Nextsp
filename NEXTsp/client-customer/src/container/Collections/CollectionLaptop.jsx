import React from "react";
import { Breadcrumb, Header } from "../../components";
import "../../assets/css/collection.css";
import ProductList from "../../components/collection/ProductList";
import Paginnation from "../../components/collection/Paginnation";

function Collection(props) {
<<<<<<< HEAD
  const titleCollection = "Laptop";
=======
  
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
  return (
    <div className="bg-gray-100 pb-10">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
<<<<<<< HEAD
      <Breadcrumb titleCollection ={titleCollection}></Breadcrumb>
      <ProductList titleCollection ={titleCollection}></ProductList>
=======
      <Breadcrumb></Breadcrumb>
      <ProductList></ProductList>
      
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
      <Paginnation></Paginnation>
      </div>
    </div>
  );
}

export default Collection;
