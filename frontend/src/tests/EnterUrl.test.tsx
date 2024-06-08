import { render, fireEvent, screen } from '@testing-library/react';
import EnterUrl from '../stages/EnterUrl';

describe('EnterUrl', () => {
  const findSkillsClickMock = jest.fn();
  const copyAndPasteClickMock = jest.fn();

  test('renders correctly', () => {
    render(<EnterUrl findSkillsClick={findSkillsClickMock} copyAndPasteClick={copyAndPasteClickMock} />);
    expect(screen.getByLabelText('Job posting URL')).toBeInTheDocument();
    expect(screen.getByText('Find skills')).toBeInTheDocument();
    expect(screen.getByText('Copy and paste instead')).toBeInTheDocument();
  });

  test('calls findSkillsClick when URL is valid', () => {
    render(<EnterUrl findSkillsClick={findSkillsClickMock} copyAndPasteClick={copyAndPasteClickMock} />);
    fireEvent.change(screen.getByLabelText('Job posting URL'), { target: { value: 'https://valid.url' } });
    fireEvent.click(screen.getByText('Find skills'));
    expect(findSkillsClickMock).toHaveBeenCalled();
  });

  test('does not call findSkillsClick when URL is invalid', () => {
    render(<EnterUrl findSkillsClick={findSkillsClickMock} copyAndPasteClick={copyAndPasteClickMock} />);
    fireEvent.change(screen.getByLabelText('Job posting URL'), { target: { value: 'invalid url' } });
    fireEvent.click(screen.getByText('Find skills'));
    expect(findSkillsClickMock).not.toHaveBeenCalled();
  });

  test('calls copyAndPasteClick when "Copy and paste instead" is clicked', () => {
    render(<EnterUrl findSkillsClick={findSkillsClickMock} copyAndPasteClick={copyAndPasteClickMock} />);
    fireEvent.click(screen.getByText('Copy and paste instead'));
    expect(copyAndPasteClickMock).toHaveBeenCalled();
  });
});
