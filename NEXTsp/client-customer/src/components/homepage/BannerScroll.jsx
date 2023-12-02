import React from "react";
import "../../assets/css/homepage.css";
import BannerImage from "../../assets/img/banner_scrl_img.png";
import ButtonPrevHero from "../../assets/icons/chevron-left.svg";
import ButtonNextHero from "../../assets/icons/chevron-right.svg";

function BannerScroll() {
  const [slideText, setSlideText] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const handleLeftClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 0));
  };

  const handleRightClick = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide < slideText.length - 1 ? prevSlide + 1 : prevSlide
    );
  };

  React.useEffect(() => {
    const slideText = [
      "Mọi Thứ Bạn Muốn Đều Có tại shop.",
      "NextSP Chuyên Cung Cấp Hàng Chính Hãng",
      "NextSP Giao Hàng Tận Nơi",
    ];
    setSlideText(slideText);
  }, []);

  return (
    <div className="BannerScroll-background">
      <div className="BannerScroll-Arrow__left" onClick={handleLeftClick}>
        <img src={ButtonPrevHero} alt="Prev" />
      </div>
      <div className="BannerScroll-left">
        <div
          className="BannerScroll-content"
          style={{
            opacity: currentSlide === 0 ? 1 : 0,
            transition: "opacity 1s",
          }}
        >
          {slideText[0]}
        </div>
        <div
          className="BannerScroll-content"
          style={{
            opacity: currentSlide === 1 ? 1 : 0,
            transition: "opacity 1s",
          }}
        >
          {slideText[1]}
        </div>
        <div
          className="BannerScroll-content"
          style={{
            opacity: currentSlide === 2 ? 1 : 0,
            transition: "opacity 1s",
          }}
        >
          {slideText[2]}
        </div>
      </div>
      <div className="BannerScroll-right" onClick={handleRightClick}>
        <img src={BannerImage} alt="Ảnh Banner"></img>
      </div>
      <div className="BannerScroll-Arrow__right" onClick={handleRightClick}>
        <img src={ButtonNextHero} alt="Next" />
      </div>
    </div>
  );
}

export default BannerScroll;
