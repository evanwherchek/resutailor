import { Button } from '@mui/material';
import { AxiosResponse } from 'axios';

interface ErrorScreenProps {
  tryAgainClick: () => void;
  response: AxiosResponse | null;
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

const ErrorScreen: React.FC<ErrorScreenProps> = ({ tryAgainClick, response }) => {
  let errorCode: number = 200;
  let message: string = 'OK';

  if(response !== null){
    errorCode = response.status;
    message = response.data.message;
  }

  return (
    <>
      <p style={styles.mainText}>Response {errorCode}</p>
      <p style={styles.subText}>{message}</p>
      <Button style={styles.button} variant="contained" onClick={tryAgainClick}>
        Try again
      </Button>
    </>
  );
};

export default ErrorScreen;
