import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Breadcrumb } from "../components";
import ImageSection from "../components/Products/ImageSection";
import MainContentSection from "../components/Products/MainContentSection";
import DescriptionSection from "../components/Products/DescriptionSection";
import FlaskSale from "../components/Products/FlaskSale";
import ReviewForm from "../components/Products/ReviewForm";
import GetReview from "../components/Products/GetReview";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Products(props) {
  const handleReviewSubmit = (reviewData) => {
    // Xử lý đánh giá, ví dụ: gửi đến máy chủ hoặc lưu vào trạng thái ứng dụng
    console.log("Đánh giá đã được gửi:", reviewData);
  };

  return (
    <div className="bg-product w-full ">
      <Header></Header>
      <div className="">
        <div className="container flex flex-col w-3/4 mx-auto h-full  ">
          <Breadcrumb titleCollection="Sản Phẩm"></Breadcrumb>
          <div className="flex bg-white w-full rounded-md h-full mb-8 pl-28 pb-10">
            <div>
              <ImageSection></ImageSection>
              <FlaskSale></FlaskSale>
            </div>
            <div className="flex flex-col gap-8">
              <MainContentSection></MainContentSection>
              <DescriptionSection></DescriptionSection>
              <ReviewForm onSubmit={handleReviewSubmit} />
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
