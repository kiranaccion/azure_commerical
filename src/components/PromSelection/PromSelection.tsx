import './styles.scss';

import { ClickAwayListener } from '@mui/material';
import { useState } from 'react';

export interface IPromSelection {
  selectOptions: any;
  defaultValue: number;
  handleSelectValueChange: any;
}

const PromSelection = ({ selectOptions, defaultValue, handleSelectValueChange }: IPromSelection) => {
  const [isDropDownVisible, setisDropDownVisible] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<any>(defaultValue || null);

  const handleSelectOption = (index: number) => {
    setSelectedItem(selectOptions[index].value);
    handleSelectValueChange(selectOptions[index].value);
    setisDropDownVisible(false);
  };

  return (
    <div tabIndex={0} className={`custom-dropdown ${isDropDownVisible ? 'custom-dropdown-active' : ''}`}>
      <div
        className={'custom-dropdown-selection ' + (isDropDownVisible ? 'visible' : '')}
        onClick={() => setisDropDownVisible(!isDropDownVisible)}
        onKeyDown={(event: any) => {
          if (event.keyCode == 13) {
            setisDropDownVisible(!isDropDownVisible);
          }
        }}
        // onKeyPress={() => setisDropDownVisible(!isDropDownVisible)}
        role="button"
        tabIndex={0}
      >
        <p style={{ wordBreak: 'normal', whiteSpace: 'normal', marginBottom: '0', width: '80%' }} className="dropdown-text">
          {selectedItem !== null ? selectedItem : 'Choose and option below'}
        </p>
      </div>

      {isDropDownVisible ? (
        <ClickAwayListener onClickAway={() => setisDropDownVisible(false)}>
          <div className="select-items">
            {selectOptions.map((item: any, index: number) => (
              <div
                key={item.value}
                className={`dropdown-item ${selectedItem === item.value ? 'dropdown-selected-item' : ''}`}
                onClick={() => handleSelectOption(index)}
                onKeyDown={(event: any) => {
                  if (event.keyCode === 13) {
                    handleSelectOption(index);
                  }
                }}
                role="option"
                aria-selected={item.label}
                tabIndex={0}
              >
                <p style={{ wordBreak: 'normal', whiteSpace: 'normal', marginBottom: '0' }} className="dropdown-text">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </ClickAwayListener>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PromSelection;
