import { FC, useEffect, useState } from 'react';

import { spin4DeadSymbolSources } from '../../../../context/imgPaths/spin4dead';
import { useAppSelector } from '../../../../hooks';
import { CustomEventProps, Spin4DeadClusterEvent, Spin4DeadEventTypes } from '../../../../interfaces/events';
import styles from './Cluster.module.css';

const Cluster: FC<CustomEventProps> = ({ eventData, onSubmit }) => {
  const [isChoosingHero, setIsChoosingHero] = useState(false);
  const [chosenHeroIndex, setChosenHeroIndex] = useState<number | null>(null);

  const [isChoosingEnemies, setIsChoosingEnemies] = useState(false);
  const [chosenEnemiesIndices, setChosenEnemiesIndices] = useState<number[]>([]);

  const [winValue, setWinValue] = useState(0);

  const { currentNodeId } = useAppSelector((state) => state.mainReducer);
  const { reels } = useAppSelector((state) => state.reelStateReducer);

  useEffect(() => {
    const checkEventData = () => {
      if (eventData) {
        const { type, clusters } = eventData as Spin4DeadClusterEvent;
        if (type === Spin4DeadEventTypes.Cluster) {
          const { id, indices, win } = clusters[0];
          const clusterSymbolIndex = reels[currentNodeId].findIndex((symbol) => symbol.id === id);
          setChosenHeroIndex(clusterSymbolIndex);
          setChosenEnemiesIndices(indices);
          setWinValue(win);
        }
      }
    };

    checkEventData();
  }, [currentNodeId, eventData, reels]);

  const handleButtonClick = (index: number) => {
    if (isChoosingHero) {
      setChosenHeroIndex(index);
      setIsChoosingHero(false);
    }
    if (isChoosingEnemies) {
      setChosenEnemiesIndices((prev) => {
        if (prev.includes(index)) {
          return prev.filter((i) => i !== index);
        }
        return [...prev, index];
      });
    }
  };

  const checkIfEnemyIsChosen = (index: number) => {
    return chosenEnemiesIndices.includes(index);
  };

  const handleSubmit = () => {
    const symbol = reels[currentNodeId].find((s, index) => {
      if (chosenHeroIndex === index) {
        return s;
      }
      return undefined;
    });

    if (symbol && typeof symbol.id === 'number') {
      onSubmit({
        type: Spin4DeadEventTypes.Cluster,
        clusters: [{ id: symbol.id, indices: chosenEnemiesIndices, win: winValue }],
        toRemove: chosenEnemiesIndices,
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Событие Кластер</p>
      <div className={styles.container}>
        {reels[currentNodeId].map((symbol, index) => {
          return (
            <button
              key={symbol.indices[0]}
              type="button"
              className={chosenHeroIndex === index ? styles.btnActive : styles.btn}
              onClick={() => handleButtonClick(index)}
            >
              <img
                className={checkIfEnemyIsChosen(index) ? styles.activeImg : styles.img}
                src={spin4DeadSymbolSources[symbol.id]}
                alt={`Symbol ${index}`}
              />
            </button>
          );
        })}
      </div>
      <div className={styles.btnContainer}>
        <button
          className={isChoosingHero ? styles.activeButton : styles.button}
          type="button"
          onClick={() => setIsChoosingHero(true)}
        >
          Выбрать героя
        </button>
        <button
          className={isChoosingEnemies ? styles.activeButton : styles.button}
          type="button"
          onClick={() => setIsChoosingEnemies(!isChoosingEnemies)}
        >
          Выбрать врагов
        </button>
      </div>
      <input
        type="number"
        className={styles.input}
        value={winValue}
        onChange={(e) => setWinValue(Number(e.target.value))}
      />
      <button className={styles.button} type="button" onClick={() => handleSubmit()}>
        Подтвердить
      </button>
    </div>
  );
};

export default Cluster;
