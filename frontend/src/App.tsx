import React, { useState } from 'react';
import EnterManually from './stages/EnterManually';
import EnterUrl from './stages/EnterUrl';
import SelectSkills from './stages/SelectSkills';
import DownloadResume from './stages/DownloadResume';
import axios from 'axios';
import { encode } from 'urlencode';
import LoadingOverlay from './stages/LoadingOverlay';

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
  const [url, setUrl] = useState('');
  const [skills, setSkills] = useState('');

  function requestSkillsList() {
    axios.get('http://127.0.0.1:5000/parseSkills?postingUrl=' + encode(url))
      .then(function (response) {
        setSkills(JSON.stringify(response.data));

        setStage(3);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  };

  const goToEnterUrl = () => {
    setStage(1);
  };

  const goToEnterManually = () => {
    setStage(2);
  };

  const goToSelectSkills = () => {
    setStage(5);

    requestSkillsList();
  };

  const goToDownloadResume = () => {
    setStage(4);
  };

  return (
    <div data-testid='parent' style={styles.backdrop}>
      {stage === 1 && <EnterUrl findSkillsClick={goToSelectSkills} copyAndPasteClick={goToEnterManually} url={url} setUrl={setUrl}/>}
      {stage === 2 && <EnterManually findSkillsClick={goToSelectSkills} backClick={goToEnterUrl} />}
      {stage === 3 && <SelectSkills continueClick={goToDownloadResume} skills={skills} />}
      {stage === 4 && <DownloadResume newResumeClick={goToEnterUrl} />}
      {stage === 5 && <LoadingOverlay message='Finding skills...'/>}
    </div>
  );
}

export default App;
