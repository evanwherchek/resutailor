import { FireworkSpinner } from 'react-spinners-kit';

interface LoadingScreenProps {
  message: string;
}

interface Style {
  message: React.CSSProperties;
}

const styles: Style = {
  message: {
    color: '#FFFFFF',
  },
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <>
      <FireworkSpinner size={50} color="#FFFFFF" loading={true} />
      <p style={styles.message}>{message}</p>
    </>
  );
};

export default LoadingScreen;
