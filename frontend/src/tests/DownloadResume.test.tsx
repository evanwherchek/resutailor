import { render, fireEvent, screen } from '@testing-library/react';
import DownloadResume from '../stages/DownloadResume';

describe('DownloadResume', () => {
  it('renders the main text', () => {
    render(<DownloadResume newResumeClick={() => {}} file={null} />);
    expect(screen.getByText('All done!')).toBeInTheDocument();
  });

  it('calls the newResumeClick function when the new resume button is clicked', () => {
    const newResumeClickMock = jest.fn();
    render(<DownloadResume newResumeClick={newResumeClickMock} file={null} />);
    fireEvent.click(screen.getByText('New resume'));
    expect(newResumeClickMock).toHaveBeenCalled();
  });
});
