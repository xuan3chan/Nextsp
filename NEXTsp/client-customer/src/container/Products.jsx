import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Breadcrumb } from "../components";
import ImageSection from "../components/Products/ImageSection";
import MainContentSection from "../components/Products/MainContentSection";
import DescriptionSection from "../components/Products/DescriptionSection";
import ReviewForm from "../components/Products/ReviewForm";
import GetReview from "../components/Products/GetReview";
import CurrentlyItems from "../components/Products/CurrentlyItems";
import "../assets/css/Products.css";
function Products(props) {
  const handleReviewSubmit = (reviewData) => {
    // Xử lý đánh giá, ví dụ: gửi đến máy chủ hoặc lưu vào trạng thái ứng dụng
    alert("Đánh giá đã được gửi: " + JSON.stringify(reviewData));
    console.log("Đánh giá đã được gửi:");
  };
  return (
    <div className="OverProduct bg-product flex flex-col items-center">
      <Header className="h-16"></Header>
      <div className="flex flex-col">
        <div className="containerDetail relative flex flex-col items-center mx-auto overflow-hidden">
          <Breadcrumb titleCollection="Sản Phẩm"></Breadcrumb>
          <div className="containerDetail_content flex bg-white w-full rounded-md h-full mb-8 pb-10">
            <div className="SectionLeft w-1/2 flex flex-col items-center">
              <ImageSection></ImageSection>
            </div>
            <div className="SectionRight w-1/2 flex items-start flex-col gap-8">
              <MainContentSection></MainContentSection>
              <DescriptionSection></DescriptionSection>
            </div>
          </div>
          <div className="bg-white w-4/5 mt-10 rounded-md">
            <ReviewForm onSubmit={handleReviewSubmit} />
            <GetReview className="h-full" />
          </div>
          <div className="bg-white w-4/5 min-h-fit mt-10 rounded-md">
            <CurrentlyItems />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Products;
