import Link from 'next/link';
import Image from 'next/image';
import RightArrowIcon from '../SVGs/RightArrowIcon';
import './styles.scss';
import { fetchContentfulImage } from '@/utils';

const BusinessVerticals = ({ businessVerticals, businessVerticalsTitle }: any) => {
  return (
    <section className="business-verticals-container">
      <div className="business-verticals-content">
        <div className="business-verticals-header">{businessVerticalsTitle}</div>
        <div className="business-verticals-cards-section">
          {businessVerticals.map((businessVerticalItem: any) => {
            const { title, subTitle, image, linkUrl, linkText } = businessVerticalItem.fields;
            const imgSrc = fetchContentfulImage(image[0]);

            return (
              <div className="business-verticals-card-item" key={title}>
                <Image src={imgSrc} alt={title} fill className="business-verticals-image" />
                <div className="business-verticals-tint">
                  <div className="business-verticals-card-content-section">
                    <h4 className="business-vertical-title">{title}</h4>
                    <p className="business-vertical-subtitle">{subTitle}</p>
                    <Link
                      className="read-more-link"
                      href={`${linkUrl}`}
                      target={linkUrl === process.env.NEXT_PUBLIC_APARTMENTS_URL ? '_blank' : undefined}
                      aria-label={linkText.toUpperCase()}
                    >
                      <p className="read-more-text-arrow">
                        <span className="read-more-text">{linkText.toUpperCase()}</span>
                        <span>
                          <RightArrowIcon />
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessVerticals;
