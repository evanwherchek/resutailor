import React, { useState } from 'react';
import validator from 'validator';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';

interface Style {
  label: React.CSSProperties;
  textfield: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

interface EnterManuallyProps {
  findSkillsClick: () => void;
  backClick: () => void;
  description: string;
  setDescription: (url: string) => void;
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

const EnterManually: React.FC<EnterManuallyProps> = ({ findSkillsClick, backClick, description, setDescription }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
  };

  const checkField = (value: string): void => {
    if (!validator.isEmpty(value.trim())) {
      findSkillsClick();
    } else {
      setOpen(true);
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        value={description}
        onChange={handleChange}
      />
      <Button style={styles.button} variant="contained" onClick={() => checkField(description)}>
        Find skills
      </Button>
      <Button style={styles.textButton} variant="text" onClick={backClick}>
        Back
      </Button>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} message="Please enter a job description." />
    </>
  );
};

export default EnterManually;
