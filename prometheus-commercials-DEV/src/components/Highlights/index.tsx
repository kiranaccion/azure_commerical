import './styles.scss';
import { PropertyHighlight } from '@/types';

export default function Highlight({highlightsData}: {highlightsData: PropertyHighlight[]}) {
  return (
    <div className="highlights-outer-container" id="Highlights">
      <h2 className="highlights-title">Highlights</h2>
      <div className="highlights-grid">
        {highlightsData.map((item, index) => (
          <div key={index} className="highlights-card">
            <p className="highlights-value">{item.value}</p>
            <p className="highlights-description">{item.description}</p>
          </div>
        ))}
      </div>
      <button className="highlights-button">Contact Brokerage</button>
    </div>
  );
}
