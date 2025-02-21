import { PropertyDetails } from '@/types';
import OfficeHeroCarousal from '../OfficeHeroCarousal';
import './styles.scss';
import PropertyDetail from './PropertyDetail';

const DetailPageHeroSection = ({ property }: { property: PropertyDetails }) => {
  return (
    <div className="detail-page-hero-section">
      <div className="hero-carousal">
        <OfficeHeroCarousal property={property} />
      </div>
      <div className="property-details-container">
        <PropertyDetail details={{ ...property, contactInformation: property.contactInformation?.map((i: any) => i.fields) }} />
      </div>
    </div>
  );
};

export default DetailPageHeroSection;
