import './styles.scss';

interface BuildingCardProps {
  image: string;
  title: string;
  description?: string;
  isSelected: boolean;
  onClick: () => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ image, title, description, isSelected, onClick }) => {
  return (
    <div className={`card ${isSelected ? 'selected' : ''}`} onClick={onClick} id={title}>
      <div className="image-wrapper">
        <img src={image} alt={title} className="image" />
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export default BuildingCard;
