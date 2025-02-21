'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.scss';
import { RightArrowIcon, CarousalLeft, CarousalRight } from '../../SVGs';
import Link from 'next/link';
import { READ_MORE_TEXT } from '@/constants';
import { fetchContentfulImage } from '@/utils';
import { PropertyPin } from '@/types';
import ReactMarkdown from 'react-markdown';
import { usePathname } from 'next/navigation';

const CarousalNextButton = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <div onClick={onClick} tabIndex={0}>
    <CarousalRight className={`${className}`} />
  </div>
);

const CarousalLeftButton = ({ className, onClick }: { className?: string; onClick?: () => void }) => (
  <div onClick={onClick} className={`${className}`} tabIndex={0}>
    <CarousalLeft className={`${className}`} />
  </div>
);

const InfoWindowPopup = ({ pin }: { pin: PropertyPin }) => {
  const pathname = usePathname();
  const isCurrentProperty = pathname.split('/').at(-1) === pin.slug;

  const hasMultipleImages = pin.imageGallery?.length > 1;
  const settings = {
    dots: false,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    autoplay: hasMultipleImages,
    nextArrow: hasMultipleImages ? <CarousalNextButton /> : undefined,
    prevArrow: hasMultipleImages ? <CarousalLeftButton /> : undefined,
  };

  const renderImages = () => {
    if (pin.imageGallery && pin.imageGallery.length > 0) {
      return (
        <Slider {...settings}>
          {pin.imageGallery.map((carousalItem) => (
            <div className="office-image-container" key={carousalItem.id}>
              <Image
                src={fetchContentfulImage(carousalItem.src)}
                alt={carousalItem.name}
                fill
                className="office-item-image"
                priority
                sizes="100vw"
              />
            </div>
          ))}
        </Slider>
      );
    } else if (pin.imageSrc) {
      return (
        <div className="office-image-container">
          <Image
            src={fetchContentfulImage(pin.imageSrc)}
            alt={pin.title}
            fill
            className="office-item-image"
            priority
            sizes="100vw"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="info-window-popup">
      <div className="image-container">
        <div className="carousal-slider">{renderImages()}</div>
      </div>

      <div className="text-container">
        <p className="title">{pin.title}</p>
        <div className="description">
          <ReactMarkdown>{pin.description?.slice(0, 100) + '...'}</ReactMarkdown>
        </div>
        {!isCurrentProperty && (
          <Link
            href={pin.redirectTo}
            target={pin.redirectTo.includes(process.env.NEXT_PUBLIC_APARTMENTS_URL as string) ? '_blank' : undefined}
            aria-label={READ_MORE_TEXT}
          >
            <div className="read-more-button">
              <p className="read-more-text">{READ_MORE_TEXT}</p>
              <RightArrowIcon />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoWindowPopup;
