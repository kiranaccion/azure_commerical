'use client';

import Link from 'next/link';
import { EXPLORE_OFFICES } from '../../constants';
import './styles.scss';

export default function ExploreSection({ exploreOffices }: any) {
  const {
    label1,
    label2,
    region1Name,
    region1LinkUrl,
    region1Image,
    region2Name,
    region2LinkUrl,
    region2Image,
    region3Name,
    region3LinkUrl,
    region3Image,
  } = exploreOffices.fields;

  const regions = [
    {
      redirectionUrl: region1LinkUrl,
      image: region1Image[0].src,
      title: region1Name,
    },
    {
      redirectionUrl: region2LinkUrl,
      image: region2Image[0].src,
      title: region2Name,
    },
    {
      redirectionUrl: region3LinkUrl,
      image: region3Image[0].src,
      title: region3Name,
    },
  ];

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
            const { title, image, redirectionUrl } = region;
            return (
              <div
                className={`panel-0${index + 1}`}
                style={{
                  backgroundImage: `linear-gradient(90deg,rgba(0, 0, 0, 0.35) 0%,rgba(0, 0, 0, 0.35) 100%),url(${image})`,
                }}
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
                    <Link href={`/office/${redirectionUrl}`} className="explore-link">
                      <p>{EXPLORE_OFFICES}</p>
                    </Link>
                  </div>
                </div>
              </div>
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
              const { title, image, redirectionUrl } = region;

              return (
                <div
                  className={`mobile-locations-card-${index + 1}`}
                  style={{
                    backgroundImage: `linear-gradient(90deg,rgba(0, 0, 0, 0.35) 0%,rgba(0, 0, 0, 0.35) 100%),url(${image})`,
                  }}
                >
                  <h1 className="mobile-location-cards-heading">{title}</h1>
                  <Link href={`${redirectionUrl}`}>
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
