import React, { useState, useEffect } from "react";
import slide1 from "../../assets/img/Slides/slide1.png";
import slide2 from "../../assets/img/Slides/slide2.png";
import slide3 from "../../assets/img/Slides/slide3.png";
import "../../assets/css/main.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const SlidesShowMobile = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [slide1, slide2, slide3];

  const handleNextSlide = () => {
    slideIndex > slides.length - 2
      ? setSlideIndex(0)
      : setSlideIndex(slideIndex + 1);
  };
  const handleBackSlide = () => {
    slideIndex < 1
      ? setSlideIndex(slides.length - 1)
      : setSlideIndex(slideIndex - 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div className="slideshow-container relative ">
      <div className="slides flex items-center">
        <button className="backSlide">
          <MdArrowBackIosNew className="w-8 h-8" />
        </button>
        <div className="slide-item">
          <img className="slideImg" src={slides[`${slideIndex}`]} alt="" />
        </div>
        <button onClick={handleNextSlide} className="nextSlide">
          <MdArrowForwardIos className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default SlidesShowMobile;
