import React, { useState, useEffect } from 'react';
import { Chip, Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

interface SelectSkillsProps {
  continueClick: () => void;
  foundSkills: string[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
}

interface Style {
  mainText: React.CSSProperties;
  subText: React.CSSProperties;
  unselectedChip: React.CSSProperties;
  selectedChip: React.CSSProperties;
  chipContainer: React.CSSProperties;
  button: React.CSSProperties;
}

interface ChipData {
  key: number;
  label: string;
  style: React.CSSProperties;
  selected: boolean;
}

const styles: Style = {
  mainText: {
    color: '#FFFFFF',
    fontSize: '60px',
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold',
    margin: '15px',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
    margin: '15px',
  },
  selectedChip: {
    color: '#FFFFFF',
    background: '#000000',
    margin: '10px',
    fontSize: '20px',
    padding: '10px',
  },
  unselectedChip: {
    color: '#000000',
    background: '#FFFFFF',
    margin: '10px',
    fontSize: '20px',
    padding: '10px',
  },
  chipContainer: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  button: {
    borderRadius: '25px',
    textTransform: 'none',
    margin: '15px',
  },
};

const SelectSkills: React.FC<SelectSkillsProps> = ({
  continueClick,
  foundSkills,
  selectedSkills,
  setSelectedSkills,
}) => {
  const [chipList, setChipList] = useState<ChipData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [continueClicked, setContinueClicked] = useState<boolean>(false);

  // Change the selected state of a chip
  const handleChipClick = (data: ChipData): void => {
    setChipList((prevChipList: ChipData[]) => {
      return prevChipList.map((chip) => {
        if (chip.key === data.key) {
          return {
            ...chip,
            style: chip.selected ? styles.unselectedChip : styles.selectedChip,
            selected: !chip.selected,
          };
        } else {
          return chip;
        }
      });
    });
  };

  const populateList = (skills: string[]): void => {
    const newChipList: ChipData[] = [];

    for (let i = 0; i < skills.length; i++) {
      newChipList.push({ key: i, label: skills[i], style: styles.unselectedChip, selected: false });
    }

    setChipList(newChipList);
  };

  // Check which chips are selected
  const updateSelected = (): void => {
    const newSelectedSkills = chipList.reduce((acc: string[], chip) => {
      if (chip.selected) {
        acc.push(chip.label);
      }
      return acc;
    }, []);

    setSelectedSkills(newSelectedSkills);
    setContinueClicked(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Prevent any asynchronous state errors when clicking continue
  useEffect(() => {
    if (continueClicked) {
      if (selectedSkills.length > 0) {
        continueClick();
      } else {
        setOpen(true);
      }
    }
  }, [selectedSkills, continueClicked]);

  useEffect(() => {
    populateList(foundSkills);
  }, []);

  return (
    <>
      <p style={styles.mainText}>{chipList.length} skills found</p>
      <p style={styles.subText}>Which of the following do you have?</p>
      <div style={styles.chipContainer}>
        {chipList.map((data) => {
          return <Chip key={data.key} label={data.label} style={data.style} onClick={() => handleChipClick(data)} />;
        })}
      </div>
      <Button style={styles.button} variant="contained" onClick={updateSelected}>
        Continue
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message="Please select at least one skill." />
    </>
  );
};

export default SelectSkills;
