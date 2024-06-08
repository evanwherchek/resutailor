import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface Style {
  textfield: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

interface EnterUrlProps {
  findSkills: () => void;
  copyAndPaste: () => void;
}

const styles: Style = {
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

const EnterUrl: React.FC<EnterUrlProps> = ({ findSkills, copyAndPaste }) => {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <>
      <TextField
        style={styles.textfield}
        label="Job posting URL"
        id="filled-size-normal"
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
        value={textFieldValue}
        onChange={handleChange}
      />
      <Button style={styles.button} variant="contained" onClick={findSkills}>
        Find skills
      </Button>
      <Button style={styles.textButton} variant="text" onClick={copyAndPaste}>
        Copy and paste instead
      </Button>
    </>
  );
};

export default EnterUrl;
