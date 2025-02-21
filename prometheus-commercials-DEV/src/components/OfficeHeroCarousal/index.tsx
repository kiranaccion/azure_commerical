'use client';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import Image from 'next/image';
import { CarousalLeft, CarousalRight } from '../SVGs';
import OfficeHeroDetails from './OfficeHeroDetails';
import { PropertyDetails } from '@/types';

const OfficeHeroCarousal = ({property}: {property: PropertyDetails}) => {
  const CarousalNextButton = ({ className, onClick }: any) => {
    return (
      <div onClick={onClick} tabIndex={0}>
        <CarousalRight className={`${className}`} />
      </div>
    );
  };

  const CarousalLeftButton = ({ className, onClick }: any) => {
    return (
      <div onClick={onClick} className={`${className}`} tabIndex={0}>
        <CarousalLeft className={`${className}`} />
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
    autoplay: true,
    nextArrow: <CarousalNextButton />,
    prevArrow: <CarousalLeftButton />,
  };

  return (
    <div>
      <section className="office-gallery-carousal-section" id="AboutUs">
        <section className="office-image-carousal">
          <div className="carousal-slider">
            <Slider {...settings}>
              {property.images.map((carousalItem) => (
                <div className="office-image-container">
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
        </section>
      </section>
      <OfficeHeroDetails property={property}/>
    </div>
  );
};

export default OfficeHeroCarousal;
