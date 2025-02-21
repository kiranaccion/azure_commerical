import { PropertyDetails } from '@/types';
import './index.scss';

const OfficeHeroDetails = ({ property }: { property: PropertyDetails }) => {
  const { name, description } = property;

  return (
    <>
      {name && description && (
        <section className="office-hero-details-section">
          <h3 className="office-hero-details-heading">{name}</h3>
          <p className="office-hero-details-description">{description}</p>
          {/* <p className="office-hero-details-subtitle">{shortDescription}</p> */}
        </section>
      )}
    </>
  );
};

export default OfficeHeroDetails;
