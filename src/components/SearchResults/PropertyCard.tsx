import Image from 'next/image';
import { fetchContentfulImage } from '@/utils';
import Link from 'next/link';

interface PropertyCardProps {
  property: any;
  hoveredProperty: string | null;
  onMouseEnter: (property: any) => void;
  onMouseLeave: () => void;
  themeColor: (propertyType: string) => string | undefined;
  isSelectedPin: boolean;
}

// Function to render the appropriate property type text
const renderPropertyTypeText = (type: string) => {
  switch (type) {
    case 'apartments':
      return <span>APARTMENT</span>;
    case 'office':
      return <span>OFFICE</span>;
    case 'retail':
      return <span>RETAIL</span>;
    default:
      return null; // Return null for unknown types
  }
};

export default function PropertyCard({
  property,
  hoveredProperty,
  onMouseEnter,
  onMouseLeave,
  themeColor,
  isSelectedPin,
}: PropertyCardProps) {
  // Determine the property type
  const propertyType = property.commercialType?.toLowerCase();
  // Get the theme color for the property type
  const propertyColor = themeColor(propertyType);

  // Split the address into street and city/state/zip
  const addressParts = property.shortDescription.split(',');
  const streetAddress = addressParts[0]?.trim() || '';
  const cityStateZip = addressParts.slice(1).join(',').trim();

  return (
    <Link
      id={property.slug}
      href={property.redirectTo}
      target={property.redirectTo.includes(process.env.NEXT_PUBLIC_APARTMENTS_URL) ? '_blank' : undefined}
      aria-label={property.title}
    >
      <div
        onMouseEnter={() => onMouseEnter(property)}
        onMouseLeave={onMouseLeave}
        id={property.slug}
        className="card"
        style={{
          outline: hoveredProperty === property.slug || isSelectedPin ? `5px solid ${propertyColor}` : undefined,
        }}
      >
        {/* Property Type Text with Background Color */}
        <div className="search-property-type-icon" style={{ backgroundColor: propertyColor }}>
          {renderPropertyTypeText(propertyType || 'default')}
        </div>

        {/* Property Image */}
        <div className="image-container">
          {property.imageSrc && <Image src={fetchContentfulImage(property.imageSrc)} alt={property.title} fill />}
        </div>

        {/* Property Title and Address */}
        <div className="title-container">
          <p className="title">{property.title}</p>
          <p className="sub-title">
            {streetAddress && <span className="street">{streetAddress}</span>}
            {cityStateZip && (
              <>
                <br />
                <span className="city-state-zip">{cityStateZip}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
