import React, { useState, useEffect } from 'react';
import { Chip, Button } from '@mui/material';

interface SelectSkillsProps {}

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
    marginBottom: '20px',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
    marginTop: '10px',
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
  },
  button: {
    borderRadius: '25px',
    textTransform: 'none',
    margin: '25px',
  },
};

const SelectSkills: React.FC<SelectSkillsProps> = () => {
  const [chipList, setChipList] = useState<ChipData[]>([]);

  const handleChipClick = (data: ChipData) => {
    setChipList((prevChipList) => {
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

  useEffect(() => {
    const populateList = (jsonString: string) => {
      const jsonObject: any = JSON.parse(jsonString);
      const newChipList = [];

      for (let i = 0; i < jsonObject.skills.length; i++) {
        newChipList.push({ key: i, label: jsonObject.skills[i], style: styles.unselectedChip, selected: false });
      }

      setChipList(newChipList);
    };

    populateList(
      '{"skills": ["Java", "Python", "AWS", "Kubernetes", "Docker", "GCP", "data structures", "C++", "OOP", "concurrency"]}',
    );
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
      <Button style={styles.button} variant="contained" onClick={() => {}}>
        Find skills
      </Button>
    </>
  );
};

export default SelectSkills;