import React, { useState } from 'react';
import validator from 'validator';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

interface Style {
  textfield: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

interface EnterUrlProps {
  findSkillsClick: () => void;
  copyAndPasteClick: () => void;
  url: string;
  setUrl: (url: string) => void;
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

const EnterUrl: React.FC<EnterUrlProps> = ({ findSkillsClick, copyAndPasteClick, url, setUrl }) => {
  // Controls if the snackbar is open
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(event.target.value);
  };

  // Check that a valid URL was entered before continuing
  const checkField = (value: string): void => {
    if (validator.isURL(value)) {
      findSkillsClick();
    } else {
      setOpen(true);
    }
  };

  // Handles the closing of the snackbar
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
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
        value={url}
        onChange={handleChange}
      />
      <Button style={styles.button} variant="contained" onClick={() => checkField(url)}>
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
