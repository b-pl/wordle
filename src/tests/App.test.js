import { render, screen } from '@testing-library/react';
import App from '../core/App';

test('renders Hello World', () => {
  render(<App />);
  const textElement = screen.getByText(/Łordl/i);
  expect(textElement).toBeInTheDocument();
});
