import { render, fireEvent } from '@testing-library/react';
import DownloadResume from '../stages/DownloadResume';

describe('DownloadResume', () => {
  it('renders the main text', () => {
    const { getByText } = render(<DownloadResume newResumeClick={() => {}} file={null} />);
    expect(getByText('All done!')).toBeInTheDocument();
  });

  it('calls the newResumeClick function when the new resume button is clicked', () => {
    const newResumeClickMock = jest.fn();
    const { getByText } = render(<DownloadResume newResumeClick={newResumeClickMock} file={null} />);
    fireEvent.click(getByText('New resume'));
    expect(newResumeClickMock).toHaveBeenCalled();
  });
});