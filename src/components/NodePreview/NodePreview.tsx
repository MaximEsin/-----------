import { useEffect, useState } from 'react';

import { games } from '../../context/config';
import { emptyImg } from '../../context/imgPaths';
import { useAppSelector } from '../../hooks';
import { ReelSymbol } from '../../interfaces/step';
import styles from './NodePreview.module.css';

const NodePreview = () => {
  const { chosenGame, steps, currentStepIndex, currentNodeId, nodesStorage } = useAppSelector(
    (state) => state.mainReducer,
  );
  const { reels } = useAppSelector((state) => state.reelStateReducer);

  const [modifiedReels, setModifiedReels] = useState<ReelSymbol[]>([]);

  const currentStep = steps[currentStepIndex];
  const isInitNode = currentNodeId === 'init';
  const config = games[chosenGame - 1];
  const { events } = currentStep.payload;
  const nodeIndex = nodesStorage[currentStepIndex].findIndex((node) => node.id === currentNodeId);
  const event = events[nodeIndex - 1];

  useEffect(() => {
    if (currentNodeId !== 'init') {
      const newReels = reels[currentNodeId].map((symbol) => {
        return { ...symbol };
      });
      setModifiedReels(newReels);
    }
  }, [reels, currentNodeId]);

  useEffect(() => {
    if (event && 'toReplace' in event) {
      setModifiedReels(event.toReplace as ReelSymbol[]);
    }

    if (event && 'toRemove' in event) {
      event?.toRemove?.forEach((index) => {
        setModifiedReels((prev) => {
          const newReels = [...prev];
          newReels[index].id = 99;
          return newReels;
        });
      });
    }
  }, [event, config]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Состояние барабана после события</h2>
      <div className={styles.container}>
        {isInitNode ? (
          (currentStep.payload.beforeSymbols ?? []).map((item, index) => {
            return (
              <img
                key={item.indices[0]}
                className={styles.img}
                src={config.imgPaths[item.id]}
                alt={`Symbol ${index}`}
              />
            );
          })
        ) : (
          <div className={styles.reels}>
            {modifiedReels.map((symbol, index) => {
              return (
                <img
                  key={symbol.indices[0]}
                  className={styles.img}
                  src={symbol.id !== 99 ? config.imgPaths[symbol.id] : emptyImg}
                  alt={`Symbol ${index}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NodePreview;
