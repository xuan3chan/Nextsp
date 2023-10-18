import React from "react";
import { Breadcrumb, Header } from "../components";
import "../assets/css/homepage.css";
import ProductList from "../components/collection/ProductList";
function Collection(props) {
  return (
    <div className="bg-gray-100">
      <Header></Header>
      <div className="container_content w-5/6 mr-auto ml-auto">
      <Breadcrumb></Breadcrumb>
      <ProductList title = "May Tinh"></ProductList>
      </div>
    </div>
  );
}

export default Collection;
