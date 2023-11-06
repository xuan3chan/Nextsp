import React from "react";
import { Breadcrumb, Header } from "../components";
import "../assets/css/Cart.css";
import ProcessBar from "../components/Cart/ProcessBar";
import ProductAdded from "../components/Cart/ProductAdded";
import TotalSection from "../components/Cart/TotalSection";
function CartPage(props) {
  return (
    <div className="bg-cart">
      <Header></Header>
      <div className="w-4/5 mr-auto ml-auto pt-24">
        <div className="CartSection">
          <ProcessBar></ProcessBar>
          <ProductAdded></ProductAdded>
          <TotalSection></TotalSection>
          </div>
      </div>
    </div>
  );
}

export default CartPage;
