'use client';

import './styles.scss';
import BuildingCard from '../BuildingCard';
import CarousalLeft from '../SVGs/CarousalLeft';
import CarousalRight from '../SVGs/CarousalRight';
import { PropertyDetails } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { scrollToElement } from '@/utils';

interface OfficeListProps {
  properties: PropertyDetails[];
  selectedProperty: PropertyDetails;
  setSelectedProperty: (property: PropertyDetails) => void;
  params: any;
}

export default function OfficeList({ properties, selectedProperty, setSelectedProperty, params }: OfficeListProps) {
  const router = useRouter();

  useEffect(() => {
    if (selectedProperty.slug && properties.length <= 5) {
      const selectedEl = document.getElementById(selectedProperty.slug);

      if (selectedEl) {
        scrollToElement(selectedEl);
      }
    }
  }, [selectedProperty, properties.length]);

  const handleCardClick = (property: PropertyDetails) => {
    setSelectedProperty(property);

    if (property.slug !== params.property)
      router.push(`/${params['commercial-type']}/${params['commercial-region']}/${property.slug}`, { scroll: false });
  };

  const handleCarousalScrollCards = (direction: string = 'left') => {
    const carousalElement = document.getElementById('officeItemsContainer');

    if (carousalElement) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carousalElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid">
      {properties && properties.length > 5 && (
        <button className="submenu-carousel-left" onClick={() => handleCarousalScrollCards('left')} aria-label="Left">
          <CarousalLeft />
        </button>
      )}
      {properties && properties.length > 5 && (
        <button className="submenu-carousel-right" onClick={() => handleCarousalScrollCards('right')} aria-label="Right">
          <CarousalRight />
        </button>
      )}
      <div className="office-items-container" id="officeItemsContainer">
        {properties.map((property) => {
          return (
            <BuildingCard
              key={property.slug}
              image={property.featuredImage[0]}
              id={property.slug}
              title={property.name}
              description={property.shortDescription}
              isSelected={selectedProperty.id === property.id}
              onClick={() => handleCardClick(property)}
            />
          );
        })}
      </div>
    </div>
  );
}
