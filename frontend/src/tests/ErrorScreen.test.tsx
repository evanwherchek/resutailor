import { render, fireEvent, screen } from '@testing-library/react';
import ErrorScreen from '../stages/ErrorScreen';

describe('ErrorScreen', () => {
  const mockTryAgainClick = jest.fn();

  it('renders without crashing', () => {
    render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
  });

  it('displays default status and message when response is null', () => {
    render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
    expect(screen.getByText('Response 200')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('calls tryAgainClick when the Try again button is clicked', () => {
    render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
    fireEvent.click(screen.getByText('Try again'));
    expect(mockTryAgainClick).toHaveBeenCalled();
  });
});
