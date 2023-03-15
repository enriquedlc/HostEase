import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import first from "./assets/first.jpg";
import second from "./assets/second.jpg";
import third from "./assets/third.jpg";

const CustomCarrousel = ({ className }: { className?: string }) => {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      stopOnHover
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      className={className}
    >
      <div>
        <img src={first} alt="First Carrousel Image" />
      </div>
      <div>
        <img src={second} alt="Second Carrousel Image" />
      </div>
      <div>
        <img src={third} alt="Third Carrousel Image" />
      </div>
    </Carousel>
  );
};

export default CustomCarrousel;
