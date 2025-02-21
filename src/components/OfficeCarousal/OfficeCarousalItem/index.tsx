import Image from 'next/image';
import './index.scss';
import { READ_MORE_TEXT } from '../../../constants';
import Link from 'next/link';
import RightArrowIcon from '../../SVGs/RightArrowIcon';
import { fetchContentfulImage } from '@/utils';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

interface OfficeCarousalProps {
  siteId: string;
  imageSrc: string | null;
  title: string;
  description: string;
  redirectTo: string;
  handleSelect: (siteId: string | null) => void;
  selectedItem: string | null;
  hoveredProperty: string | null;
  propertyType: string;
  setHoveredProperty: (key: string | null) => void;
}

const OfficeCarousalItem = ({
  siteId,
  imageSrc,
  title,
  description,
  redirectTo,
  handleSelect,
  selectedItem,
  hoveredProperty,
  propertyType,
  setHoveredProperty,
}: OfficeCarousalProps) => {
  const params = useParams();

  const themeColor = useMemo(() => {
    if (propertyType === 'office') return '#00A8BF';
    if (propertyType === 'retail') return '#1C3C34';
    if (propertyType === 'apartments') return '#fc4d0f';
  }, [propertyType]);

  const handleMouseOverOnCard = (e: any) => {
    if (selectedItem && selectedItem !== siteId) {
      handleSelect(null);
    }
    setHoveredProperty(siteId);
  };

  const handleMouseLeaveOnCard = (e: any) => {
    setHoveredProperty(null);
  };

  const isPropertySelected = params.property === siteId;

  return (
    <section
      onMouseEnter={handleMouseOverOnCard}
      onMouseLeave={handleMouseLeaveOnCard}
      className="carousal-item-contianer"
      id={siteId}
      style={{
        outline: hoveredProperty === siteId || selectedItem === siteId ? `5px solid ${themeColor}` : undefined,
      }}
    >
      {!isPropertySelected ? (
        <Link
          href={`${redirectTo}`}
          target={redirectTo.includes(process.env.NEXT_PUBLIC_APARTMENTS_URL as string) ? '_blank' : undefined}
          aria-label={READ_MORE_TEXT}
          style={{ display: 'block', height: '100%' }} // Ensures the entire section is clickable
        >
          <div className="carousal-item-image-container">
            {imageSrc && (
              <Image src={fetchContentfulImage(imageSrc)} fill alt="" className="carousal-item-image" priority sizes="100vw" />
            )}
          </div>
          <div
            className="carousal-item-details-container"
            style={{
              backgroundColor: isPropertySelected ? themeColor : undefined,
              color: isPropertySelected ? '#FFF' : undefined,
            }}
          >
            <p className="carousal-item-title">{title}</p>
            <div
              className="carousal-item-description"
              style={{ color: isPropertySelected ? '#FFF' : undefined, alignSelf: 'center' }}
            >
              <ReactMarkdown>{description?.slice(0, 140) + '...'}</ReactMarkdown>
            </div>
            <p className="carousal-item-read-more">
              <span>{READ_MORE_TEXT}</span>
              <span>
                <RightArrowIcon />
              </span>
            </p>
          </div>
        </Link>
      ) : (
        <>
          <div className="carousal-item-image-container">
            {imageSrc && (
              <Image src={fetchContentfulImage(imageSrc)} fill alt="" className="carousal-item-image" priority sizes="100vw" />
            )}
          </div>
          <div
            className="carousal-item-details-container"
            style={{
              backgroundColor: isPropertySelected ? themeColor : undefined,
              color: isPropertySelected ? '#FFF' : undefined,
            }}
          >
            <p className="carousal-item-title">{title}</p>
            <div
              className="carousal-item-description"
              style={{ color: isPropertySelected ? '#FFF' : undefined, alignSelf: 'center' }}
            >
              <ReactMarkdown>{description?.slice(0, 140) + '...'}</ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default OfficeCarousalItem;
