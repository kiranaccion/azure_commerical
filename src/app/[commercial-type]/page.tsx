import BusinessVerticals from '@/components/BusinessVerticals';
import ExploreSection from '@/components/ExploreSection';
import GMapWrapper from '@/components/GMapWrapper';
import HomeHeroSection from '@/components/HomeHeroSection';
import DescriptionSection from '@/components/Description';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import { createPropertyPinList, fetchContentfulMiscellaneousData, getAllApartments } from '@/utils';
import { getCommercialType, propertyPinListParams } from '../helper';
import { defaultCenter, defaultZoom } from '@/constants';
import { Metadata } from 'next';

// Purge the cache
export const revalidate = 10;
// Disable dynamic params, redirect to 404 if invalid
export const dynamicParams = false;
// SSG for commercial type pages
const commercials = ['Office', 'Retail'];
export async function generateStaticParams() {
  return commercials.map((commercial) => ({
    'commercial-type': commercial.toLowerCase(),
  }));
}

export async function generateMetadata(props: { params: Promise<{ 'commercial-type': string }> }): Promise<Metadata> {
  const params = await props.params;
  const commercialType = getCommercialType(params['commercial-type']);
  const title = `${commercialType} - Explore Properties | My Real Estate Company - Prometheus`;

  const commercialHomePageResponse = await fetchContentfulData({
    content_type: 'commercialHomePage',
    'fields.commercialType': commercialType,
  });

  const propertyData = commercialHomePageResponse.items[0]?.fields;

  return {
    title: propertyData?.pageTitle || `${title} | ${commercialType} - Prometheus Commericials`,
    description:
      propertyData?.metaDescription ||
      `Explore detailed information about ${propertyData?.name}. Discover nearby commercial properties, images, and more.`,
  };
}

export default async function CommercialTypePage(props: { params: Promise<{ 'commercial-type': string }> }) {
  const params = await props.params;
  const contentType: string = 'commercialHomePage';
  const commercialType = getCommercialType(params['commercial-type']);

  const [commercialHomePageResponse, commercialPropertiesResponse, apartmentsData, miscData] = await Promise.all([
    fetchContentfulData({
      content_type: contentType,
      'fields.commercialType': commercialType,
    }),
    fetchContentfulData(propertyPinListParams(commercials.join(','))),
    getAllApartments(),
    fetchContentfulMiscellaneousData(),
  ]);

  const { businessVerticals, businessVerticalsTitle } = miscData ?? {};
  const pinsDataSet = [
    ...(await createPropertyPinList(commercialPropertiesResponse.items, commercialType, false)),
    ...apartmentsData,
  ];

  const {
    aboutSectionDescription,
    aboutSectionHeader,
    heroSectionImage,
    regionModule,
    mapCenterCoordinates = defaultCenter,
    mapZoom = defaultZoom,
  } = commercialHomePageResponse.items[0]?.fields ?? {};

  return (
    <main>
      {heroSectionImage && <HomeHeroSection heroImage={heroSectionImage} />}
      <DescriptionSection header={aboutSectionHeader} body={aboutSectionDescription} />

      {regionModule && <ExploreSection exploreOffices={regionModule} commercialType={commercialType} />}
      <GMapWrapper
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''}
        pins={pinsDataSet}
        mapCenterCoordinates={mapCenterCoordinates}
        mapZoom={mapZoom}
      />
      {businessVerticals && businessVerticalsTitle && (
        <BusinessVerticals businessVerticals={businessVerticals} businessVerticalsTitle={businessVerticalsTitle} />
      )}
    </main>
  );
}
