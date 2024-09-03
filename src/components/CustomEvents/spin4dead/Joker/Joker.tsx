import { FC, useEffect, useState } from 'react';

import { spin4DeadSymbolSources } from '../../../../context/imgPaths/spin4dead';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  CustomEventProps,
  Spin4DeadEventTypes,
  Spin4DeadJoker,
  Spin4DeadJokerEvent,
} from '../../../../interfaces/events';
import { updateCurrentMultiplierAction } from '../../../../services/actions';
import styles from './Joker.module.css';

const Joker: FC<CustomEventProps> = ({ eventData, onSubmit }) => {
  const dispatch = useAppDispatch();
  const { currentNodeId } = useAppSelector((state) => state.mainReducer);
  const { reels } = useAppSelector((state) => state.reelStateReducer);

  const [jokerData, setJokerData] = useState<Spin4DeadJoker[]>();

  const jokerId = 13;

  useEffect(() => {
    const checkEventData = () => {
      if (eventData) {
        const { type, multipliers } = eventData as Spin4DeadJokerEvent;
        if (type === Spin4DeadEventTypes.Joker) {
          setJokerData(multipliers);
        }
      }
    };

    checkEventData();
  }, [currentNodeId, eventData, reels]);

  const handleMultiplierChange = (index: number, multiplier: number) => {
    const checkIfJokerAlreadyExists = jokerData?.find((joker) => joker.index === index);
    if (checkIfJokerAlreadyExists) {
      setJokerData((prev) => {
        return prev?.map((joker) => {
          if (joker.index === index) {
            return { index, multiplier };
          }
          return joker;
        });
      });
    } else {
      setJokerData((prev) => {
        return [...(prev || []), { index, multiplier }];
      });
    }
  };

  const handleSubmit = () => {
    onSubmit({ type: Spin4DeadEventTypes.Joker, multipliers: jokerData } as Spin4DeadJokerEvent);
    let multiplier = 0;
    jokerData?.forEach((joker) => {
      multiplier += joker.multiplier;
    });
    dispatch(updateCurrentMultiplierAction(multiplier));
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Событие Джокер</p>
      <div className={styles.container}>
        {reels[currentNodeId].map((symbol, index) => {
          return (
            <button key={symbol.indices[0]} type="button" className={styles.btn}>
              {symbol.id === jokerId && (
                <input
                  type="number"
                  className={styles.input}
                  value={jokerData?.find((joker) => joker.index === symbol.indices[0])?.multiplier || 0}
                  onChange={(e) => handleMultiplierChange(symbol.indices[0], Number(e.target.value))}
                />
              )}
              <img className={styles.img} src={spin4DeadSymbolSources[symbol.id]} alt={`Symbol ${index}`} />
            </button>
          );
        })}
      </div>
      <button className={styles.button} type="button" onClick={() => handleSubmit()}>
        Подтвердить
      </button>
    </div>
  );
};

export default Joker;
