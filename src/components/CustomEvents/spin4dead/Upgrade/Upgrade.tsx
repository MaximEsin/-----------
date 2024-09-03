import { FC, useEffect, useState } from 'react';

import { spin4DeadSymbolSources } from '../../../../context/imgPaths/spin4dead';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CustomEventProps, Spin4DeadEventTypes, Spin4DeadUpgradeEvent } from '../../../../interfaces/events';
import { ReelSymbol } from '../../../../interfaces/step';
import { setNewReelsAction } from '../../../../services/actions';
import Reels from '../../../Reels/Reels';
import styles from './Upgrade.module.css';

const Upgrade: FC<CustomEventProps> = ({ eventData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { currentSymbolId, currentNodeId } = useAppSelector((state) => state.mainReducer);
  const { reels } = useAppSelector((state) => state.reelStateReducer);
  const reelsCopy = structuredClone(reels[currentNodeId]);
  const [reelsState, setReelsState] = useState(reelsCopy);
  const [changedSymbols, setChangedSymbols] = useState<ReelSymbol[]>([]);

  useEffect(() => {
    const checkEventData = () => {
      if (eventData) {
        const { type, symbols } = eventData as Spin4DeadUpgradeEvent;
        if (type === Spin4DeadEventTypes.Upgrade) {
          setReelsState(symbols);
        }
      }
    };
    checkEventData();
  }, [eventData]);

  const handleSubmit = () => {
    onSubmit({ type: Spin4DeadEventTypes.Upgrade, symbols: changedSymbols });
    dispatch(setNewReelsAction(reelsState));
  };

  const handleButtonClick = (index: number) => {
    setReelsState((prev) => {
      const newReels = [...prev];
      newReels[index].id = currentSymbolId;
      return newReels;
    });
  };

  const handleInputChange = (index: number, multiplier: number) => {
    if (multiplier < 0.1) return;
    setReelsState((prev) => {
      const newReels = [...prev];
      if (newReels[index].properties) newReels[index].properties.multiplier = multiplier;
      setChangedSymbols((prevSymbols) => {
        const newChangedSymbols = prevSymbols.filter((symbol) => symbol.indices[0] !== newReels[index].indices[0]);
        newChangedSymbols.push(newReels[index]);
        return newChangedSymbols;
      });
      return newReels;
    });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Введите новый множитель для символов</p>
      <div className={styles.container}>
        <Reels
          reels={reelsState}
          imagePaths={spin4DeadSymbolSources}
          onButtonClick={handleButtonClick}
          onInputChange={handleInputChange}
        />
      </div>
      <button type="button" className={styles.button} onClick={() => handleSubmit()}>
        Сохранить
      </button>
    </div>
  );
};

export default Upgrade;
