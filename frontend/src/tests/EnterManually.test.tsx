import { render, fireEvent, screen } from '@testing-library/react';
import EnterManually from '../stages/EnterManually';

describe('EnterManually', () => {
  const findSkillsClickMock = jest.fn();
  const backClickMock = jest.fn();

  test('renders correctly', () => {
    render(<EnterManually findSkillsClick={findSkillsClickMock} backClick={backClickMock} />);
    expect(screen.getByLabelText('Job description')).toBeInTheDocument();
    expect(screen.getByText('Find skills')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  test('calls findSkillsClick when input is valid', () => {
    render(<EnterManually findSkillsClick={findSkillsClickMock} backClick={backClickMock} />);
    fireEvent.change(screen.getByLabelText('Job description'), { target: { value: 'Example description' } });
    fireEvent.click(screen.getByText('Find skills'));
    expect(findSkillsClickMock).toHaveBeenCalled();
  });

  test('does not call findSkillsClick when input is invalid', () => {
    render(<EnterManually findSkillsClick={findSkillsClickMock} backClick={backClickMock} />);
    fireEvent.change(screen.getByLabelText('Job description'), { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Find skills'));
    expect(findSkillsClickMock).not.toHaveBeenCalled();
  });

  test('calls backClick when "Back" is clicked', () => {
    render(<EnterManually findSkillsClick={findSkillsClickMock} backClick={backClickMock} />);
    fireEvent.click(screen.getByText('Back'));
    expect(backClickMock).toHaveBeenCalled();
  });
});