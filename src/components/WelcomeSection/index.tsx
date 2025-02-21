import Image from 'next/image';
import './styles.scss';

import WelcomeCards from '../WelcomeCards';

export interface IWelcomeSection {
  welcomeCardsData: any;
  welcomeTitle: string;
  welcomeSubTitle?: string;
  welcomeTextDescription?: string;
}

const WelcomeSection = ({ welcomeCardsData, welcomeTitle, welcomeSubTitle, welcomeTextDescription }: IWelcomeSection) => {
  return (
    <>
      <div className="prom-reg-welcome-section-container">
        <Image className="prom-welcome-gray-logo" src="/promGrayLogo.svg" fill alt="prometheus gray logo" />
        <h2 className="prom-welcome-section-header">{welcomeTitle}</h2>
        {/* <h4 className="prom-welcome-section-subheader">{welcomeSubTitle}</h4> */}
        {/* <h5 className="prom-welcome-section-text">{welcomeTextDescription}</h5> */}
        {/* <PromMarkdown>{welcomeTextDescription}</PromMarkdown> */}
        <WelcomeCards welcomeData={welcomeCardsData} />
      </div>
    </>
  );
};

export default WelcomeSection;
