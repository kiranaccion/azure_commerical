import { COMMERCIAL_OFFICE, COMMERCIAL_RETAIL } from '@/constants';
import { fetchContentfulData } from '@/lib/api/fetchContentfulData';
import Link from 'next/link';
import './styles.scss';
import { siteMapLinks } from '@/utils/mock';
import SitemapRightIcon from '@/components/Icons/SiteMapRight';
import { propertyPinListParams } from '../helper';

export async function generateMetadata() {
  return {
    title: 'Site Map | Explore Office and Retail Properties',
    description:
      'Navigate through the commercial office and retail property listings on our site. Discover properties by category through our comprehensive sitemap.',
  };
}

export default async function SitemapPage() {
  const officeResponse: any = await fetchContentfulData(propertyPinListParams(COMMERCIAL_OFFICE));
  const retailResponse: any = await fetchContentfulData(propertyPinListParams(COMMERCIAL_RETAIL));

  const commercialProperties: any = {
    office: officeResponse.items || [],
    retail: retailResponse.items || [],
  };

  const siteMapLinkPart1 = siteMapLinks.slice(0, 4);
  const siteMapLinkPart2 = siteMapLinks.slice(4, 7);

  return (
    <div className="sitemap-page">
      <section className="header-section">
        <h1>Site Map</h1>
      </section>

      <div className="sitemap-links-section">
        <div>
          <div className="commercials-properties-container">
            {Object.keys(commercialProperties).map((commercialProperty) => (
              <div className="properties-section" key={commercialProperty}>
                <h2 className="property-heading">{commercialProperty.toUpperCase()}</h2>

                <div className="commercials-container">
                  {commercialProperties[commercialProperty]
                    .sort((a: { fields: { name: string } }, b: { fields: { name: string } }) =>
                      a.fields.name.localeCompare(b.fields.name)
                    )
                    .map(({ fields }: { fields: { slug: string; name: string } }) => (
                      <div key={fields.slug}>
                        <Link href={`/${commercialProperty}/${fields.slug}`} key={fields.slug} aria-label={fields.name}>
                          {fields.name}
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pages-links-section">
          <article className="page-sections-container1">
            <h2 className="page-sub-heading">Apartments</h2>
            {siteMapLinkPart1?.map((siteMapDetails: any) => (
              <>
                {siteMapDetails.pageTitle.toLowerCase() !== 'specials' && (
                  <div key={siteMapDetails.pageTitle} className="redirect-url-link-container">
                    {/* <h2 className="page-sub-heading">{siteMapDetails?.pageTitle}</h2> */}
                    <div className="link-and-text">
                      {siteMapDetails?.subPages?.map((subPage: any) => (
                        <a target="_blank" href={subPage.pageLink} key={subPage.pageLink}>
                          <p className="sitemap-redirect-page-link">
                            <span>{subPage.pageName.toUpperCase()}</span>
                            <span>
                              <SitemapRightIcon />
                            </span>
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </article>
          <article className="page-sections-container2">
            {siteMapLinkPart2?.map((siteMapDetails: any) => (
              <div key={siteMapDetails.pageTitle} className="redirect-url-link-container">
                {/* <h2 className="page-sub-heading">{siteMapDetails?.pageTitle}</h2> */}
                <div className="link-and-text">
                  {siteMapDetails?.subPages?.map((subPage: any) => (
                    <a target="_blank" href={subPage.pageLink} key={subPage.pageLink}>
                      <p className="sitemap-redirect-page-link">
                        <span>{subPage.pageName}</span>
                        <span>
                          <SitemapRightIcon />
                        </span>
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
