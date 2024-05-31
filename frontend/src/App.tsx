import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';

interface Style {
  backdrop: React.CSSProperties;
  textfield: React.CSSProperties;
  button: React.CSSProperties;
}

const styles: Style = {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(22,45,103,1) 5%, rgba(40,84,167,1) 95%)',
  },
  textfield: {
    background: "#FFFFFF",
    borderRadius: "10px",
    width: '35%',
    margin: '20px',
  },
  button: {
    borderRadius: '25px',
    margin: '20px',
    textTransform: 'none',
  },
};

function App() {
  return (
    <div style={styles.backdrop}>
      <TextField
        style={styles.textfield}
        label="Job posting URL"
        id="filled-size-normal"
        variant="filled"
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Button style={styles.button} variant="contained">
        Find skills
      </Button>
    </div>
  );
}

export default App;
