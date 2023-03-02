import { render, screen } from '@testing-library/react';
import Button from '../Button';

test('renders button component with correct text', () => {
  const text = 'Click Me';
  render(<Button text={text} />);
  const buttonElement = screen.getByText(text);
  expect(buttonElement).toBeInTheDocument();
});
