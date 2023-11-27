import React from "react";
import { Breadcrumb, Header } from "../components";
import "../assets/css/Cart.css";
import ProcessBar from "../components/Cart/ProcessBar";
import ProductAdded from "../components/Cart/ProductAdded";
import TotalSection from "../components/Cart/TotalSection";
function CartPage(props) {
  return (
    <div className="bg-cart CartOver">
      <Header></Header>
      <div className="pt-24 w-full pb-24">
        <div className="CartSection ml-auto mr-auto border-spacing-1 p-20">
          <ProcessBar></ProcessBar>
          <ProductAdded></ProductAdded>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
