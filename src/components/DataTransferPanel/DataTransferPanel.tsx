import { useRef, useState } from 'react';

import { exportState, exportSteps } from '../../dataTransfer/download';
import { loadStateFromFile } from '../../dataTransfer/upload';
import { useAppSelector } from '../../hooks';
import { Step } from '../../interfaces/step';
import { loadStateFromLocalStorageAndUpdateRedux, saveCurrentStateToLocalStorage } from '../../services/reducers';
import Container from '../UI/Container/Container';
import Image from '../UI/Image/Image';
import Text from '../UI/Text/Text';
import styles from './DataTransferPanel.module.css';

const DataTransferPanel = () => {
  const { steps } = useAppSelector((state) => state.mainReducer);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadStepsClick = () => {
    exportSteps(steps as Step[]);
  };

  const handleDownloadStateClick = () => {
    exportState();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadStateFromFile(file);
    }
  };

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveStateClick = () => {
    saveCurrentStateToLocalStorage();
  };

  const handleLoadSavedStateClick = () => {
    loadStateFromLocalStorageAndUpdateRedux();
  };

  const handleDeleteSaveClick = () => {
    localStorage.removeItem('state');
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Панель передачи данных</p>
      <button
        className={isPanelOpen ? styles.activeBtn : styles.btn}
        type="button"
        onClick={() => setIsPanelOpen((prev) => !prev)}
      >
        <img src="./settings.svg" className={styles.img} alt="icon" />
      </button>
      {isPanelOpen && (
        <div className={styles.container}>
          <Container>
            <Text text="Скачать степы" />
            <button className={styles.btn} type="button" onClick={handleDownloadStepsClick}>
              <Image src="./download.svg" alt="download icon" />
            </button>
          </Container>
          <Container>
            <Text text="Скачать состояние" />
            <button className={styles.btn} type="button" onClick={handleDownloadStateClick}>
              <Image src="./download.svg" alt="download icon" />
            </button>
          </Container>
          <Container>
            <Text text="Загрузить состояние" />
            <input
              ref={fileInputRef}
              className={styles.hiddenInput}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
            />
            <button className={styles.btn} type="button" onClick={triggerFileInputClick}>
              <Image src="./upload.svg" alt="upload icon" />
            </button>
          </Container>
          <Container>
            <Text text="Сохранить состояние" />
            <button className={styles.btn} type="button" onClick={handleSaveStateClick}>
              <Image src="./save.svg" alt="save icon" />
            </button>
          </Container>
          <Container>
            <Text text="Загрузить сохраненное состояние" />
            <button className={styles.btn} type="button" onClick={handleLoadSavedStateClick}>
              <Image src="./upload.svg" alt="upload icon" />
            </button>
          </Container>
          <Container>
            <Text text="Очистить сохранение" />
            <button className={styles.btn} type="button" onClick={handleDeleteSaveClick}>
              <Image src="./trashIcon.svg" alt="trash icon" />
            </button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default DataTransferPanel;
