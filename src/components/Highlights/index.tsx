import Link from 'next/link';
import './styles.scss';
import { IHighLights } from '@/types';

export default function Highlight({
  highlightsData,
  highlightSubTitle,
  contactBrokerageCtaLabel,
  contactBrokerageCtaLink,
}: IHighLights) {
  return (
    <div className="highlights-outer-container" id="Highlights">
      <div className="highlights-title-sub-section">
        <h2 className="highlights-title">Highlights</h2>
        {highlightSubTitle && <p className="highlights-sub-title">{highlightSubTitle}</p>}
      </div>
      <div className="highlights-grid">
        {highlightsData?.map((item) => (
          <div key={item.key} className="highlights-card">
            <p className="highlights-value">{item.value}</p>
            <p className="highlights-description">{item.key}</p>
          </div>
        ))}
      </div>
      {contactBrokerageCtaLink && (
        <Link className="highlights-button" href={contactBrokerageCtaLink} target="_blank" aria-label={contactBrokerageCtaLabel}>
          {contactBrokerageCtaLabel}
        </Link>
      )}
    </div>
  );
}
