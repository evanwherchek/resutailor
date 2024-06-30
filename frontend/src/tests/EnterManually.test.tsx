import { render, fireEvent } from '@testing-library/react';
import EnterManually from '../stages/EnterManually';

describe('EnterManually', () => {
  const mockSetDescription = jest.fn();
  const mockFindSkillsClick = jest.fn();
  const mockBackClick = jest.fn();

  it('renders without crashing', () => {
    render(<EnterManually findSkillsClick={mockFindSkillsClick} backClick={mockBackClick} description="" setDescription={mockSetDescription} />);
  });

  it('calls setDescription when the input value is changed', () => {
    const { getByLabelText } = render(<EnterManually findSkillsClick={mockFindSkillsClick} backClick={mockBackClick} description="" setDescription={mockSetDescription} />);
    fireEvent.change(getByLabelText('Job description'), { target: { value: 'test' } });
    expect(mockSetDescription).toHaveBeenCalledWith('test');
  });

  it('calls findSkillsClick when a valid description is entered', () => {
    const { getByText } = render(<EnterManually findSkillsClick={mockFindSkillsClick} backClick={mockBackClick} description="This is a job description" setDescription={mockSetDescription} />);
    fireEvent.click(getByText('Find skills'));
    expect(mockFindSkillsClick).toHaveBeenCalled();
  });

  it('calls backClick when the Back button is clicked', () => {
    const { getByText } = render(<EnterManually findSkillsClick={mockFindSkillsClick} backClick={mockBackClick} description="" setDescription={mockSetDescription} />);
    fireEvent.click(getByText('Back'));
    expect(mockBackClick).toHaveBeenCalled();
  });

  it('shows an error message when an empty description is entered', () => {
    const { getByText } = render(<EnterManually findSkillsClick={mockFindSkillsClick} backClick={mockBackClick} description="" setDescription={mockSetDescription} />);
    fireEvent.click(getByText('Find skills'));
    expect(getByText('Please enter a job description.')).toBeInTheDocument();
  });
});