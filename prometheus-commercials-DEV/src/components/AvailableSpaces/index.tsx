"use client";
import "./styles.scss";
import { useState } from "react";
import { AvailableSpace } from "@/types";
import Slider from "react-slick";
import { CarousalLeft, CarousalRight } from "../SVGs";
import Space from "./Space";
import SlickLeft from "../SVGs/SlickLeft";
import SlickRight from "../SVGs/SlickRight";

export default function AvailableSpaces({
  availableSpaces,
}: {
  availableSpaces: AvailableSpace[];
}) {
  const [selectedSpace, setSelectedSpace] = useState<AvailableSpace>(
    availableSpaces[0]
  );

  const CarousalNextButton = ({ className, onClick }: any) => {
    return (
      <div onClick={onClick} className={`${className}`} tabIndex={0}>
        <SlickRight customClass="custom-slick-arrow" />
      </div>
    );
  };

  const CarousalLeftButton = ({ className, onClick }: any) => {
    return (
      <div onClick={onClick} className={`${className}`} tabIndex={0}>
        <SlickLeft customClass="custom-slick-arrow" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: false,
    nextArrow: <CarousalNextButton />,
    prevArrow: <CarousalLeftButton />,
  };

  return (
    <div className="spaces-container" id="AvailableSpaces">
      <h2 className="available-spaces-text">Available Spaces</h2>

      <div className="spaces-slider">
        <Slider {...settings}>
          {availableSpaces.map((space) => (
            <Space space={space} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
