'use client';

import { useEffect, useState } from 'react';
import './styles.scss';
import BuildingCard from '../BuildingCard';
import CarousalLeft from '../SVGs/CarousalLeft';
import CarousalRight from '../SVGs/CarousalRight';
import { PropertyDetails } from '@/types';

interface OfficeListProps {
  properties: PropertyDetails[];
  selectedProperty: PropertyDetails;
  setSelectedProperty: (property: PropertyDetails) => void;
}

export default function OfficeList({ properties, selectedProperty, setSelectedProperty }: OfficeListProps) {
  const handleCardClick = (property: PropertyDetails) => {
    setSelectedProperty(property);
  };

  const handleCarousalScrollCards = (direction: string = 'left' || 'right') => {
    const carousalElement = document.getElementById('officeItemsContainer');
    console.log(carousalElement);
    if (carousalElement) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carousalElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid">
      <div className="submenu-arrows-container">
        <button onClick={() => handleCarousalScrollCards('left')}>
          <CarousalLeft />
        </button>

        <button onClick={() => handleCarousalScrollCards('right')}>
          <CarousalRight />
        </button>
      </div>
      <div className="office-items-container" id="officeItemsContainer">
        {properties.map((property) => (
          <BuildingCard
            key={property.id}
            image={property.image}
            title={property.title}
            description={property.description}
            isSelected={selectedProperty.id === property.id}
            onClick={() => handleCardClick(property)}
          />
        ))}
      </div>
    </div>
  );
}
