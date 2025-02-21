'use client';
import { useEffect, useState } from 'react';
import CarousalLeft from '../SVGs/CarousalLeft';
import CarousalRight from '../SVGs/CarousalRight';
import OfficeCarousalItem from './OfficeCarousalItem';
import './index.scss';
import { PropertyPin } from '@/types';
import { scrollToElement } from '@/utils';

export interface IOfficeCarousal {
  carousalData: PropertyPin[];
  selectedPin: string | null;
  setSelectedPin: (key: string | null) => void;
  hoveredProperty: string | null;
  setHoveredProperty: (key: string | null) => void;
}

const OfficeCarousal = ({ carousalData, selectedPin, setSelectedPin, hoveredProperty, setHoveredProperty }: IOfficeCarousal) => {
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  useEffect(() => {
    if (selectedPin !== null) {
      const selectedElement = document.getElementById(selectedPin);
      if (selectedElement) {
        scrollToElement(selectedElement);
      }
    }
  }, [selectedPin]);

  useEffect(() => {
    const carousalElement = document.getElementById('officeCarousalItemsContainer');

    const updateArrowsVisibility = () => {
      if (carousalElement) {
        setShowLeftArrow(carousalElement.scrollLeft > 0);
        setShowRightArrow(carousalElement.scrollLeft < carousalElement.scrollWidth - carousalElement.clientWidth);
      }
    };

    carousalElement?.addEventListener('scroll', updateArrowsVisibility);
    updateArrowsVisibility();

    return () => {
      carousalElement?.removeEventListener('scroll', updateArrowsVisibility);
    };
  }, [carousalData]);

  const handleCarousalScrollCards = (direction: string) => {
    const carousalElement = document.getElementById('officeCarousalItemsContainer');
    if (carousalElement) {
      const scrollAmount = direction === 'left' ? -900 : 900;
      carousalElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (siteId: string | null) => {
    setSelectedPin(siteId);
  };

  return (
    <section className="carousal-component-section">
      <div className="carousal-section">
        {carousalData && carousalData.length > 3 && (
          <div className="carousal-arrows-container">
            <button
              onClick={() => handleCarousalScrollCards('left')}
              aria-label="Left"
              disabled={!showLeftArrow}
              className={!showLeftArrow ? 'disabled' : ''}
            >
              <CarousalLeft />
            </button>
            <button
              onClick={() => handleCarousalScrollCards('right')}
              aria-label="Right"
              disabled={!showRightArrow}
              className={!showRightArrow ? 'disabled' : ''}
            >
              <CarousalRight />
            </button>
          </div>
        )}
        <div className="carousal-items-container" id="officeCarousalItemsContainer">
          {carousalData.map((carousalItem, index: number) => (
            <OfficeCarousalItem
              siteId={carousalItem.slug}
              imageSrc={carousalItem.imageSrc ?? null}
              title={carousalItem.title}
              description={carousalItem.description}
              redirectTo={carousalItem.redirectTo}
              key={carousalItem.slug}
              propertyType={carousalItem.commercialType?.toLowerCase()}
              handleSelect={handleSelect}
              selectedItem={selectedPin}
              hoveredProperty={hoveredProperty}
              setHoveredProperty={setHoveredProperty}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeCarousal;
