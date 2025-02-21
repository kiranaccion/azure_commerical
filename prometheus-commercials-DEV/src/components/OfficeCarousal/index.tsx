'use client';
import { useEffect, useRef, useState } from 'react';
import { OfficeProperty } from '../../utils/types';
import CarousalLeft from '../SVGs/CarousalLeft';
import CarousalRight from '../SVGs/CarousalRight';
import OfficeCarousalItem from './OfficeCarousalItem';
import './index.scss';

export interface IOfficeCarousal {
  carousalData: OfficeProperty[];
  selectedPin: number | null;
  setSelectedPin: (key: number | null) => void;
  hoveredProperty: number | null;
  setHoveredProperty: (key: number | null) => void;
}

const OfficeCarousal = ({ carousalData, selectedPin, setSelectedPin, hoveredProperty, setHoveredProperty }: IOfficeCarousal) => {
  useEffect(() => {
    if (selectedPin !== null) {
      const selectedElement = document.getElementById('selected-item');
      console.log('Selected', selectedElement);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }
  }, [selectedPin]);

  // const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  // const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  // useEffect(() => {
  //   const carousalElement = document.getElementById(
  //     "officeCarousalItemsContainer"
  //   );

  //   const updateArrowsVisibility = () => {
  //     if (carousalElement) {
  //       setShowLeftArrow(carousalElement.scrollLeft > 0);
  //       setShowRightArrow(
  //         carousalElement.scrollLeft <
  //           carousalElement.scrollWidth - carousalElement.clientWidth
  //       );
  //     }
  //   };

  //   carousalElement?.addEventListener("scroll", updateArrowsVisibility);
  //   updateArrowsVisibility();

  //   return () => {
  //     carousalElement?.removeEventListener("scroll", updateArrowsVisibility);
  //   };
  // }, []);

  const handleCarousalScrollCards = (direction: string = 'left' || 'right') => {
    const carousalElement = document.getElementById('officeCarousalItemsContainer');
    if (carousalElement) {
      const scrollAmount = direction === 'left' ? -900 : 900;
      carousalElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelect = (siteId: number | null) => {
    setSelectedPin(siteId);
  };

  return (
    <section className="carousal-component-section">
      <div className="carousal-section">
        {carousalData && carousalData.length > 1 && (
          <div className="carousal-arrows-container">
            <button onClick={() => handleCarousalScrollCards('left')}>
              <CarousalLeft />
            </button>

            <button onClick={() => handleCarousalScrollCards('right')}>
              <CarousalRight />
            </button>
          </div>
        )}
        <div className="carousal-items-container" id="officeCarousalItemsContainer">
          {carousalData.map((carousalItem, index: number) => (
            <OfficeCarousalItem
              siteId={carousalItem.site_id}
              imageSrc={carousalItem.imageSrc}
              title={carousalItem.title}
              description={carousalItem.description}
              redirectTo={carousalItem.redirectTo}
              key={index}
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
