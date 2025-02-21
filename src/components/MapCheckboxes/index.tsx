import './styles.scss';

interface MapCheckboxesProps {
  checkedItems: Record<string, boolean>;
  toggleCheckbox: (id: string) => void;
  disabledCheckbox?: string | null;
}

const MapCheckboxes = ({ checkedItems, toggleCheckbox, disabledCheckbox = null }: MapCheckboxesProps) => {
  const checkboxes = [
    { id: 'apartments', label: 'Apartments', color: '#FFFFFF', border: '1px solid #DC440A' },
    { id: 'office', label: 'Office', color: '#91D0DF', border: '1px solid #00A8BF' },
    { id: 'retail', label: 'Retail', color: '#8F9C99', border: '1px solid #1C3C34' },
  ];

  return (
    <div className="checkboxes-container">
      {checkboxes.map(({ id, label, color, border }) => {
        const isDisabled = disabledCheckbox === id;
        return (
          <label
            key={id}
            htmlFor={id}
            className={`checkbox-item ${isDisabled ? 'disabled' : ''}`}
            style={{
              opacity: isDisabled ? 0.5 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            <input
              type="checkbox"
              id={id}
              className="checkbox-input"
              onChange={() => toggleCheckbox(id)}
              checked={isDisabled || !!checkedItems[id]}
              disabled={isDisabled}
            />
            <span
              className="checkbox-label"
              style={{
                backgroundColor: color,
                borderRadius: '2px',
                border: border,
              }}
            >
              {checkedItems[id] && (
                <span className="checkmark">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.1667 1.5L4.83333 8.83333L1.5 5.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </span>
            <span className="checkbox-text">{label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default MapCheckboxes;
