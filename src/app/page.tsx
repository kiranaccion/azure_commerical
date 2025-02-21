import HomeHeroSection from '@/components/HomeHeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import type { Metadata } from 'next';

export const revalidate = 10;

export const metadata: Metadata = {
  title: 'Prometheus Reg',
  description: 'Prometheus Reg',
};

export default async function HomePage() {
  const contentType = 'regHomePage';
  const homePageData = await fetchContentfulData({ content_type: contentType });

  const {
    welcomeTitle,
    heroImage,
    card1Title,
    card1Description,
    card1Header,
    card2Cta,
    card2Image,
    card2Text,
    card3Cta,
    card3Image,
    card3Text,
    card4Cta,
    card4Image,
    card4Text,
  } = homePageData.items[0].fields;

  const welcomeCardsData = [
    {
      cta: card1Title,
      image: card1Description,
      text: card1Header,
    },
    {
      cta: card2Cta,
      image: card2Image,
      text: card2Text,
    },
    {
      cta: card3Cta,
      image: card3Image,
      text: card3Text,
    },
    {
      cta: card4Cta,
      image: card4Image,
      text: card4Text,
    },
  ];

  return (
    <main>
      <HomeHeroSection heroImage={heroImage} />
      <WelcomeSection welcomeTitle={welcomeTitle} welcomeCardsData={welcomeCardsData} />
      {/* <BusinessVerticals businessVerticals={businessVerticals} businessVerticalsTitle={businessVerticalsTitle} /> */}
    </main>
  );
}
