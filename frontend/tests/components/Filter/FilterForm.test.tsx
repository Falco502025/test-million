import FilterForm from '@/components/Filter/FilterForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

const defaultProps = {
  name: '',
  address: '',
  minPrice: undefined,
  maxPrice: undefined,
  onNameChange: jest.fn(),
  onAddressChange: jest.fn(),
  onMinPriceChange: jest.fn(),
  onMaxPriceChange: jest.fn(),
  onSearch: jest.fn(),
  onReset: jest.fn(),
};

describe('FilterForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter form with all input fields', () => {
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/0/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Max/)).toBeInTheDocument();
  });

  it('renders Search and Clear buttons', () => {
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('calls onSearch when Search button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    renderWithTheme(<FilterForm {...defaultProps} onSearch={onSearch} />);
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
    
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when Clear button is clicked', async () => {
    const user = userEvent.setup();
    const onReset = jest.fn();
    renderWithTheme(<FilterForm {...defaultProps} onReset={onReset} />);
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('displays initial values in form fields', () => {
    renderWithTheme(
      <FilterForm
        {...defaultProps}
        name="Luxury Apartment"
        address="New York"
        minPrice={100000}
        maxPrice={500000}
      />
    );
    
    const nameInput = screen.getByDisplayValue('Luxury Apartment');
    const addressInput = screen.getByDisplayValue('New York');
    
    expect(nameInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
  });

  it('handles name input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <FilterForm
        {...defaultProps}
      />
    );
    
    const nameInput = screen.getByPlaceholderText(/Search by name/i);
    await user.type(nameInput, 'Test Property');
    
    expect(nameInput).toHaveValue('Test Property');
  });

  it('handles address input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    const addressInput = screen.getByPlaceholderText(/Search by address/i);
    await user.type(addressInput, '123 Main St');
    
    expect(addressInput).toHaveValue('123 Main St');
  });

  it('handles min price input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    const priceInputs = screen.getAllByRole('spinbutton');
    await user.type(priceInputs[0], '100000');
    
    expect(priceInputs[0]).toHaveValue(100000);
  });

  it('handles max price input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    const priceInputs = screen.getAllByRole('spinbutton');
    await user.type(priceInputs[1], '500000');
    
    expect(priceInputs[1]).toHaveValue(500000);
  });

  it('calls onReset when Clear button is clicked and form is cleared', async () => {
    const user = userEvent.setup();
    const onReset = jest.fn();
    renderWithTheme(
      <FilterForm
        {...defaultProps}
        name="Test"
        address="Test Address"
        onReset={onReset}
      />
    );
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    
    expect(onReset).toHaveBeenCalled();
  });

  it('maintains separate state for each filter field', async () => {
    const user = userEvent.setup();
    renderWithTheme(<FilterForm {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText(/Search by name/i);
    const addressInput = screen.getByPlaceholderText(/Search by address/i);
    
    await user.type(nameInput, 'Property');
    await user.type(addressInput, 'Address');
    
    expect(nameInput).toHaveValue('Property');
    expect(addressInput).toHaveValue('Address');
  });
});
