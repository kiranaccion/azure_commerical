'use client';

import Image from 'next/image';
import Link from 'next/link';
import Promlogo from '../SVGs/Promlogo';
import './styles.scss';
import { useEffect, useState } from 'react';
import { fetchLocationData } from '@/lib/api/fetchAxios';
import { BCorpPromLink, footerQuickLinks, PROM_APARTEMENTS_URL } from '@/utils/mock';
import { fetchContentfulMiscellaneousData, renderCopyRightYears } from '@/utils';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isSearchPage = usePathname() === '/search';
  const isOfficePage = /^(\/office\/|\/retail\/).+/.test(pathname);

  const [apartmentLocationsData, setApartmentLocationsData] = useState<any>(null);
  const [bCorpLink, setBCorpLink] = useState<string>('');

  useEffect(() => {
    fetchLocationData().then((response: any) => {
      setApartmentLocationsData(response);
    });

    fetchContentfulMiscellaneousData().then((response) => {
      if (response && response.bCorpPdfLink) {
        setBCorpLink(response.bCorpPdfLink);
      }
    });
  }, []);

  return (
    <>
      <div className="footer-outer-container">
        <div className="footer-main-container" id="footer-main-specific-container">
          <div className="footer-logo-container">
            <Link href={'/'} aria-label="Prometheus logo">
              {' '}
              <Promlogo></Promlogo>
            </Link>
          </div>
          <div className="footer-inner-container">
            {!isSearchPage ? (
              <>
                <div className="footer-ca-apartments footer-links-container">
                  <Link
                    href={`https://prometheusapartments.com/search?term=California`}
                    target="_blank"
                    aria-label={apartmentLocationsData?.ca?.apartmentsName}
                  >
                    <p className="footer-links-header">{apartmentLocationsData?.ca?.apartmentsName}</p>
                  </Link>
                  <div className="footer-links-inner-container">
                    {apartmentLocationsData?.ca?.apartmentsList?.map(({ fields }: any) => (
                      <Link
                        className="footer-links"
                        key={fields.cityPageSlug}
                        href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                        target="_blank"
                        aria-label={fields.cityName}
                      >
                        {fields.cityName}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="footer-divider"></div>
                <div className="oregon-washington-container">
                  <div className="footer-og-apartments footer-links-container">
                    <Link
                      href={`https://prometheusapartments.com/search?term=Oregon`}
                      target="_blank"
                      aria-label={apartmentLocationsData?.oa?.apartmentsName}
                    >
                      <p className="footer-links-header">{apartmentLocationsData?.oa?.apartmentsName}</p>
                    </Link>
                    <div className="footer-links-inner-container">
                      {apartmentLocationsData?.oa?.apartmentsList?.map(({ fields }: any) => (
                        <Link
                          className="footer-links"
                          key={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                          href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                          target="_blank"
                          aria-label={fields.cityName}
                        >
                          {fields.cityName}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="footer-divider"></div>
                  <div className="footer-ws-apartments footer-links-container">
                    <Link
                      href={`https://prometheusapartments.com/search?term=Washington`}
                      target="_blank"
                      aria-label={apartmentLocationsData?.sa?.apartmentsName}
                    >
                      <p className="footer-links-header">{apartmentLocationsData?.sa?.apartmentsName}</p>
                    </Link>
                    <div className="footer-links-inner-container">
                      {apartmentLocationsData?.sa?.apartmentsList?.map(({ fields }: any) => (
                        <Link
                          className="footer-links"
                          key={fields.cityPageSlug}
                          href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                          target="_blank"
                          aria-label={fields.cityName}
                        >
                          {fields.cityName}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Accordion className="searchFooterAccordian californiaAccordion">
                  <AccordionSummary
                    className="searchFooterAccordianSummary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel9a-content"
                    id="panel9a-header"
                  >
                    <p className="accordionFooterApartmentName" style={{ fontSize: '20px' }}>
                      {apartmentLocationsData?.ca?.apartmentsName}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="tabFooterCaApartmentsContainer">
                      <div className="accordionFooterCaApartments">
                        {apartmentLocationsData?.ca?.apartmentsList?.map(({ fields }: any) => (
                          <Link
                            href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                            className="footer-links"
                            key={fields.cityPageSlug}
                            target="_blank"
                            aria-label={fields.cityName}
                          >
                            {fields.cityName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion className="searchFooterAccordian californiaAccordion">
                  <AccordionSummary
                    className="searchFooterAccordianSummary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel9a-content"
                    id="panel9a-header"
                  >
                    <p className="accordionFooterApartmentName" style={{ fontSize: '20px' }}>
                      {apartmentLocationsData?.oa?.apartmentsName}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="tabFooterCaApartmentsContainer">
                      <div className="accordionFooterCaApartments">
                        {apartmentLocationsData?.oa?.apartmentsList?.map(({ fields }: any) => (
                          <Link
                            href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                            className="footer-links"
                            key={fields.cityPageSlug}
                            target="_blank"
                            aria-label={fields.cityName}
                          >
                            {fields.cityName}{' '}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>{' '}
                <Accordion className="searchFooterAccordian californiaAccordion">
                  <AccordionSummary
                    className="searchFooterAccordianSummary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel9a-content"
                    id="panel9a-header"
                  >
                    <p className="accordionFooterApartmentName" style={{ fontSize: '20px' }}>
                      {apartmentLocationsData?.sa?.apartmentsName}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="tabFooterCaApartmentsContainer">
                      <div className="accordionFooterCaApartments">
                        {apartmentLocationsData?.sa?.apartmentsList?.map(({ fields }: any) => (
                          <Link
                            href={`https://prometheusapartments.com/${fields.stateCode}/${fields.cityPageSlug}`}
                            className="footer-links"
                            key={fields.cityPageSlug}
                            target="_blank"
                            aria-label={fields.cityName}
                          >
                            {fields.cityName}{' '}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
            {!isSearchPage ? (
              <>
                <div className="footer-divider"></div>
                <div className="apartments-commercial-container">
                  <div className="footer-data-apartments footer-links-container">
                    <Link
                      href={`${PROM_APARTEMENTS_URL}`}
                      className="footer-links-header"
                      target="_blank"
                      aria-label={footerQuickLinks.promFooterPages.apartments.title}
                    >
                      {footerQuickLinks.promFooterPages.apartments.title}
                    </Link>
                    <div className="footer-links-inner-container">
                      {footerQuickLinks.promFooterPages.apartments.links.map((link) => (
                        <Link
                          className="footer-links"
                          key={link.linkTo}
                          target="_blank"
                          href={link.linkTo}
                          aria-label={link.name}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="footer-divider footer-divider-mobile-only"></div>
                  <div className="footer-data-commercial footer-links-container">
                    <Link
                      href="/"
                      className="footer-links-header"
                      style={{ width: 'auto' }}
                      aria-label={footerQuickLinks.promFooterPages.commercials.title}
                    >
                      {footerQuickLinks.promFooterPages.commercials.title}
                    </Link>
                    <div className="footer-links-inner-container">
                      {footerQuickLinks.promFooterPages.commercials.links.map((link) => (
                        <Link className="footer-links" key={link.linkTo} href={link.linkTo} aria-label={link.name}>
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="apartments-commercial-container">
                <div className="footer-data-apartments footer-links-container">
                  <Link
                    href={`${PROM_APARTEMENTS_URL}`}
                    className="footer-links-header"
                    target="_blank"
                    aria-label={footerQuickLinks.promFooterPages.apartments.title}
                  >
                    {footerQuickLinks.promFooterPages.apartments.title}
                  </Link>
                  <div className="footer-links-inner-container">
                    {footerQuickLinks.promFooterPages.apartments.links.map((link) => (
                      <Link className="footer-links" key={link.linkTo} target="_blank" href={link.linkTo} aria-label={link.name}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="footer-divider footer-divider-commercials"></div>
                <div className="footer-data-commercial footer-links-container">
                  <Link
                    href="/"
                    className="footer-links-header"
                    style={{ width: 'auto' }}
                    aria-label={footerQuickLinks.promFooterPages.commercials.title}
                  >
                    {footerQuickLinks.promFooterPages.commercials.title}
                  </Link>
                  <div className="footer-links-inner-container">
                    {footerQuickLinks.promFooterPages.commercials.links.map((link) => (
                      <Link className="footer-links" key={link.linkTo} href={link.linkTo} aria-label={link.name}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="footer-divider prom-data-divider"></div>
            <div className="footer-data-common footer-links-container">
              <div className="footer-links-inner-container prom-data-container">
                {footerQuickLinks.promApartmentsStoriesLinks.map((story: any) => (
                  <Link className="footer-links" key={story.linkTo} target="_blank" href={story.linkTo} aria-label={story.name}>
                    {story.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-links-container footer-socials">
              <Link href={bCorpLink || BCorpPromLink} rel="noreferrer" target="_blank" aria-label="Certified B Crop Image">
                <Image
                  src="/BCorpLogo.png"
                  alt="Certified B corporation, we are a B corp. part of a group of companies that meets the highest standards for using business as a force for good."
                  className="footerImage"
                  height={107}
                  width={230}
                  priority
                />
              </Link>
              <div className="footer-media-container">
                {footerQuickLinks.logosList.map((logoLink: any) => (
                  <Link
                    href={logoLink.socialMediaLink}
                    target="_blank"
                    key={logoLink.logoSrc}
                    style={{ width: '18px', height: '18px' }}
                    aria-label="Social media"
                  >
                    {logoLink.socialMediaSvg}
                  </Link>
                ))}
              </div>
            </div>
            {/* <div className="footer-divider"></div> */}
            <div className="common-pages-container footer-links-container">
              <div className="footer-links-inner-container">
                {footerQuickLinks.footerPolicies.map((policy) => (
                  <Link
                    href={policy.linkTo}
                    key={policy.name}
                    target={policy.linkTo.includes(process.env.NEXT_PUBLIC_APARTMENTS_URL as string) ? '_blank' : undefined}
                    aria-label={policy.name}
                  >
                    <p className="common-pages-link">{policy.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-divider-02"></div>
          <div className={`bottom-footer-strip ${isOfficePage ? 'bottom-footer-padding' : ''}`}>
            <p>Prometheus Real Estate Group, a licensed real estate broker DRE Lic. #01144157</p>
            <p>&#169; {renderCopyRightYears()} Prometheus. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
