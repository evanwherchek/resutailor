import React, { useState } from 'react';
import EnterManually from './EnterManually';
import EnterUrl from './EnterUrl';

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
  const [stage, setStage] = useState(1);

  const goToEnterUrl = () => {
    setStage(1);
  }

  const goToEnterManually = () => {
    setStage(2);
  }

  return (
    <div style={styles.backdrop}>
      {stage === 1 && <EnterUrl findSkills={() => {}} copyAndPaste={goToEnterManually}/>}
      {stage === 2 && <EnterManually findSkills={() => {}} back={goToEnterUrl}/>}
    </div>
  );
}

export default App;
