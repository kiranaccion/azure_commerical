import { ClickAwayListener } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import _ from 'lodash';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import searchLocation from '/public/searchLocation.png';
import searchNeighbourhood from '/public/searchNeighbourhood.png';
import searchOfficeIcon from '/public/OfficeSearchIcon3.svg';
import searchRetailIcon from '/public/RetailSearchIcon3.svg';
import { axiosClient } from '@/lib/api/fetchAxios';
import PromLoaderSpinner from '../PromLoader/PromLoaderSpinner';
import { SearchIcon, TangoSearchIcon } from '../SVGs';
import { defaultSearchTerm, locations } from '@/constants';
import { urls } from '@/lib/api/urlBuilders';
import './styles.scss';
import Image from 'next/image';

/* eslint-disable react-hooks/exhaustive-deps */
export interface IAutocompleteProps {
  enableLocations?: boolean;
  pageLocation?: string;
  handleOnSearch?: (keyword: string, results: unknown[]) => void;
  handleOnSelect?: (result: unknown, isFreeText: boolean) => void;
  handleClickAway?: any;
  autoFocus?: boolean;
  placeholder?: string;
  expandOnHover?: boolean;
  page?: string;
  autoComplete?: boolean;
  homePage?: boolean;
  setShowSearchBar?: (value: boolean) => void;
  handleLoader?: (value: boolean) => void;
}

