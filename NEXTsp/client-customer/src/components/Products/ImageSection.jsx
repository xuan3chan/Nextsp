import React, { useState, useEffect } from "react";
import "../../assets/css/Products.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";

const ImageSection = (props) => {
  const [product, setProduct] = useState(null);
  const param = useParams();
  const ApiProducts = `https://nextsp-server.id.vn/api/products/getdetails/${param.id}/`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(ApiProducts);
        if (result.data && typeof result.data.product === "object") {
          setProduct(result.data.product);
        } else {
        }
      } catch (error) {}
    };
    fetchData();
  }, [ApiProducts]);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const prevClick = () => {
    const isFirstSlide = CurrentIndex === 0;
    const newIndex = isFirstSlide
      ? product.images.length - 1
      : CurrentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextClick = () => {
    const isLastSlide = CurrentIndex === product.images.length - 1;
    const newIndex = isLastSlide ? 0 : CurrentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (product === null) {
    return <div>Loading...</div>;
  }
  return (
    <div className="ImageSection flex flex-col gap-3 w-[450px] h-[600px] py-16 ">
      <div
        style={{ backgroundImage: `url(${product.images[CurrentIndex]})` }}
        className=" mainImage w-full h-full rounded-xl bg-center bg-cover duration-500 object-fill relative"
      >
        <div className="absolute top-1/3 translate-x-0 translate-y-[50%] -left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronLeft onClick={prevClick}></BsChevronLeft>
        </div>
        <div className="absolute top-1/3  -translate-x-0 translate-y-[50%] -right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronRight onClick={nextClick}></BsChevronRight>
        </div>
      </div>
      <div className="flex flex-row gap-2 ">
        {product.images.map((image, index) => (
          <div className="imgList" key={index}>
            <img
              onClick={() => goToSlide(index)}
              src={image}
              alt=""
              className="subImgBottom w-20 h-20 object-position: center;"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
