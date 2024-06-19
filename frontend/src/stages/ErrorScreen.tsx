import { Button } from '@mui/material';

interface ErrorScreenProps {
  response: number;
  tryAgainClick: () => void;
}

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
    margin: '15px',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: '30px',
    textAlign: 'center',
    width: '80%',
  },
  button: {
    borderRadius: '25px',
    textTransform: 'none',
    margin: '15px',
  },
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({ response, tryAgainClick }) => {
  return (
    <>
      <p style={styles.mainText}>Error {response}</p>
      {response === 408 && <p style={styles.subText}>OpenAI timeout.</p>}
      {response === 413 && <p style={styles.subText}>Context window exceeded.</p>}
      {response === 422 && <p style={styles.subText}>Unprocessable content.</p>}
      <Button style={styles.button} variant="contained" onClick={tryAgainClick}>
        Try again
      </Button>
    </>
  );
};

export default ErrorScreen;
