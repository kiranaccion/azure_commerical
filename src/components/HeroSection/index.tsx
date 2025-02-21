import './styles.scss';

type HeroSectionProps = {
  image: string;
  title: string;
  description: string;
};

export default function HeroSection({ image, title, description }: HeroSectionProps) {
  return (
    <div className="common-hero-container">
      <div className="common-image-container" style={{ backgroundImage: `url(${image})` }}>
        <div className="welcome-text-container">
          <p className="hero-text">{title}</p>
          <p className="hero-description-text">{description}</p>
        </div>
      </div>
    </div>
  );
}
