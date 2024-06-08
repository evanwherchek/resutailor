import React, { useState, useEffect } from 'react';
import { Chip } from '@mui/material';

interface SelectSkillsProps {}

interface Style {
  mainText: React.CSSProperties;
  subText: React.CSSProperties;
  unselectedChip: React.CSSProperties;
  selectedChip: React.CSSProperties;
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
    fontSize: '75px',
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
  },
  selectedChip: {
    color: '#000000',
  },
  unselectedChip: {
    color: '#FFFFFF'
  }
};

const SelectSkills: React.FC<SelectSkillsProps> = () => {
  const [chipList, setChipList] = useState<ChipData[]>([]);

  const handleChipClick = (data: ChipData) => {
    setChipList(prevChipList => {
      return prevChipList.map((chip) => {
        if (chip.key === data.key) {
          return {
            ...chip,
            style: chip.selected ? styles.unselectedChip : styles.selectedChip,
            selected: !chip.selected
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

      for(let i = 0; i < jsonObject.skills.length; i++){
        newChipList.push({ key: i, label: jsonObject.skills[i], style: styles.unselectedChip, selected: false });
      }

      setChipList(newChipList);
    }

    populateList('{"skills": ["Java", "Python", "AWS", "Kubernetes"]}');
  }, []);

  return (
    <>
      <p style={styles.mainText}>12 skills found</p>
      <p style={styles.subText}>Which of the following do you have?</p>
      {chipList.map((data) => {
        return(
          <Chip key={data.key} label={data.label} style={data.style} onClick={() => handleChipClick(data)} />
        )
      })}
    </>
  );
};

export default SelectSkills;
