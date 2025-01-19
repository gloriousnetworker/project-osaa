import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Mint from './Mint';
import { toast } from 'react-toastify';

// Mocking the toast notification
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Mint Component', () => {
  it('renders mint form correctly', () => {
    render(<Mint />);
    expect(screen.getByLabelText('Token Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Recipient Address')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(<Mint />);

    fireEvent.change(screen.getByLabelText('Token Amount'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Recipient Address'), { target: { value: '0x123' } });

    fireEvent.click(screen.getByText('Mint Tokens'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Tokens successfully minted!');
    });
  });

  it('shows error when form is invalid', async () => {
    render(<Mint />);

    fireEvent.change(screen.getByLabelText('Token Amount'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Recipient Address'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Mint Tokens'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to mint tokens. Check your inputs.');
    });
  });
});
