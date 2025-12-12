import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

interface FilterFormProps {
  name: string;
  address: string;
  minPrice?: number;
  maxPrice?: number;
  onNameChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onMinPriceChange: (value: number | undefined) => void;
  onMaxPriceChange: (value: number | undefined) => void;
  onSearch: () => void;
  onReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  name,
  address,
  minPrice,
  maxPrice,
  onNameChange,
  onAddressChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSearch,
  onReset,
}) => {
  const [localName, setLocalName] = useState(name);
  const [localAddress, setLocalAddress] = useState(address);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  const handleSearch = () => {
    onNameChange(localName);
    onAddressChange(localAddress);
    onMinPriceChange(localMinPrice);
    onMaxPriceChange(localMaxPrice);
    onSearch();
  };

  const handleReset = () => {
    setLocalName('');
    setLocalAddress('');
    setLocalMinPrice(undefined);
    setLocalMaxPrice(undefined);
    onReset();
  };

  return (
    <Box className="filter-form-container" sx={{ bgcolor: 'background.paper' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: '100%' }}>
        <Box className="filter-form-field">
          <FormControl fullWidth>
            <FormLabel className="mb-1">Property Name</FormLabel>
            <TextField
              size="small"
              placeholder="Search by name..."
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Box>

        <Box className="filter-form-field">
          <FormControl fullWidth>
            <FormLabel className="mb-1">Address</FormLabel>
            <TextField
              size="small"
              placeholder="Search by address..."
              value={localAddress}
              onChange={(e) => setLocalAddress(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Box>

        <Box className="filter-form-field-small">
          <FormControl fullWidth>
            <FormLabel className="mb-1">Min Price ($)</FormLabel>
            <TextField
              size="small"
              type="number"
              placeholder="0"
              value={localMinPrice || ''}
              onChange={(e) =>
                setLocalMinPrice(e.target.value ? Number.parseInt(e.target.value) : undefined)
              }
              fullWidth
            />
          </FormControl>
        </Box>

        <Box className="filter-form-field-small">
          <FormControl fullWidth>
            <FormLabel className="mb-1">Max Price ($)</FormLabel>
            <TextField
              size="small"
              type="number"
              placeholder="Max"
              value={localMaxPrice || ''}
              onChange={(e) =>
                setLocalMaxPrice(e.target.value ? Number.parseInt(e.target.value) : undefined)
              }
              fullWidth
            />
          </FormControl>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} className="filter-form-button-group">
          <Button
            variant="contained"
            size="small"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            className="filter-button"
          >
            Search
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleReset}
            className="filter-button"
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
  
  export default FilterForm;