import { FireworkSpinner } from 'react-spinners-kit';

interface Style {
  message: React.CSSProperties;
}

const styles: Style = {
  message: {
    color: '#FFFFFF',
  },
};

const LoadingScreen: React.FC = () => {
  return (
    <>
      <FireworkSpinner size={50} color="#FFFFFF" loading={true} />
      <p style={styles.message}>Loading...</p>
    </>
  );
};

export default LoadingScreen;
