import { fetchContentfulImage } from '@/utils';
import './styles.scss';
import Image from 'next/image';

export interface IHeroSection {
  heroImage: any;
}

const HomeHeroSection = ({ heroImage }: IHeroSection) => {
  heroImage = fetchContentfulImage(heroImage[0]);

  return (
    <div className="hero-outer-container">
      <div className="hero-container">
        <Image
          className="hero-image"
          src={heroImage}
          alt="hero image"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
        <div className="gradient-overlay" />
        <div className="image-container" />
      </div>
    </div>
  );
};

export default HomeHeroSection;
