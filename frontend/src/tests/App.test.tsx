import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders correctly', () => {
    render(<App />);

    expect(screen.getByTestId('parent')).toBeInTheDocument();
  });
});
