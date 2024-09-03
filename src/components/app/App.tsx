import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { games } from '../../context/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCustomSchemasAction } from '../../services/actions';
import ChooseGame from '../ChooseGame/ChooseGame';
import ModalWindow from '../ModalWindow/ModalWindow';
import styles from './App.module.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { chosenGame, isModalOpen, isStateJustUploaded } = useAppSelector((state) => state.mainReducer);

  useEffect(() => {
    if (isStateJustUploaded) {
      dispatch(updateCustomSchemasAction(games[chosenGame - 1].customSchema));
    }
  }, [chosenGame, dispatch, isStateJustUploaded]);

  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <ChooseGame />
        {isModalOpen && <ModalWindow />}
      </DndProvider>
    </div>
  );
};

export default App;
