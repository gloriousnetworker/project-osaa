import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

// Mocking window.ethereum
global.ethereum = {
  request: jest.fn().mockResolvedValue(['0x1234']),
};

describe('Home Component', () => {
  it('renders correctly and shows connect wallet button', () => {
    render(<Home />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('connects wallet and displays account address', async () => {
    render(<Home />);
    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);
    
    await waitFor(() => {
      expect(screen.getByText('Connected: 0x1234')).toBeInTheDocument();
    });
  });
});
