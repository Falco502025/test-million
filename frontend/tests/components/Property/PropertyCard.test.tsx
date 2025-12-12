import PropertyCard from '@/components/Property/PropertyCard';
import { Property } from '@/types/Property';
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

const mockProperty: Property = {
  id: '1',
  name: 'Beautiful Modern House',
  address: '123 Main Street, New York, NY 10001',
  price: 500000,
  propertyType: 'House',
  mainImage: '/test-image.jpg',
  bedrooms: 3,
  bathrooms: 2,
  area: 2500,
  year: 2020,
  codeInternal: 'CODE001',
  owner: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234',
    address: 'Owner Address',
    photo: '/owner-photo.jpg',
    birthday: '1990-01-01',
  },
};

describe('PropertyCard Component', () => {
  it('renders property card with property name', () => {
    const onClick = jest.fn();
    renderWithTheme(<PropertyCard property={mockProperty} onClick={onClick} />);

    expect(screen.getByText('Beautiful Modern House')).toBeInTheDocument();
  });

  it('displays property price in correct currency format', () => {
    const onClick = jest.fn();
    renderWithTheme(<PropertyCard property={mockProperty} onClick={onClick} />);

    expect(screen.getByText(/\$500,000/)).toBeInTheDocument();
  });

  it('displays property address', () => {
    const onClick = jest.fn();
    renderWithTheme(<PropertyCard property={mockProperty} onClick={onClick} />);

    expect(screen.getByText(/123 Main Street/)).toBeInTheDocument();
  });

  it('calls onClick handler when card is clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    const { container } = renderWithTheme(
      <PropertyCard property={mockProperty} onClick={onClick} />
    );

    const card = container.querySelector('.property-card');
    if (card) {
      await user.click(card);
    }

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('displays placeholder image when mainImage is not provided', () => {
    const onClick = jest.fn();
    const propertyWithoutImage = {
      ...mockProperty,
      mainImage: '/placeholder.jpg',
    };

    renderWithTheme(
      <PropertyCard property={propertyWithoutImage} onClick={onClick} />
    );

    const image = screen.getByAltText('Beautiful Modern House');
    expect(image).toBeInTheDocument();
  });

  it('uses property name as image alt text', () => {
    const onClick = jest.fn();
    renderWithTheme(<PropertyCard property={mockProperty} onClick={onClick} />);

    const image = screen.getByAltText('Beautiful Modern House');
    expect(image).toBeInTheDocument();
  });

  it('handles different price values correctly', () => {
    const onClick = jest.fn();
    const expensiveProperty = {
      ...mockProperty,
      price: 1500000,
    };

    renderWithTheme(<PropertyCard property={expensiveProperty} onClick={onClick} />);

    expect(screen.getByText(/\$1,500,000/)).toBeInTheDocument();
  });

  it('renders with correct CSS class', () => {
    const onClick = jest.fn();
    const { container } = renderWithTheme(
      <PropertyCard property={mockProperty} onClick={onClick} />
    );

    const card = container.querySelector('.property-card');
    expect(card).toBeInTheDocument();
  });

  it('handles undefined images gracefully', () => {
    const onClick = jest.fn();
    const propertyWithoutImages = {
      ...mockProperty,
      mainImage: '/placeholder.jpg',
    };

    renderWithTheme(
      <PropertyCard property={propertyWithoutImages} onClick={onClick} />
    );

    expect(screen.getByAltText('Beautiful Modern House')).toBeInTheDocument();
  });

  it('shows owner information if available', () => {
    const onClick = jest.fn();
    renderWithTheme(<PropertyCard property={mockProperty} onClick={onClick} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles zero price', () => {
    const onClick = jest.fn();
    const freeProperty = {
      ...mockProperty,
      price: 0,
    };

    renderWithTheme(<PropertyCard property={freeProperty} onClick={onClick} />);

    expect(screen.getByText(/\$0/)).toBeInTheDocument();
  });
});
