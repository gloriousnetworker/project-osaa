import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home page correctly', () => {
  render(<Home />);
  const heading = screen.getByText(/Welcome to Token Interaction/i);
  expect(heading).toBeInTheDocument();
});
