import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { encode } from 'urlencode';

import DownloadResume from './stages/DownloadResume';
import EnterManually from './stages/EnterManually';
import EnterUrl from './stages/EnterUrl';
import ErrorScreen from './stages/ErrorScreen';
import LoadingScreen from './stages/LoadingOverlay';
import SelectSkills from './stages/SelectSkills';

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
  const [stage, setStage] = useState<number>(1);
  const [url, setUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [foundSkills, setFoundSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [file, setFile] = useState<Blob | null>(null);

  const goToEnterUrl = (): void => setStage(1);
  const goToEnterManually = (): void => setStage(2);
  const goToSelectSkills = (): void => setStage(3);
  const goToDownloadResume = (): void => setStage(4);
  const goToLoadingScreen = (): void => setStage(5);
  const goToErrorScreen = (): void => setStage(6);

  function requestSkillsFromUrl(): void {
    goToLoadingScreen();

    axios.get('http://127.0.0.1:5000/parseSkills?postingUrl=' + encode(url))
      .then((response: AxiosResponse) => {
        setFoundSkills(response.data['skills']);
        goToSelectSkills();
      })
      .catch((error: AxiosError) => {
        if(error.response){
          setResponse(error.response);
          goToErrorScreen();
        }
      });
  };

  function requestSkillsFromText(): void {
    goToLoadingScreen();

    axios.post('http://127.0.0.1:5000/parseFromText', { description: description })
      .then((response: AxiosResponse) => {
        setFoundSkills(response.data['skills']);
        goToSelectSkills();
      })
      .catch((error: AxiosError) => {
        if(error.response){
          setResponse(error.response);
          goToErrorScreen();
        }
      });
  }

  function requestDocumentEdit(): void {
    goToLoadingScreen();

    axios.post('http://127.0.0.1:5000/appendSkills', { skills: selectedSkills }, { responseType: 'blob' })
      .then((response: AxiosResponse) => {
        const receivedFile = new Blob([response.data], { type: 'application/msword' });
        setFile(receivedFile);
        goToDownloadResume();
      })
      .catch((error: AxiosError) => {
        if(error.response){
          setResponse(error.response);
          goToErrorScreen();
        }
      });
  }

  return (
    <div data-testid='parent' style={styles.backdrop}>
      {stage === 1 && <EnterUrl findSkillsClick={requestSkillsFromUrl} copyAndPasteClick={goToEnterManually} url={url} setUrl={setUrl} />}
      {stage === 2 && <EnterManually findSkillsClick={requestSkillsFromText} backClick={goToEnterUrl} description={description} setDescription={setDescription} />}
      {stage === 3 && <SelectSkills continueClick={requestDocumentEdit} foundSkills={foundSkills} selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />}
      {stage === 4 && <DownloadResume newResumeClick={goToEnterUrl} file={file} />}
      {stage === 5 && <LoadingScreen />}
      {stage === 6 && <ErrorScreen tryAgainClick={goToEnterUrl} response={response} />}
    </div>
  );
}

export default App;
