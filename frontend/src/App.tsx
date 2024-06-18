import React, { useState } from 'react';
import EnterManually from './stages/EnterManually';
import EnterUrl from './stages/EnterUrl';
import SelectSkills from './stages/SelectSkills';
import DownloadResume from './stages/DownloadResume';
import axios from 'axios';
import { encode } from 'urlencode';

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

  function requestSkillsList() {
    axios.get('http://127.0.0.1:5000/parseSkills?postingUrl=' + encode(url))
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  const goToEnterUrl = () => {
    setStage(1);
  };

  const goToEnterManually = () => {
    setStage(2);
  };

  const goToSelectSkills = () => {
    console.log('URL: ' + url);
    requestSkillsList();

    setStage(3);
  };

  const goToDownloadResume = () => {
    setStage(4);
  };

  return (
    <div data-testid='parent' style={styles.backdrop}>
      {stage === 1 && <EnterUrl findSkillsClick={goToSelectSkills} copyAndPasteClick={goToEnterManually} url={url} setUrl={setUrl}/>}
      {stage === 2 && <EnterManually findSkillsClick={goToSelectSkills} backClick={goToEnterUrl} />}
      {stage === 3 && <SelectSkills continueClick={goToDownloadResume} />}
      {stage === 4 && <DownloadResume newResumeClick={goToEnterUrl} />}
    </div>
  );
}

export default App;
