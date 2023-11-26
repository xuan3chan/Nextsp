import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Breadcrumb } from "../components";
import ImageSection from "../components/Products/ImageSection";
import MainContentSection from "../components/Products/MainContentSection";
import DescriptionSection from "../components/Products/DescriptionSection";
import ReviewForm from "../components/Products/ReviewForm";
import GetReview from "../components/Products/GetReview";

function Products(props) {
  return (
    <div className="bg-product w-full ">
      <Header></Header>
      <div className="">
        <div className="wrapper relative flex flex-col w-3/4 mx-auto h-full  ">
          <Breadcrumb titleCollection="Sản Phẩm"></Breadcrumb>
          <div className="flex bg-white w-full rounded-md h-full mb-8 pl-28 pb-10">
            <div>
              <ImageSection></ImageSection>
              <ReviewForm />
            </div>
            <div className="flex flex-col gap-8">
              <MainContentSection></MainContentSection>
              <DescriptionSection></DescriptionSection>
            </div>
          </div>
          <GetReview className="w-96 h-full" />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Products;
