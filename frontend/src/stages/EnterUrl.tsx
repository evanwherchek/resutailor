import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import validator from 'validator';

interface Style {
  textfield: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

interface EnterUrlProps {
  findSkillsClick: () => void;
  copyAndPasteClick: () => void;
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

const EnterUrl: React.FC<EnterUrlProps> = ({ findSkillsClick, copyAndPasteClick }) => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const checkField = (value: string) => {
    if (validator.isURL(value)) {
      findSkillsClick();
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
      <Button style={styles.button} variant="contained" onClick={() => checkField(textFieldValue)}>
        Find skills
      </Button>
      <Button style={styles.textButton} variant="text" onClick={copyAndPasteClick}>
        Copy and paste instead
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message="Please enter a valid URL." />
    </>
  );
};

export default EnterUrl;
