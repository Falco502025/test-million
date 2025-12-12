import { formatDate, formatPrice, truncateText } from '@/utils/formatters';

describe('formatters - formatPrice function', () => {
  it('formats price with USD currency', () => {
    const result = formatPrice(500000);
    expect(result).toBe('$500,000.00');
  });

  it('formats price with decimal values', () => {
    const result = formatPrice(1234.56);
    expect(result).toBe('$1,234.56');
  });

  it('formats zero price', () => {
    const result = formatPrice(0);
    expect(result).toBe('$0.00');
  });

  it('formats large prices with proper comma separation', () => {
    const result = formatPrice(9999999.99);
    expect(result).toBe('$9,999,999.99');
  });

  it('formats small prices', () => {
    const result = formatPrice(99.99);
    expect(result).toBe('$99.99');
  });

  it('handles negative prices', () => {
    const result = formatPrice(-500);
    expect(result).toContain('-');
  });
});

describe('formatters - formatDate function', () => {
  it('formats date correctly', () => {
    const date = new Date(Date.UTC(2024, 0, 15));
    const result = formatDate(date);
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d{2}\/\d{2}\/2024/);
  });

  it('formats current date', () => {
    const date = new Date();
    const result = formatDate(date);
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it('formats date string input', () => {
    const result = formatDate('2024-01-15');
    expect(result).toBeTruthy();
  });

  it('handles date edge cases', () => {
    const date = new Date(Date.UTC(2024, 11, 31));
    const result = formatDate(date);
    expect(result).toBeTruthy();
  });

  it('formats early dates correctly', () => {
    const date = new Date(Date.UTC(2000, 0, 1));
    const result = formatDate(date);
    expect(result).toBeTruthy();
  });
});

describe('formatters - truncateText function', () => {
  it('truncates text longer than maxLength', () => {
    const text = 'This is a very long text that needs to be truncated';
    const result = truncateText(text, 20);
    expect(result.length).toBeLessThanOrEqual(23); // 20 + ellipsis
    expect(result).toContain('...');
  });

  it('does not truncate text shorter than maxLength', () => {
    const text = 'Short text';
    const result = truncateText(text, 20);
    expect(result).toBe('Short text');
  });

  it('handles exact length text', () => {
    const text = 'Exactly twenty chars!!';
    const result = truncateText(text, 23);
    expect(result).toBe('Exactly twenty chars!!');
  });

  it('truncates with default maxLength', () => {
    const text = 'A'.repeat(200);
    const result = truncateText(text);
    expect(result.length).toBeLessThanOrEqual(103); // default + ellipsis
    expect(result).toContain('...');
  });

  it('handles empty string', () => {
    const result = truncateText('', 10);
    expect(result).toBe('');
  });

  it('handles text with special characters', () => {
    const text = 'Text with @#$% special !@#$ characters';
    const result = truncateText(text, 20);
    expect(result.length).toBeLessThanOrEqual(23);
  });

  it('preserves spaces in truncation', () => {
    const text = 'This is a very long sentence with many words';
    const result = truncateText(text, 15);
    expect(result).toBeTruthy();
    expect(result).toContain('...');
  });

  it('handles single character', () => {
    const result = truncateText('A', 1);
    expect(result).toBe('A');
  });

  it('handles very small maxLength', () => {
    const text = 'Testing truncation';
    const result = truncateText(text, 3);
    expect(result.length).toBeLessThanOrEqual(6); // 3 + ellipsis
  });
});
