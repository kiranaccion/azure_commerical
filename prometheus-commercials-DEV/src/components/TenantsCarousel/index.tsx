'use client';
import './styles.scss';
import CarouselLeftSlideIcon from '../SVGs/CarouselLeftSlideIcon';
import CarouselRightSlideIcon from '../SVGs/CarouselRightSlideIcon';
import GotoIcon from '../SVGs/GotoIcon';
import { Tenant } from '@/types';

interface TenantsCarouselProps {
  tenants: Tenant[];
}

const TenantsCarousel = ({ tenants }: TenantsCarouselProps) => {
  const handleCarousalScrollCards = (direction: string = 'left' || 'right') => {
    const carousalElement = document.getElementById('tenantsContainer');
    console.log(carousalElement);
    if (carousalElement) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carousalElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-section">
      <div className="carousel-nav-button-left" onClick={() => handleCarousalScrollCards('left')}>
        <CarouselLeftSlideIcon />
      </div>
      <div className="carousel-viewport">
        <div className="carousel-items" id="tenantsContainer">
          {tenants.map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="icon">
                <img src={item.icon} alt={item.name} />
              </div>
              <h3 className="card-title">{item.name}</h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-link">
                Learn More <GotoIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-nav-button-right" onClick={() => handleCarousalScrollCards('right')}>
        <CarouselRightSlideIcon />
      </div>
    </div>
  );
};

export default TenantsCarousel;
