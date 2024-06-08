import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface DownloadResumeProps {
  newResumeClick: () => void;
}

interface Style {
  mainText: React.CSSProperties;
  subText: React.CSSProperties;
  button: React.CSSProperties;
  textButton: React.CSSProperties;
}

const styles: Style = {
  mainText: {
    color: '#FFFFFF',
    fontSize: '60px',
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold',
    margin: '15px',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
    margin: '15px',
  },
  button: {
    borderRadius: '25px',
    textTransform: 'none',
    margin: '15px',
  },
  textButton: {
    color: '#FFFFFF',
    textTransform: 'none',
    textDecoration: 'underline',
    margin: '15px',
  },
};

const DownloadResume: React.FC<DownloadResumeProps> = ({ newResumeClick: newResume }) => {
  return (
    <>
      <p style={styles.mainText}>All done!</p>
      <p style={styles.subText}>Your tailored resume is below.</p>
      <Button style={styles.button} startIcon={<DownloadIcon />} variant="contained" onClick={() => {}}>
        Resume_EvanHerchek_AmericanAirlines.docx
      </Button>
      <Button style={styles.textButton} variant="text" onClick={newResume}>
        New resume
      </Button>
    </>
  );
};

export default DownloadResume;
