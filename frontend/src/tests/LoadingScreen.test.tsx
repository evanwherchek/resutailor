import { render } from '@testing-library/react';
import LoadingScreen from '../stages/LoadingScreen';

describe('LoadingScreen', () => {
  it('renders without crashing', () => {
    render(<LoadingScreen />);
  });
});
