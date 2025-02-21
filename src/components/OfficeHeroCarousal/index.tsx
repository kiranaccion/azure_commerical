'use client';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.scss';
import Image from 'next/image';
import { CarousalLeft, CarousalRight } from '../SVGs';

import { PropertyDetails } from '@/types';
import { fetchContentfulImage } from '@/utils';

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

const OfficeHeroCarousal = ({ property }: { property: PropertyDetails }) => {
  const hasMultipleImages = property.carouselImages?.length > 1;
  const settings = {
    dots: true,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    // autoplay: hasMultipleImages,
    nextArrow: hasMultipleImages ? <CarousalNextButton /> : undefined,
    prevArrow: hasMultipleImages ? <CarousalLeftButton /> : undefined,
  };

  return (
    <div>
      <section className="office-gallery-carousal-section">
        <section className={`${hasMultipleImages ? 'office-image-carousal' : 'office-single-carousal'}`}>
          <div className="carousal-slider">
            <Slider {...settings}>
              {property.carouselImages?.length > 0 ? (
                property.carouselImages?.map((carousalItem: any) => (
                  <div className="office-image-container" key={carousalItem.name}>
                    <Image
                      src={fetchContentfulImage(carousalItem)}
                      alt={carousalItem.name}
                      fill
                      className="office-item-image"
                      priority
                      sizes="100vw"
                    />
                  </div>
                ))
              ) : (
                <div className="office-image-container">
                  <Image
                    src="/Prometheus_Logo.webp"
                    alt="Prometheus Logo Image"
                    fill
                    className="office-item-image"
                    priority
                    sizes="100vw"
                  />
                </div>
              )}
            </Slider>
          </div>
        </section>
      </section>
      {/* <OfficeHeroDetails property={property} /> */}
    </div>
  );
};

export default OfficeHeroCarousal;
