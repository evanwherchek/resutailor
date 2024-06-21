import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

interface DownloadResumeProps {
  newResumeClick: () => void;
  file: Blob | null;
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

const DownloadResume: React.FC<DownloadResumeProps> = ({ newResumeClick, file }) => {
  const handleDownload = () => {
    const blob = file;

    if(blob !== null){
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'Resume_EvanHerchek.docx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <p style={styles.mainText}>All done!</p>
      <p style={styles.subText}>Your tailored resume is below.</p>
      <Button style={styles.button} startIcon={<DownloadIcon />} variant="contained" onClick={handleDownload}>
        Resume_EvanHerchek.docx
      </Button>
      <Button style={styles.textButton} variant="text" onClick={newResumeClick}>
        New resume
      </Button>
    </>
  );
};

export default DownloadResume;
