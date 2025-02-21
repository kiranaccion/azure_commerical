'use client';

import Link from 'next/link';
import { COMMERCIAL_OFFICE, COMMERCIAL_RETAIL, EXPLORE_OFFICES, EXPLORE_RETAIL } from '../../constants';
import './styles.scss';
import { useRouter } from 'next/navigation';
import { fetchContentfulImage } from '@/utils';

export default function ExploreSection({ exploreOffices, commercialType }: any) {
  const router = useRouter();

  let {
    label1,
    label2,
    region1Name,
    region1Image,
    region1SearchString,
    region2Name,
    region2Image,
    region2SearchString,
    region3Name,
    region3Image,
    region3SearchString,
  } = exploreOffices.fields;

  region1Image = fetchContentfulImage(region1Image[0]);
  region2Image = fetchContentfulImage(region2Image[0]);
  region3Image = fetchContentfulImage(region3Image[0]);

  const regions = [
    {
      image: region1Image,
      title: region1Name,
      searchString: region1SearchString,
    },
    {
      image: region2Image,
      title: region2Name,
      searchString: region2SearchString,
    },
    {
      image: region3Image,
      title: region3Name,
      searchString: region3SearchString,
    },
  ];

  let EXPLORE_COMMERCIAL = '';

  if (commercialType === COMMERCIAL_OFFICE) {
    EXPLORE_COMMERCIAL = EXPLORE_OFFICES;
  } else if (commercialType === COMMERCIAL_RETAIL) {
    EXPLORE_COMMERCIAL = EXPLORE_RETAIL;
  }

  return (
    <>
      <div className="desktopLocationsContainer">
        <div className="desktopLocationsHeading">
          <p role="heading" aria-level={3}>
            {label1}
          </p>
          <p role={'heading'} aria-level={2}>
            {label2}
          </p>
        </div>

        {regions &&
          regions.length !== 0 &&
          regions.map((region: any, index: number) => {
            const { title, image, searchString } = region;
            return (
              // <Link href={`/${commercialType.toLowerCase()}/${redirectionUrl}`}>
              <div
                className={`panel-0${index + 1}`}
                style={{
                  backgroundImage: `linear-gradient(90deg,rgba(0, 0, 0, 0.35) 0%,rgba(0, 0, 0, 0.35) 100%),url(${image})`,
                }}
                key={title}
                onClick={() => router.push(`/search?term=${searchString}&${commercialType.toLowerCase()}=true`)}
              >
                <div
                  className="panel-locations panel-locations-01"
                  role="link"
                  tabIndex={-1}
                  // onKeyDown={(event: any) => {
                  //   if (event.keyCode === 13) {
                  //     router.push(
                  //       `/search?term=${locs.data[0].locationExploreLink}`
                  //     );
                  //   }
                  // }}
                >
                  <div className="panel-text-container">
                    <p>{title}</p>
                    <Link
                      href={`/search?term=${searchString}&${commercialType.toLowerCase()}=true`}
                      className="explore-link"
                      aria-label={EXPLORE_COMMERCIAL}
                    >
                      <p>{EXPLORE_COMMERCIAL}</p>
                    </Link>
                  </div>
                </div>
              </div>
              // </Link>
            );
          })}
      </div>
      <div className="mobile-locations-container">
        <div className="mobile-locations-heading">
          <p role="heading" aria-level={3}>
            {label1}
          </p>
          <p role={'heading'} aria-level={2}>
            {label2}
          </p>
        </div>
        <div className="mobile-locations-cards-container">
          {regions &&
            regions.length !== 0 &&
            regions.map((region: any, index: number) => {
              const { title, image, searchString } = region;

              return (
                <div
                  className={`mobile-locations-card-${index + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(90deg,rgba(0, 0, 0, 0.35) 0%,rgba(0, 0, 0, 0.35) 100%),url(${image})`,
                  }}
                  key={title}
                  onClick={() => router.push(`/search?term=${searchString}&${commercialType.toLowerCase()}=true`)}
                >
                  <h1 className="mobile-location-cards-heading">{title}</h1>
                  <Link href={`/search?term=${searchString}&${commercialType.toLowerCase()}=true`} aria-label={EXPLORE_OFFICES}>
                    <p className="mobile-location-cards-text">{EXPLORE_OFFICES}</p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
