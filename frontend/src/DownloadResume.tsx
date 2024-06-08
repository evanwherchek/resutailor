import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface DownloadResumeProps {
  newResume: () => void;
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
  },
  textButton: {
    color: '#FFFFFF',
    textTransform: 'none',
    textDecoration: 'underline',
  },
};

const DownloadResume: React.FC<DownloadResumeProps> = ({ newResume }) => {
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
