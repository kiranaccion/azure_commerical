'use client';

import Image from 'next/image';
import './styles.scss';
import { fetchContentfulImage } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { READ_MORE_TEXT } from '@/constants';
import { RightArrowIcon } from '../SVGs';

export interface IAboutUs {
  aboutSectionHeader: string;
  aboutSectionTitle: string;
  aboutSectionDescription: string;
  featuredCommercialProperty: any;
}

const displayCode = false;

export default function AboutUs({
  aboutSectionHeader,
  aboutSectionTitle,
  aboutSectionDescription,
  featuredCommercialProperty,
}: IAboutUs) {
  const pathname = usePathname();

  return (
    <div className="about-us-container">
      {/* <WelcomeSection
        welcomeTitle={aboutSectionHeader}
        welcomeSubTitle={aboutSectionTitle}
        welcomeTextDescription={aboutSectionDescription}
      /> */}

      {displayCode && (
        <div className="offices">
          {featuredCommercialProperty.map((propertyItem: any) => {
            const { name, featuredImage, regionSlug, shortDescription, slug } = propertyItem.fields;

            return (
              <div key={name} className="vertical">
                <div className="image-container">
                  <Image src={fetchContentfulImage(featuredImage[0])} alt={name} className="office-image" fill />
                </div>
                <div className="overlay">
                  <div className="about-us-text-container">
                    <h4 className="title">{name}</h4>
                    <p className="description">{shortDescription}</p>
                    <Link href={`${pathname}/${regionSlug}/${slug}`} aria-label={READ_MORE_TEXT}>
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
      )}
    </div>
  );
}
