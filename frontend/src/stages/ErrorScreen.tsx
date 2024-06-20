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
      <p style={styles.subText}>
        {response === 408
          ? 'OpenAI timeout.'
          : response === 413
            ? 'Context window exceeded.'
            : response === 422
              ? 'Unprocessable content.'
              : 'An unknown error occurred.'}
      </p>
      <Button style={styles.button} variant="contained" onClick={tryAgainClick}>
        Try again
      </Button>
    </>
  );
};

export default ErrorScreen;
