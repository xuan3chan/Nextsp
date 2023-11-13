import React, { useState, useEffect } from "react";
import "../../assets/css/Products.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";

const ImageSection = (props) => {
  const [product, setProduct] = useState(null);
  const param = useParams();

  console.log(param);

  const ApiProducts = `http://localhost:3101/api/products/getdetails/${param.id}/`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(ApiProducts);
        if (result.data && typeof result.data.product === "object") {
          setProduct(result.data.product);
        } else {
          console.error("Invalid API response data structure:", result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ApiProducts]);

  //Handle Function for Image Section

  //Handle Function for Image Section
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
    // Handle the case when product is still loading or unavailable.
    return <div>Loading...</div>;
  }
  //Handle Function for Image Section

  return (
    <div className=" flex flex-col gap-3 w-[450px] h-[600px] py-16 px-4 relative pl-9">
      <div
        style={{ backgroundImage: `url(${product.images[CurrentIndex]})` }}
        className=" mainImage max-w-full h-full rouded-2xl bg-center bg-cover duration-500		 object-center	"
      >
        <div className="absolute top-2/4 translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronLeft onClick={prevClick}></BsChevronLeft>
        </div>
        <div className="absolute top-2/4  -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
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
