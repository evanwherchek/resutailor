import { render, fireEvent } from '@testing-library/react';
import SelectSkills from '../stages/SelectSkills';

describe('SelectSkills', () => {
  const mockSetSelectedSkills = jest.fn();
  const mockContinueClick = jest.fn();

  it('renders without crashing', () => {
    render(<SelectSkills continueClick={mockContinueClick} foundSkills={[]} selectedSkills={[]} setSelectedSkills={mockSetSelectedSkills} />);
  });

  it('populates chips with found skills', () => {
    const { getByText } = render(<SelectSkills continueClick={mockContinueClick} foundSkills={['skill1', 'skill2']} selectedSkills={[]} setSelectedSkills={mockSetSelectedSkills} />);
    expect(getByText('skill1')).toBeInTheDocument();
    expect(getByText('skill2')).toBeInTheDocument();
  });

  it('calls continueClick when the Continue button is clicked and at least one skill is selected', () => {
    const { getByText } = render(<SelectSkills continueClick={mockContinueClick} foundSkills={['skill1']} selectedSkills={['skill1']} setSelectedSkills={mockSetSelectedSkills} />);
    fireEvent.click(getByText('Continue'));
    expect(mockContinueClick).toHaveBeenCalled();
  });

  it('shows an error message when the Continue button is clicked and no skills are selected', () => {
    const { getByText } = render(<SelectSkills continueClick={mockContinueClick} foundSkills={['skill1']} selectedSkills={[]} setSelectedSkills={mockSetSelectedSkills} />);
    fireEvent.click(getByText('Continue'));
    expect(getByText('Please select at least one skill.')).toBeInTheDocument();
  });
});