import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  beforeEach(() => {
    // Mock window.ethereum to simulate MetaMask
    global.ethereum = {
      request: jest.fn().mockResolvedValue(['0x1234567890abcdef1234567890abcdef12345678']),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders home page with connect wallet button', () => {
    render(<Home />);

    // Ensure the "Connect Wallet" button is rendered
    const connectButton = screen.getByText(/Connect Wallet/i);
    expect(connectButton).toBeInTheDocument();
  });

  test('connect wallet button connects wallet and shows account address', async () => {
    render(<Home />);

    // Find and click the "Connect Wallet" button
    const connectButton = screen.getByText(/Connect Wallet/i);
    fireEvent.click(connectButton);

    // Wait for the account to be set
    await waitFor(() => {
      // Ensure that the button text changes to the connected account (with shortened address)
      expect(connectButton.textContent).toBe('Connected: 0x1234...5678');
    });

    // Ensure the connect function is called
    expect(global.ethereum.request).toHaveBeenCalledWith({
      method: 'eth_requestAccounts',
    });
  });

  test('shows error if MetaMask is not installed', () => {
    // Remove ethereum object to simulate MetaMask not being installed
    delete global.ethereum;

    render(<Home />);

    const connectButton = screen.getByText(/Connect Wallet/i);
    fireEvent.click(connectButton);

    // Check if alert is shown for MetaMask not being installed
    expect(window.alert).toHaveBeenCalledWith('MetaMask is not installed!');
  });
});
