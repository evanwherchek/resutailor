import React, { useState } from 'react';
import EnterManually from './stages/EnterManually';
import EnterUrl from './stages/EnterUrl';
import SelectSkills from './stages/SelectSkills';
import DownloadResume from './stages/DownloadResume';

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
  };

  const goToEnterManually = () => {
    setStage(2);
  };

  const goToSelectSkills = () => {
    setStage(3);
  };

  const goToDownloadResume = () => {
    setStage(4);
  };

  return (
    <div style={styles.backdrop}>
      {stage === 1 && <EnterUrl findSkills={goToSelectSkills} copyAndPaste={goToEnterManually} />}
      {stage === 2 && <EnterManually findSkills={goToSelectSkills} back={goToEnterUrl} />}
      {stage === 3 && <SelectSkills continueButton={goToDownloadResume} />}
      {stage === 4 && <DownloadResume newResume={goToEnterUrl} />}
    </div>
  );
}

export default App;
