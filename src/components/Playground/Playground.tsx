import { FC, useEffect, useState } from 'react';
import styles from './Playground.module.css';
import SymbolButton from '../ui/symbolButton/SymbolButton';
import { symbolSources } from '../../context/constants';

interface PlaygroundProps {
  getSymbolIds: () => Array<number>;
  currentStepId: number;
  onCellClick: (index: number) => void;
  onMultiplierChange: (index: number, multiplier: number) => void;
  isSelectingClusterSymbols: boolean;
}

const Playground: FC<PlaygroundProps> = ({
  getSymbolIds,
  currentStepId,
  onCellClick,
  onMultiplierChange,
  isSelectingClusterSymbols,
}) => {
  const [symbols, setSymbols] = useState<number[]>([]);

  useEffect(() => {
    const symbolsForStep = getSymbolIds();
    setSymbols(symbolsForStep);
  }, [currentStepId, getSymbolIds]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Поле</p>
      <div className={styles.playgroundContainer}>
        {symbols.map((id, index) => (
          <SymbolButton
            key={index}
            value={index}
            imgSrc={symbolSources[id]}
            onClick={onCellClick}
            isSelectingClusterSymbols={isSelectingClusterSymbols}
            onChange={onMultiplierChange}
            highlight={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Playground;
