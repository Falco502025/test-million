import HeroSection from '@/components/Home/HeroSection';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('HeroSection Component', () => {
  it('renders the main title', () => {
    renderWithTheme(<HeroSection totalCount={100} />);
    const title = screen.getByRole('heading', { name: /find your perfect property/i });
    expect(title).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderWithTheme(<HeroSection totalCount={50} />);
    const subtitle = screen.getByText(/discover amazing properties/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('displays correct property count in description', () => {
    renderWithTheme(<HeroSection totalCount={250} />);
    const description = screen.getByText(/browse through 250\+ premium properties/i);
    expect(description).toBeInTheDocument();
  });

  it('displays zero count when totalCount is 0', () => {
    renderWithTheme(<HeroSection totalCount={0} />);
    const description = screen.getByText(/browse through 0\+ premium properties/i);
    expect(description).toBeInTheDocument();
  });

  it('displays negative count as zero', () => {
    renderWithTheme(<HeroSection totalCount={-5} />);
    const description = screen.getByText(/browse through -5\+ premium properties/i);
    expect(description).toBeInTheDocument();
  });

  it('has correct CSS classes', () => {
    const { container } = renderWithTheme(<HeroSection totalCount={100} />);
    const heroSection = container.querySelector('.hero-section');
    expect(heroSection).toBeInTheDocument();
  });

  it('updates when totalCount prop changes', () => {
    const { rerender } = renderWithTheme(<HeroSection totalCount={100} />);
    expect(screen.getByText(/browse through 100\+ premium properties/i)).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <HeroSection totalCount={500} />
      </ThemeProvider>
    );
    expect(screen.getByText(/browse through 500\+ premium properties/i)).toBeInTheDocument();
  });
});
