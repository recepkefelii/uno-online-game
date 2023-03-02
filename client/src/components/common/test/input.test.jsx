import { render, screen } from '@testing-library/react';
import Input from '../Input';

test('renders input component with correct placeholder', () => {
  const placeholder = 'Username';
  render(<Input placeholder={placeholder} />);
  const inputElement = screen.getByPlaceholderText(placeholder);
  expect(inputElement).toBeInTheDocument();
});
