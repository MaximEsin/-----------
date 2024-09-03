import { FC } from 'react';

import { useAppSelector } from '../../hooks';
import { ReelSymbol } from '../../interfaces/step';
import styles from './Reels.module.css';

interface ReelsProps {
  reels: ReelSymbol[];
  imagePaths: Record<number, string>;
  onInputChange?: (index: number, multiplier: number, nodeId?: string) => void;
  onButtonClick: (index: number) => void;
  currentNodeId?: string;
}

const Reels: FC<ReelsProps> = ({ reels, imagePaths, onInputChange, onButtonClick, currentNodeId }) => {
  const { symbolsWithMultiplier } = useAppSelector((state) => state.mainReducer);

  return reels.map((symbol, index) => {
    return (
      <div className={styles.symbolContainer} key={symbol.indices[0]}>
        {onInputChange &&
          symbol.properties?.multiplier &&
          symbolsWithMultiplier?.find((multiplier) => multiplier.id === symbol.id) && (
            <input
              type="number"
              value={Math.max(symbol.properties.multiplier, 0.1)}
              className={styles.input}
              onChange={(e) => onInputChange(index, Number(e.target.value), currentNodeId)}
            />
          )}
        <button type="button" className={styles.btn} onClick={() => onButtonClick(index)}>
          <img className={styles.img} src={imagePaths[symbol.id]} alt={`Symbol ${index}`} />
        </button>
      </div>
    );
  });
};

export default Reels;
