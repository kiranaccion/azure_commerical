import Link from 'next/link';
import './styles.scss';
import Image from 'next/image';
import PromMarkdown from '../PromMarkdown';

const WelcomeCards = ({ welcomeData }: any) => {
  return (
    <section className="welcome-cards-container">
      {welcomeData.map((welcomeItem: any, index: number) => {
        const { text, cta, image } = welcomeItem;

        return index === 0 ? (
          <div className="welcome-text-section" key={cta}>
            <h2 className="welcome-title">{cta}</h2>

            {text && <h3 className="welcome-subtitle">{text}</h3>}

            <div className="welcome-markdown-container">
              <PromMarkdown>{image}</PromMarkdown>
            </div>
            {/* <h4 className="welcome-description"></h4> */}
          </div>
        ) : (
          <Link href={`${cta}`} key={cta} aria-label={text} target={cta.includes('apartments') ? '_blank' : '_self'}>
            <div className={`image-cards-section ${text.toLowerCase()}`}>
              <Image src={image[0].src} alt={text} fill style={{ objectFit: 'cover' }} className="welcome-card-image" />
              <p className="welcome-card-label">{text}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default WelcomeCards;
