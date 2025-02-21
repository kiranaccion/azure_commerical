import { PropertyDetails } from "@/types";
import "./index.scss";

const OfficeHeroDetails = ({ property }: { property: PropertyDetails }) => {
  return (
    <section className="office-hero-details-section">
      <h3 className="office-hero-details-heading">{property.title}</h3>

      <p className="office-hero-details-description">{property.description}</p>

      <p className="office-hero-details-subtitle">{property.subTitle}</p>
    </section>
  );
};

export default OfficeHeroDetails;
