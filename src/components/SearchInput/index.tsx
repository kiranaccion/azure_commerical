import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { TangoSearchIcon } from '../SVGs';
import './styles.scss';
import { locations } from '@/constants';

interface SearchInputProps {
  expandLocations?: boolean;
}

const SearchInput = ({ expandLocations = true }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="search-input-container">
      <TextField
        placeholder="Search by City, Zip, or Property Name"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        onFocus={() => setShowDropdown(true)}
        className="text-field"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <TangoSearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {showDropdown && expandLocations && (
        <div className="dropdown-container">
          <p className="dropdown-header">Locations</p>
          <div className="dropdown-links">
            {locations.map((location) => (
              <Link
                key={location}
                href={`/search?term=${encodeURIComponent(location)}`}
                className={location === searchTerm ? 'active' : ''}
                onClick={() => {
                  setSearchTerm(location);
                  setShowDropdown(false);
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
  );
};

export default SearchInput;
