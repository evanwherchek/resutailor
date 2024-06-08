import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  });

  test('renders correctly', () => {
    expect(screen.getByTestId('parent').parentElement).toBeInTheDocument();
  })
});
