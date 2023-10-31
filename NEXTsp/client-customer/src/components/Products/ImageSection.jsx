import React, { useState } from "react";
import "../../assets/css/Products.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ImageSection = (props) => {
  const slides = [
    {
      id: 1,
      url: "https://product.hstatic.net/200000722513/product/76kg_1433e407838944df88bd906b57729c0a_grande.png",
    },

    {
      id: 2,
      url: "https://product.hstatic.net/200000722513/product/gearvn-laptop-gaming-acer-predator-helios-300-ph315-55-76kg-1_047ce8c04eb146ea90e261914db6ee8d_grande.jpg",
    },
    {
      id: 3,
      url: "https://product.hstatic.net/200000722513/product/gearvn-laptop-gaming-acer-predator-helios-300-ph315-55-76kg-2_b691157e215b46f48502b9f2e7f023f3_grande.jpg",
    },
    {
      id: 4,
      url: "https://product.hstatic.net/200000722513/product/gearvn-laptop-gaming-acer-predator-helios-300-ph315-55-76kg-3_b9f77d55d61a4bf8b92af76f6f5f5a5f_grande.jpg",
    },
    {
      id: 5,
      url: "https://product.hstatic.net/200000722513/product/gearvn-laptop-gaming-acer-predator-helios-300-ph315-55-76kg-4_58b07a590b6e433882110cf8e8f8955b_grande.jpg",
    },
    {
      id: 6,
      url: "https://product.hstatic.net/200000722513/product/gearvn-laptop-gaming-acer-predator-helios-300-ph315-55-76kg-7_a8c5c802f776458892a45565a8eabd29_grande.jpg",
    },
  ];
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const prevClick = () => {
    const isFirstSlide = CurrentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : CurrentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextClick = () => {
    const isLastSlide = CurrentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : CurrentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div className="max-w-[600px] h-[600px] w-full m-auto py-16 px-4 relative">
      <div
        style={{ backgroundImage: `url(${slides[CurrentIndex].url})` }}
        className=" w-full h-full rouded-2xl bg-center bg-cover duration-500"
      >
        <div className="absolute top-2/4 -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronLeft onClick={prevClick}></BsChevronLeft>
        </div>
        <div className="absolute top-2/4  -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronRight onClick={nextClick}></BsChevronRight>
        </div>
      </div>
      <div className="flex flex-row ">
        {slides.map((slide, index) => (
          <div key={index} className="imgList ">
            <img src={slide.url} alt="" className="subImgBottom w-20 h-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSection;
