import React, { useState } from 'react';

const ImageSection = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
      </div>
      <div className="slider-controls">
        <button onClick={prevSlide}>Previous</button>
        <button onClick={nextSlide}>Next</button>
      </div>
    </div>
  );
};

export default ImageSection;
