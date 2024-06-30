import { render, fireEvent } from '@testing-library/react';
import ErrorScreen from '../stages/ErrorScreen';

describe('ErrorScreen', () => {
  const mockTryAgainClick = jest.fn();

  it('renders without crashing', () => {
    render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
  });

  it('displays default status and message when response is null', () => {
    const { getByText } = render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
    expect(getByText('Response 200')).toBeInTheDocument();
    expect(getByText('OK')).toBeInTheDocument();
  });

  it('calls tryAgainClick when the Try again button is clicked', () => {
    const { getByText } = render(<ErrorScreen tryAgainClick={mockTryAgainClick} response={null} />);
    fireEvent.click(getByText('Try again'));
    expect(mockTryAgainClick).toHaveBeenCalled();
  });
});