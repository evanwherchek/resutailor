import React from 'react';
import { Chip } from '@mui/material';

interface SelectSkillsProps {

}

interface Style {
  mainText: React.CSSProperties,
  subText: React.CSSProperties
}

const styles: Style = {
  mainText: {
    color: '#FFFFFF',
    fontSize: '75px',
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold'
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
  }
}

const SelectSkills: React.FC<SelectSkillsProps> = () => {
  return(
    <>
      <p style={styles.mainText}>
        12 skills found
      </p>
      <p style={styles.subText}>
        Which of the following do you have?
      </p>
    </>
  );
}

export default SelectSkills