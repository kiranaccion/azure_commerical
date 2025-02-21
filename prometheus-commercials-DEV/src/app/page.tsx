import BusinessVerticals from "@/components/BusinessVerticals";
import HomeHeroSection from "@/components/HomeHeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import { fetchRegHomePage } from "@/lib/api/fetchRegHomePage";

export const revalidate = 0;

const Home = async () => {
  const homePageData: any = await fetchRegHomePage();

  const {
    businessVerticals,
    businessVerticalsTitle,
    welcomeTitle,
    welcomeSubTitle,
    welcomeTextDescription,
    heroImage,
    heroTitle,
    heroSubTitle,
  } = homePageData.items[0].fields;

  return (
    <main>
      <HomeHeroSection
        heroImage={heroImage}
        heroTitle={heroTitle}
        heroSubTitle={heroSubTitle}
      />
      <WelcomeSection
        welcomeTitle={welcomeTitle}
        welcomeSubTitle={welcomeSubTitle}
        welcomeTextDescription={welcomeTextDescription}
      />
      <BusinessVerticals
        businessVerticals={businessVerticals}
        businessVerticalsTitle={businessVerticalsTitle}
      />
    </main>
  );
};

export default Home;
