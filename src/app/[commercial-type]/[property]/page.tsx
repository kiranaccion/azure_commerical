import OfficeDetailsWrapper from '@/components/OfficeDetailWrapper';
import {
  createPropertyPinList,
  extractFieldsFromContentfulData,
  extractPropertyNameFromSlug,
  fetchContentfulMiscellaneousData,
} from '@/utils';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import { getCommercialType, propertyPinListParams } from '@/app/helper';
import { Metadata } from 'next';
import BusinessVerticals from '@/components/BusinessVerticals';
import { notFound } from 'next/navigation';

interface PropertyDetailedPageProps {
  params: Promise<{
    'commercial-type': string;
    'commercial-region': string;
    property: string;
  }>;
}

export const revalidate = 10;
export const dynamicParams = true;
export async function generateStaticParams() {
  const commercials = ['office', 'retail'];
  let paths: { 'commercial-type': string; property: string }[] = [];
  for (const commercialParamsType of commercials) {
    const commercialPropertiesResponse = await fetchContentfulData(
      propertyPinListParams(getCommercialType(commercialParamsType))
    );
    commercialPropertiesResponse.items?.map((item: any) => {
      paths.push({ 'commercial-type': commercialParamsType, property: item.fields.slug });
    });
  }
  return paths;
}

async function fetchCommercialProperty(commercialType: string, propertySlug: string) {
  const propertyPinParams = {
    content_type: 'commercialPropertyPage',
    'fields.commercialType': commercialType,
    'fields.slug': propertySlug,
    // select:
    //   'fields.slug,fields.name,fields.latLong,fields.regionSlug,fields.shortDescription,fields.heroImageGallery,fields.nearbyCommercialProperties,fields.nearbyApartments,fields.carouselImages',
  };

  return await fetchContentfulData(propertyPinParams);
}

export async function generateMetadata(props: PropertyDetailedPageProps): Promise<Metadata> {
  const params = await props.params;
  const { 'commercial-type': commercialParamsType, property } = params;

  const commercialType = getCommercialType(commercialParamsType);

  const commercialPropertiesResponse = await fetchCommercialProperty(commercialType, property);

  if (!commercialPropertiesResponse?.items?.length) {
    return {
      title: 'Page Not Found',
    };
  }

  const propertyData = commercialPropertiesResponse.items[0]?.fields;

  return {
    title: propertyData?.pageTitle || `${propertyData?.name} | ${commercialType} Properties - Prometheus`,
    description:
      propertyData?.metaDescription ||
      `Explore detailed information about ${propertyData?.name}. Discover nearby commercial properties, images, and more.`,
  };
}

const PropertyDetailedPage = async (props: PropertyDetailedPageProps) => {
  const params = await props.params;
  const { 'commercial-type': commercialParamsType, property } = params;

  const commercialType = getCommercialType(commercialParamsType);

  const [commercialPropertiesResponse, miscData] = await Promise.all([
    fetchCommercialProperty(commercialType, property),
    fetchContentfulMiscellaneousData(),
  ]);

  if (!commercialPropertiesResponse?.items?.length) {
    notFound();
  }

  console.log(
    'commercialPropertiesResponse',
    commercialPropertiesResponse.items[0].fields.pageTitle,
    commercialPropertiesResponse.items[0].fields.metaDescription
  );

  const { businessVerticals, businessVerticalsTitle } = miscData ?? {};
  const pinsDataSet = await createPropertyPinList(commercialPropertiesResponse.items, commercialType, true);

  return (
    <main>
      <h1 className="sr-only"> {extractPropertyNameFromSlug(property)} page</h1>

      {commercialPropertiesResponse.items.length !== 0 && (
        <OfficeDetailsWrapper
          propertyList={extractFieldsFromContentfulData(commercialPropertiesResponse.items)}
          pins={pinsDataSet}
        />
      )}

      {businessVerticals && businessVerticalsTitle && (
        <BusinessVerticals businessVerticals={businessVerticals} businessVerticalsTitle={businessVerticalsTitle} />
      )}
    </main>
  );
};

export default PropertyDetailedPage;