const MuiAutocomplete = ({
  handleOnSearch,
  handleOnSelect,
  handleClickAway,
  autoFocus = false,
  enableLocations = false,
  pageLocation = '',
  placeholder = 'Search by City, Zip, or Property Name',
  expandOnHover = false,
  page = 'autoComplete',
  autoComplete = true,
  homePage = false,
  setShowSearchBar,
  handleLoader,
}: IAutocompleteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const term = searchParams.get('term');
  const [searchVal, setSearchval] = useState<any>({
    // field: '',
    id: '',
    highlight: '',
    name: '',
  });

  const [additionalProps, setAdditionalProps] = useState<any>({
    autoFocus: autoFocus,
    fullWidth: true,
    freeSolo: true,
    clearOnBlur: false,
    forcePopupIcon: false,
    autoComplete: true,
    autoSelect: false,
  });
  const [dropdownItems, setdropdownItems] = useState<any>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(!expandOnHover);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnterPressed, setIsEnterPressed] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isInputActive, setIsInputActive] = useState(false);

  const handleOnChange = (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => {
    setSearchval({
      // field: '',
      id: value === '' ? defaultSearchTerm : value,
      highlight: `<em>${value === '' ? defaultSearchTerm : value}</em>`,
      name: value === '' ? defaultSearchTerm : value,
    });
  };

  const handleOnClick = (where: string, event: any, value: any, reason: string, details?: string) => {
    let newVal = { ...searchVal };

    const isEnter = checkIsEnter(reason, value);
    setIsEnterPressed(isEnter);
    setIsLoading(reason !== 'clear');

    if (['blur', 'createOption', 'clear', 'Enter'].includes(reason)) {
      newVal = handleReasonBlurClearEnter(newVal, reason, value);
    }

    if (reason === 'Enter') {
      handleLoader?.(true);
      closeAdditionalProps();
    }

    if (reason === 'selectOption') {
      newVal = handleReasonSelectOption(value);
    }

    setSearchval(newVal);

    if (handleOnSelect && reason !== 'clear') {
      handleOnSelect(newVal, typeof value === 'string');
    }
  };

  // Helper functions
  const checkIsEnter = (reason: string, value: any) => {
    return reason === 'Enter' || (value && ['neighborhood', 'location', 'office', 'retail'].includes(value['type']));
  };

  const handleReasonBlurClearEnter = (newVal: any, reason: string, value: any) => {
    if (reason !== 'clear' && value === '') {
      newVal.id = defaultSearchTerm;
      newVal.highlight = `<em>${defaultSearchTerm}</em>`;
      newVal.name = defaultSearchTerm;
    } else {
      const val = reason === 'clear' ? '' : value;
      newVal.id = val;
      newVal.highlight = `<em>${val}</em>`;
      newVal.name = val;
    }
    return newVal;
  };

  const closeAdditionalProps = () => {
    setAdditionalProps((prev: any) => ({ ...prev, open: false }));
  };

  const handleReasonSelectOption = (value: any) => {
    let newVal = { ...value };

    switch (value.type) {
      case 'neighborhood':
        takeToNeighborHood(newVal);
        break;
      case 'office':
      case 'retail':
        takeToCommercials(newVal);
        break;
      default:
        taketoSearch(newVal);
        handleLoader?.(true);
        break;
    }

    if (setShowSearchBar) {
      setShowSearchBar(false);
    }

    return newVal;
  };

  const takeToNeighborHood = (value: any) => {
    if (value.id) {
      const url: string = `${urls['retrieveApartmentName']}${value.id}`;
      axiosClient
        .get(url)
        .then((res: any) => {
          if (res?.data?.items) {
            const [item] = res.data.items;
            if (item && item.fields && item.fields.stateCode && item.fields.cityPageSlug && item.fields.slug) {
              const targetUrl = `${process.env.NEXT_PUBLIC_APARTMENTS_URL}/${item.fields.stateCode}/${item.fields.cityPageSlug}/${item.fields.slug}`;
              // Open in a new tab
              window.open(targetUrl, '_blank');
              setIsLoading(false);
            } else {
              if (isEnterPressed) {
                taketoSearch(value);
              }
            }
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsEnterPressed(false);
        });
    }
  };

  const taketoSearch = (dropdownVal: any = searchVal) => {
    const routePath: string = `/search?term=${
      dropdownVal.name === '' || dropdownVal.name === undefined ? defaultSearchTerm : dropdownVal.name
    }&office=true&retail=true`;
    if (pathname !== routePath) {
      router.push(routePath);
    }
    setIsLoading(false);
    setIsEnterPressed(false);
  };

  const takeToCommercials = (value: any) => {
    if (value && value.type && value.id) {
      const targetUrl = `/${value.type}/${value.id}`;
      console.log(`Navigating to ${targetUrl}`);
      router.push(targetUrl);
    } else {
      console.error('Invalid value passed to takeToCommercials:', value);
    }
    setIsLoading(false);
    setIsEnterPressed(false);
    setShowSearchBar && setShowSearchBar(false);
  };

  const onMouseOver = () => {
    setIsSearchExpanded(true);
  };

  const onMouseLeave = () => {
    if (expandOnHover) {
      setIsSearchExpanded(false);
    }
  };

  useEffect(() => {
    if (term !== searchVal.name) {
      let newVal = { ...searchVal };
      newVal.name = term || '';
      setSearchval(newVal);
    }
  }, [term]);

  const getOptionsDelayed = useCallback(
    _.debounce((query: string, callback: (options: any) => void) => {
      if (query && query !== '' && autoComplete !== false) {
        setIsLoading(true);
        axiosClient
          .get(`${urls['autoComplete']}?q=${encodeURIComponent(query)}&type=all`)
          .then(callback)
          .catch(() => {
            setIsLoading(false);
          });
        if (handleOnSearch) {
          handleOnSearch(query, []);
        }
      } else {
        setIsLoading(false);
        setdropdownItems([]);
      }
    }, 400),
    []
  );

  useEffect(() => {
    const processOptions = (data: any[]) => {
      let tempNeighborhood: any = null;
      const modifiedData = data.map((item: any) => {
        const newItem = { ...item, id: item.id, name: item.value };
        delete newItem.value;

        if (newItem.type === 'neighborhood' && newItem.name.toLowerCase() === searchVal.name.toLowerCase()) {
          tempNeighborhood = item;
        }

        return newItem;
      });
      return { modifiedData, tempNeighborhood };
    };

    const handleEnterPressed = (neighborhood: any) => {
      switch (searchVal.type) {
        case 'neighborhood':
          takeToNeighborHood(searchVal.type === 'neighborhood' ? searchVal : neighborhood);
          break;
        case 'office':
        case 'retail':
          takeToCommercials(searchVal);
          break;
        default:
          taketoSearch();
          break;
      }
    };

    getOptionsDelayed(searchVal.id, (response) => {
      const { modifiedData, tempNeighborhood } = processOptions(response.data);

      if (isEnterPressed) {
        handleEnterPressed(tempNeighborhood);
      } else {
        setIsLoading(false);
      }

      setdropdownItems(() => modifiedData);
      setShowDropdown(false);
    });
  }, [searchVal, isEnterPressed, getOptionsDelayed]);

  // Function to handle input focus
  const handleInputFocus = () => {
    setShowDropdown(true);
    setIsInputActive(true);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setIsInputActive(false);
  };

  const renderSearchIcon = (type: string) => {
    switch (type) {
      case 'neighborhood':
        return <Image src={searchNeighbourhood.src} alt="Neighborhood" width={24} height={24} />;
      case 'office':
        return <Image src={searchOfficeIcon.src} alt="Office" width={24} height={24} style={{ marginLeft: '-2px' }} />;
      case 'retail':
        return <Image src={searchRetailIcon.src} alt="Retail" width={24} height={24} style={{ marginLeft: '0px' }} />;
      default:
        return <Image src={searchLocation.src} alt="Location" width={24} height={24} />;
    }
  };

  return (
    <div className={`autoCompleteContainer`}>
      <ClickAwayListener
        onClickAway={(a) => {
          if (handleClickAway) {
            handleClickAway(a);
          }
        }}
      >
        <div>
          {isLoading ? (
            <div>
              <PromLoaderSpinner height={20} width={20} />
            </div>
          ) : (
            <div
              onMouseOver={onMouseOver}
              onClick={(e) => {
                if (handleClickAway) {
                  handleClickAway(e);
                }
                setIsLoading(true);
                handleOnClick('native', e, searchVal.name, 'Enter');
              }}
            >
              {isInputActive ? <TangoSearchIcon /> : <SearchIcon />}
            </div>
          )}
          {isSearchExpanded && (
            <>
              <Autocomplete
                // disabled={isLoading}
                selectOnFocus
                name={page}
                onMouseLeave={onMouseLeave}
                disablePortal
                className="completeContainer"
                options={dropdownItems}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                getOptionLabel={(option: any) => (typeof option === 'string' ? option : option?.name || searchVal.name || '')}
                onInputChange={handleOnChange}
                onChange={(event: any, value: any | Array<any>, reason: string, details?: string) =>
                  handleOnClick('mui', event, value, reason, details)
                }
                value={searchVal.name || ''}
                inputValue={searchVal.name || ''}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      // disabled={isLoading}
                      type="text"
                      name={page}
                      id={`customText${page}`}
                      placeholder={placeholder}
                      onKeyDown={(e: any) => {
                        if (e.keyCode === 13) {
                          handleOnClick('native', e, e.target.value, 'Enter');
                        }
                      }}
                      {...params.inputProps}
                      autoFocus={autoFocus}
                    />
                    {showDropdown && enableLocations && (
                      <div className="dropdown-container">
                        <p className="dropdown-header">Locations</p>
                        <div className="dropdown-links">
                          {locations.map((location) => (
                            <Link
                              key={location}
                              href={`/search?term=${encodeURIComponent(location)}&office=true&retail=true`}
                              className={location === term ? 'active' : ''}
                              onClick={() => {
                                setShowDropdown(false);
                                setShowSearchBar && setShowSearchBar(false);
                              }}
                              aria-label={location}
                            >
                              {location}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                role="search"
                renderOption={(props, option: any, { inputValue }) => {
                  const matches = match(option.name, inputValue, { insideWords: true });
                  const parts = parse(option.name, matches);
                  const { key, id, ...restProps } = props;
                  return (
                    <li key={`${key} ${id}`} {...restProps}>
                      <div>
                        <span
                          style={{
                            fontWeight: 700,
                          }}
                        >
                          {renderSearchIcon(option.type)}
                        </span>
                        {parts.map((part, index) => (
                          <span
                            className="autocompleteSearchText"
                            key={part.text}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
                {...additionalProps}
              />
            </>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default MuiAutocomplete;
