import { render, fireEvent, screen } from '@testing-library/react';
import EnterManually from '../stages/EnterManually';

describe('EnterManually', () => {
  const mockSetDescription = jest.fn();
  const mockFindSkillsClick = jest.fn();
  const mockBackClick = jest.fn();

  it('renders without crashing', () => {
    render(
      <EnterManually
        findSkillsClick={mockFindSkillsClick}
        backClick={mockBackClick}
        description=""
        setDescription={mockSetDescription}
      />,
    );
  });

  it('calls setDescription when the input value is changed', () => {
    render(
      <EnterManually
        findSkillsClick={mockFindSkillsClick}
        backClick={mockBackClick}
        description=""
        setDescription={mockSetDescription}
      />,
    );
    fireEvent.change(screen.getByLabelText('Job description'), { target: { value: 'test' } });
    expect(mockSetDescription).toHaveBeenCalledWith('test');
  });

  it('calls findSkillsClick when a valid description is entered', () => {
    render(
      <EnterManually
        findSkillsClick={mockFindSkillsClick}
        backClick={mockBackClick}
        description="This is a job description"
        setDescription={mockSetDescription}
      />,
    );
    fireEvent.click(screen.getByText('Find skills'));
    expect(mockFindSkillsClick).toHaveBeenCalled();
  });

  it('calls backClick when the Back button is clicked', () => {
    render(
      <EnterManually
        findSkillsClick={mockFindSkillsClick}
        backClick={mockBackClick}
        description=""
        setDescription={mockSetDescription}
      />,
    );
    fireEvent.click(screen.getByText('Back'));
    expect(mockBackClick).toHaveBeenCalled();
  });

  it('shows an error message when an empty description is entered', () => {
    render(
      <EnterManually
        findSkillsClick={mockFindSkillsClick}
        backClick={mockBackClick}
        description=""
        setDescription={mockSetDescription}
      />,
    );
    fireEvent.click(screen.getByText('Find skills'));
    expect(screen.getByText('Please enter a job description.')).toBeInTheDocument();
  });
});
