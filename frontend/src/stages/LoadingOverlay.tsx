import { FireworkSpinner } from 'react-spinners-kit';

interface LoadingOverlayProps {
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

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <>
      <FireworkSpinner size={50} color="#FFFFFF" loading={true} />
      <p style={styles.message}>{message}</p>
    </>
  );
};

export default LoadingOverlay;
