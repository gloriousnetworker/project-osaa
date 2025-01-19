import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Transfer from './Transfer';
import { toast } from 'react-toastify';

// Mocking the toast notification
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Transfer Component', () => {
  it('renders transfer form correctly', () => {
    render(<Transfer />);
    expect(screen.getByLabelText('Recipient Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Transfer Amount')).toBeInTheDocument();
  });

  it('shows error for invalid input or insufficient balance', async () => {
    render(<Transfer />);

    fireEvent.change(screen.getByLabelText('Recipient Address'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Transfer Amount'), { target: { value: '10' } });

    fireEvent.click(screen.getByText('Transfer Tokens'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please provide a valid recipient address!');
    });
  });

  it('successfully transfers tokens with valid data', async () => {
    render(<Transfer />);

    fireEvent.change(screen.getByLabelText('Recipient Address'), { target: { value: '0x456' } });
    fireEvent.change(screen.getByLabelText('Transfer Amount'), { target: { value: '100' } });

    fireEvent.click(screen.getByText('Transfer Tokens'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Successfully transferred 100 tokens!');
    });
  });
});
