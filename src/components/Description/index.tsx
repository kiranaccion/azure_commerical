import React from 'react';
import './styles.scss';

interface DescriptionSectionProps {
  header: string;
  body: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ header, body }) => {
  return (
    <section className="descriptionSection" id="AboutUs">
      <div className="descriptionInnerContainer">
        <h2 className="descriptionHeader">{header}</h2>
        <p className="descriptionBody">{body}</p>
      </div>
    </section>
  );
};

export default DescriptionSection;
