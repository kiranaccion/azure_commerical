'use client';

import Slider from 'react-slick';
import Image from 'next/image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './styles.scss';
import { RightArrowIcon, CarousalLeft, CarousalRight } from '../../SVGs';
import { officeCaoursalData } from '../../../mock';

const InfoWindowPopup = () => {
  const CarousalNextButton = ({ className, onClick }: any) => (
    <div onClick={onClick} tabIndex={0}>
      <CarousalRight className={`${className}`} />
    </div>
  );

  const CarousalLeftButton = ({ className, onClick }: any) => (
    <div onClick={onClick} className={`${className}`} tabIndex={0}>
      <CarousalLeft className={`${className}`} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: true,
    nextArrow: <CarousalNextButton />,
    prevArrow: <CarousalLeftButton />,
  };

  return (
    <div className="info-window-popup">
      <div className="image-container">
        <div className="carousal-slider">
          <Slider {...settings}>
            {officeCaoursalData.map((carousalItem, index: number) => (
              <div className="office-image-container" key={index}>
                <Image
                  src={carousalItem.imageSrc}
                  alt={carousalItem.description}
                  layout="fill"
                  className="office-item-image"
                  priority
                  sizes="100vw"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="text-container">
        <p className="title">Office Space</p>
        <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a ante augue...</p>
        <div className="read-more-button">
          <p className="read-more-text">READ MORE</p>
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
};

export default InfoWindowPopup;
