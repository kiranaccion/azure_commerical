import SubMenu from '../SubMenu';
import { PropertyDetails, PropertyPin } from '@/types';
import DetailPageHeroSection from '../DetailPageHeroSection';
import GMapWrapper from '../GMapWrapper';
import { breadcrumbsItems, PROPERTY_MAP_DEFAULT_ZOOM } from '@/constants';
import StickyBreadCrumbs from '../StickyBreadCrumbs';
import DescriptionSection from '../Description';

interface OfficeDetailsWrapperProps {
  propertyList: PropertyDetails[];
  pins: PropertyPin[];
}

export default function OfficeDetailsWrapper({ propertyList, pins }: OfficeDetailsWrapperProps) {
  const selectedProperty = propertyList[0];

  if (!selectedProperty) return null;
  return (
    <>
      {selectedProperty && <SubMenu selectedProperty={selectedProperty} />}
      <DetailPageHeroSection property={selectedProperty} />
      <StickyBreadCrumbs property={selectedProperty} items={breadcrumbsItems} />
      <DescriptionSection header={selectedProperty.name} body={selectedProperty.description} />
      {pins.length > 0 && (
        <>
          <GMapWrapper
            apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}
            pins={pins}
            mapCenterCoordinates={selectedProperty.mapCenter ?? selectedProperty.latLong}
            mapZoom={selectedProperty.mapZoom ?? PROPERTY_MAP_DEFAULT_ZOOM}
            starredPin={selectedProperty.slug}
            clusteringEnabled={true}
          />
        </>
      )}
    </>
  );
}
