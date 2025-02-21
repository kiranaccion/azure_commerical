import BusinessVerticals from "@/components/BusinessVerticals";
import GMapDetailWrapper from "@/components/GMapDetailWrapper";
import HeroSection from "@/components/HeroSection";
import OfficeDetailsWrapper from "@/components/OfficeDetailWrapper";
import {
  businessVerticalMockData,
  officeDetailPageHeroSectionMocks,
  mockRegionalOffices,
} from "@/mock";
import { lodasOfficePinsDataset, OfficeProperty } from "@/mock/pinsMock";

type OfficeDetailPageProps = {
  params: {
    officeId: string;
  };
};

export default async function OfficeDetailPage({
  params,
}: OfficeDetailPageProps) {
  const { officeId } = params;
  const pins = await lodasOfficePinsDataset();

  return (
    <main>
      <HeroSection {...officeDetailPageHeroSectionMocks} />
      <OfficeDetailsWrapper propertyList={mockRegionalOffices}/>
      <GMapDetailWrapper
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}
        pins={pins}
        defaultPin={pins[5] as OfficeProperty}
      />
      <BusinessVerticals
        businessVerticals={businessVerticalMockData.businessVerticals}
        businessVerticalsTitle={businessVerticalMockData.businessVerticalsTitle}
      />
    </main>
  );
}
