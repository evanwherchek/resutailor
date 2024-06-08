import React, { useState, useEffect } from 'react';
import { Chip, Button } from '@mui/material';

interface DownloadResumeProps {}

interface Style {
  mainText: React.CSSProperties;
  subText: React.CSSProperties;
  button: React.CSSProperties;
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
  button: {
    borderRadius: '25px',
    textTransform: 'none',
    margin: '25px',
  },
};

const DownloadResume: React.FC<DownloadResumeProps> = () => {
  return (
    <>
      <p style={styles.mainText}>All done!</p>
      <p style={styles.subText}>Your tailored resume is below.</p>
      <Button style={styles.button} variant="contained" onClick={() => {}}>
        Download
      </Button>
    </>
  );
};

export default DownloadResume;
