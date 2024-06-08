import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface Style {
  label: React.CSSProperties;
  textfield: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

interface EnterManuallyProps {
  findSkills: () => void;
  back: () => void;
}

const styles: Style = {
  label: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
  },
  textfield: {
    background: '#FFFFFF',
    borderRadius: '10px',
    width: '35%',
    margin: '20px',
  },
  button: {
    borderRadius: '25px',
    margin: '20px',
    textTransform: 'none',
  },
  textButton: {
    color: '#FFFFFF',
    textTransform: 'none',
    textDecoration: 'underline',
  },
};

const EnterManually: React.FC<EnterManuallyProps> = ({ findSkills, back }) => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <>
      <p style={styles.label}>
        If the web page with your job posting cannot be accessed, you can copy and paste the job description here.
      </p>
      <TextField
        style={styles.textfield}
        id="outlined-multiline-static"
        label="Job description"
        variant="filled"
        multiline
        rows={10}
        value={textFieldValue}
        onChange={handleChange}
      />
      <Button style={styles.button} variant="contained" onClick={findSkills}>
        Find skills
      </Button>
      <Button style={styles.textButton} variant="text" onClick={back}>
        Back
      </Button>
    </>
  );
};

export default EnterManually;
