import { fetchContentfulImage } from '@/utils';
import './styles.scss';
import Image from 'next/image';

interface BuildingCardProps {
  image: string;
  id: string;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ image, title, id, isSelected, onClick, description }) => {
  return (
    <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick} id={id}>
      <div className="image-wrapper">
        <Image src={fetchContentfulImage(image)} alt={title} className="image" fill />
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export default BuildingCard;
