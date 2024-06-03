import React from 'react';
import EnterManually from './EnterManually';

interface Style {
  backdrop: React.CSSProperties;
}

const styles: Style = {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, rgba(22,45,103,1) 5%, rgba(40,84,167,1) 95%)',
  },
};

function App() {
  return (
    <div style={styles.backdrop}>
      <EnterManually />
    </div>
  );
}

export default App;
