import AboutUs from "@/components/AboutUs";
import BusinessVerticals from "@/components/BusinessVerticals";
import ExploreSection from "@/components/ExploreSection";
import GMapWrapper from "@/components/GMapWrapper";
import HomeHeroSection from "@/components/HomeHeroSection";
import { fetchOfficePage } from "@/lib/api/fetchOfficeContentful";
import {
  businessVerticalMockData,
  officePageHeroSectionMocks,
  aboutUsMocks,
  exploreSectionMocks,
  officeCaoursalData,
} from "@/mock";
import { lodasOfficePinsDataset } from "@/mock/pinsMock";

export default async function Office() {
  const contentfulSpaceId: string = "commercialHomePage";

  const officeContentfulReponse: any = await fetchOfficePage(contentfulSpaceId);

  const {
    aboutSectionDescription,
    aboutSectionHeader,
    aboutSectionTitle,
    businessVerticals,
    businessVerticalsTitle,
    featuredCommercialProperty,
    heroSectionImage,
    heroSectionSubtitle,
    heroSectionTitle,
    regionModule,
  } = officeContentfulReponse.items[0].fields;

  return (
    <main>
      <HomeHeroSection
        heroImage={heroSectionImage}
        heroTitle={heroSectionTitle}
        heroSubTitle={heroSectionSubtitle}
      />
      <AboutUs
        aboutSectionHeader={aboutSectionHeader}
        aboutSectionTitle={aboutSectionTitle}
        aboutSectionDescription={aboutSectionDescription}
        featuredCommercialProperty={featuredCommercialProperty}
      />
      <ExploreSection exploreOffices={regionModule} />
      <GMapWrapper
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}
        pins={await lodasOfficePinsDataset()}
      />
      <BusinessVerticals
        businessVerticals={businessVerticals}
        businessVerticalsTitle={businessVerticalsTitle}
      />
    </main>
  );
}
