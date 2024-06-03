import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from 'react';

interface Style {
    textfield: React.CSSProperties;
    button: React.CSSProperties;
    textButton: React.CSSProperties
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
      textDecoration: 'underline'
    }
  };

function EnterUrl() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  const findSkills = (url: string) => {
    
  };

  return (
    <>
      <TextField style={styles.textfield}
        label="Job posting URL"
        id="filled-size-normal"
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
        value={textFieldValue}
        onChange={handleChange}/>
      <Button style={styles.button} 
        variant="contained"
        onClick={() => {
        }}>
        Find skills
      </Button>
      <Button style={styles.textButton}
        variant="text">
        Copy and paste instead
      </Button>
    </>
  );
}

export default EnterUrl;