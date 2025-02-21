import { COMMERCIAL_OFFICE, COMMERCIAL_RETAIL } from '@/constants';
import { notFound } from 'next/navigation';

export const getCommercialType = (commercialTypeParam: string) => {
  if (commercialTypeParam === 'office') {
    return COMMERCIAL_OFFICE;
  } else if (commercialTypeParam === 'retail') {
    return COMMERCIAL_RETAIL;
  } else {
    notFound();
  }
};

export const propertyPinListParams = (commercialType: string) => ({
  content_type: 'commercialPropertyPage',
  'fields.commercialType[in]': commercialType,
  // select: 'fields.slug,fields.name,fields.latLong,fields.regionSlug,fields.heroImageGallery,fields.carouselImages',
});
