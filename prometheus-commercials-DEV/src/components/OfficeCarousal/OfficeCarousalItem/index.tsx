import Image from 'next/image';
import './index.scss';
import { READ_MORE_TEXT } from '../../../constants';
import Link from 'next/link';
import RightArrowIcon from '../../SVGs/RightArrowIcon';

interface OfficeCarousalProps {
  siteId: number;
  imageSrc: string;
  title: string;
  description: string;
  redirectTo: string;
  handleSelect: (siteId: number | null) => void;
  selectedItem: number | null;
  hoveredProperty: number | null;
  setHoveredProperty: (key: number | null) => void;
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
  setHoveredProperty,
}: OfficeCarousalProps) => {
  // Handles the mouse over event on an apartment card, invoking the provided `onCardHover` callback with the `cardInfo` data.
  const handleMouseOverOnCard = (e: any) => {
    setHoveredProperty(siteId);
  };

  // Handles the mouse leave event on an apartment card, invoking the provided `onCardLeave` callback with the `cardInfo` data.
  const handleMouseLeaveOnCard = (e: any) => {
    setHoveredProperty(null);
  };

  return (
    <section
      onMouseEnter={handleMouseOverOnCard}
      onMouseLeave={handleMouseLeaveOnCard}
      className={`carousal-item-contianer ${selectedItem === siteId ? 'selected-item' : undefined}
        ${!selectedItem && hoveredProperty === siteId ? 'hovered-item' : undefined}
      `}
      id={`${selectedItem === siteId ? 'selected-item' : undefined}`}
      onClick={() => handleSelect(siteId)}
    >
      <div className="carousal-item-image-container">
        <Image
          src={imageSrc}
          layout="fill"
          alt=""
          className="carousal-item-image"
          // placeholder="blur"
          priority
          sizes="100vw"
        />
      </div>
      <div className="carousal-item-details-container">
        <p className="carousal-item-title">{title}</p>
        <p className="carousal-item-description">{description}</p>
        <Link href={`${redirectTo}`}>
          <p className="carousal-item-read-more">
            <span>{READ_MORE_TEXT}</span>
            <span>
              <RightArrowIcon />
            </span>
          </p>
        </Link>
      </div>
    </section>
  );
};

export default OfficeCarousalItem;
