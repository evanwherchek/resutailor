import { render, fireEvent, screen } from '@testing-library/react';
import EnterUrl from '../stages/EnterUrl';

describe('EnterUrl', () => {
  const mockSetUrl = jest.fn();
  const mockFindSkillsClick = jest.fn();
  const mockCopyAndPasteClick = jest.fn();
  
  it('renders without crashing', () => {
    render(<EnterUrl findSkillsClick={mockFindSkillsClick} copyAndPasteClick={mockCopyAndPasteClick} url="" setUrl={mockSetUrl} />);
  });

  it('calls setUrl when the input value is changed', () => {
    render(<EnterUrl findSkillsClick={mockFindSkillsClick} copyAndPasteClick={mockCopyAndPasteClick} url="" setUrl={mockSetUrl} />);
    fireEvent.change(screen.getByLabelText('Job posting URL'), { target: { value: 'test' } });
    expect(mockSetUrl).toHaveBeenCalledWith('test');
  });

  it('calls findSkillsClick when a valid url is entered', () => {
    render(<EnterUrl findSkillsClick={mockFindSkillsClick} copyAndPasteClick={mockCopyAndPasteClick} url="https://example.com" setUrl={mockSetUrl} />);
    fireEvent.click(screen.getByText('Find skills'));
    expect(mockFindSkillsClick).toHaveBeenCalled();
  });

  it('calls copyAndPasteClick when the Copy and paste button is clicked', () => {
    render(<EnterUrl findSkillsClick={mockFindSkillsClick} copyAndPasteClick={mockCopyAndPasteClick} url="" setUrl={mockSetUrl} />);
    fireEvent.click(screen.getByText('Copy and paste instead'));
    expect(mockCopyAndPasteClick).toHaveBeenCalled();
  });

  it('shows an error message when an invalid url is entered', () => {
    render(<EnterUrl findSkillsClick={mockFindSkillsClick} copyAndPasteClick={mockCopyAndPasteClick} url="invalid url" setUrl={mockSetUrl} />);
    fireEvent.click(screen.getByText('Find skills'));
    expect(screen.getByText('Please enter a valid URL.')).toBeInTheDocument();
  });
});