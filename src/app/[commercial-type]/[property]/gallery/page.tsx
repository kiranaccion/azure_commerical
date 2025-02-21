import Gallery from '@/components/Gallery';
import { getCommercialType } from '@/app/helper';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import { extractFieldsFromContentfulData, extractPropertyNameFromSlug } from '@/utils';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
// import dynamic from 'next/dynamic'
// const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false })

interface GalleryPageProps {
  params: Promise<{
    'commercial-type': string;
    'commercial-region': string;
    property: string;
  }>;
}

// Function to generate page metadata dynamically
export async function generateMetadata(props: GalleryPageProps): Promise<Metadata> {
  const params = await props.params;
  const { property, 'commercial-type': commercialParamsType, 'commercial-region': commercialRegion } = params;

  if (!property) {
    return {
      title: 'Page Not Found',
    };
  }

  const commercialType = getCommercialType(commercialParamsType);

  const propertyPinParams = {
    content_type: 'commercialPropertyPage',
    'fields.commercialType': commercialType,
    'fields.slug': property,
    select: 'fields.name,fields.heroImageGallery',
  };

  const commercialPropertyResponse: any = await fetchContentfulData(propertyPinParams);
  const propertyDetails = extractFieldsFromContentfulData(commercialPropertyResponse.items)?.[0];

  if (!propertyDetails) {
    return {
      title: 'Property Not Found',
    };
  }

  const propertyName = propertyDetails.name || 'Gallery';

  return {
    title: `${propertyName} Gallery | ${commercialType} Properties | ${commercialRegion} - Prometheus`,
    description: `Explore the gallery of ${propertyName} located in ${commercialRegion}. View images and details of this commercial property in the ${commercialType} category.`,
  };
}

export default async function GalleryPage(props: GalleryPageProps) {
  const params = await props.params;
  const { property, 'commercial-type': commercialParamsType } = params;

  if (!property) notFound();
  const commercialType = getCommercialType(commercialParamsType);

  const propertyPinParams = {
    content_type: 'commercialPropertyPage',
    'fields.commercialType': commercialType,
    'fields.slug': property,
    select: 'fields.slug,fields.heroImageGallery',
  };

  const commercialPropertyResponse: any = await fetchContentfulData(propertyPinParams);

  const { heroImageGallery } = extractFieldsFromContentfulData(commercialPropertyResponse.items)?.[0];

  return (
    <main>
      <h1 className="sr-only">Gallery Page | {extractPropertyNameFromSlug(property)}</h1>

      <Gallery galleryImages={heroImageGallery} suppressHydrationWarning />
    </main>
  );
}
