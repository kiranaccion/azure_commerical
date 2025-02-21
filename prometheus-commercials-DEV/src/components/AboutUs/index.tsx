import WelcomeSection from "../WelcomeSection";
import RightArrowIcon from "../SVGs/RightArrowIcon";
import "./styles.scss";
import Link from "next/link";
import { welcomeSectionMocks } from "../../mock";
import { READ_MORE_TEXT } from "../../constants";

export interface IAboutUs {
  aboutSectionHeader: string;
  aboutSectionTitle: string;
  aboutSectionDescription: string;
  featuredCommercialProperty: any;
}

export default function AboutUs({
  aboutSectionHeader,
  aboutSectionTitle,
  aboutSectionDescription,
  featuredCommercialProperty,
}: IAboutUs) {
  return (
    <div className="about-us-container">
      <WelcomeSection
        welcomeTitle={aboutSectionHeader}
        welcomeSubTitle={aboutSectionTitle}
        welcomeTextDescription={aboutSectionDescription}
      />

      <div className="offices">
        {featuredCommercialProperty.map((propertyItem: any) => {
          const { name, featuredImage, regionSlug, shortDescription } =
            propertyItem.fields;

          return (
            <div key={name} className="vertical">
              <div className="image-container">
                <img
                  src={featuredImage[0].src}
                  alt={name}
                  className="office-image"
                />
              </div>
              <div className="overlay">
                <div className="about-us-text-container">
                  <h4 className="title">{name}</h4>
                  <p className="description">{shortDescription}</p>
                  <Link href={`/office/${regionSlug}`}>
                    <div className="read-more">
                      <p className="read-more-text">{READ_MORE_TEXT}</p>
                      <RightArrowIcon />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
