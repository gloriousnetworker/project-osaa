import { render, screen } from '@testing-library/react';
import Balance from './Balance';

describe('Balance Component', () => {
  it('renders balance correctly', () => {
    render(<Balance balance={1000} />);

    expect(screen.getByText('Wallet Balance: 1000 Tokens')).toBeInTheDocument();
  });

  it('shows updated balance after a transfer', () => {
    render(<Balance balance={500} />);
    
    expect(screen.getByText('Wallet Balance: 500 Tokens')).toBeInTheDocument();
  });
});
