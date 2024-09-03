import { FC, useEffect, useState } from 'react';

import { spin4DeadSymbolSources } from '../../../../context/imgPaths/spin4dead';
import { spin4deadStep } from '../../../../context/stepTemplates/spin4dead';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CustomEventProps, Spin4DeadEventTypes, Spin4DeadMedKitEvent } from '../../../../interfaces/events';
import { ReelSymbol } from '../../../../interfaces/step';
import { setNewReelsAction, updateAfterSymbolsAction } from '../../../../services/actions';
import Reels from '../../../Reels/Reels';
import styles from './MedKit.module.css';

const MedKit: FC<CustomEventProps> = ({ eventData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { currentSymbolId } = useAppSelector((state) => state.mainReducer);
  const [reelsState, setReelsState] = useState<ReelSymbol[]>(structuredClone(spin4deadStep.payload.beforeSymbols));

  useEffect(() => {
    const checkEventData = () => {
      if (eventData) {
        const { type, symbols } = eventData as Spin4DeadMedKitEvent;
        if (type === Spin4DeadEventTypes.MedKit) {
          setReelsState(symbols);
        }
      }
    };
    checkEventData();
  }, [eventData]);

  const handleButtonClick = (index: number) => {
    dispatch(updateAfterSymbolsAction(index));
    setReelsState((prev) => {
      const newReels = [...prev];
      newReels[index].id = currentSymbolId;
      return newReels;
    });
  };

  const handleSubmit = () => {
    onSubmit({ type: Spin4DeadEventTypes.MedKit, symbols: reelsState, toReplace: reelsState });
    dispatch(setNewReelsAction(reelsState));
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Выберите символы для нового барабана</p>
      <div className={styles.container}>
        <Reels reels={reelsState} imagePaths={spin4DeadSymbolSources} onButtonClick={handleButtonClick} />
      </div>
      <button type="button" className={styles.button} onClick={() => handleSubmit()}>
        Сохранить
      </button>
    </div>
  );
};

export default MedKit;
