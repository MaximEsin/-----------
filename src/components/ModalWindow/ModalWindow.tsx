import { SyntheticEvent, useEffect } from 'react';

import { useAppDispatch } from '../../hooks';
import { toggleModalAction } from '../../services/actions';
import EventSettings from '../EventSettings/EventSettings';
import Playground from '../Playground/Playground';
import SymbolTab from '../SymbolTab/SymbolTab';
import styles from './ModalWindow.module.css';

const ModalWindow = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(toggleModalAction());
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    /* TODO: Remove all eslint-disable comments */
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={styles.modal}
      onClick={(event: SyntheticEvent) => {
        if (event.target === event.currentTarget) {
          dispatch(toggleModalAction());
        }
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <EventSettings />
        </div>
        <div className={styles.container}>
          <Playground />
          <SymbolTab />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
