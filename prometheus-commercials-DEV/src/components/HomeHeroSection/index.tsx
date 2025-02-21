import './styles.scss';

export interface IHeroSection {
  heroImage: any;
  heroTitle: string;
  heroSubTitle: string;
}

const HomeHeroSection = ({ heroImage, heroTitle, heroSubTitle }: IHeroSection) => {
  return (
    <div className="hero-outer-container">
      <div
        className="hero-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),url(${heroImage[0].src})`,
        }}
      >
        <div className="image-container">
          <h1 className="hero-heading">{heroTitle}</h1>
          <h3 className="hero-text">{heroSubTitle}</h3>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
