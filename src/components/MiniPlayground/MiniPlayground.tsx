import { FC } from 'react';
import styles from './MiniPlayground.module.css';
import SymbolButton from '../ui/symbolButton/SymbolButton';
import { symbolSources } from '../../context/constants';
import { Symbol } from '../../context/interfaces';

interface MiniPlaygroundProps {
  miniPlaygroundSymbols: Symbol[] | undefined;
  onMiniPlaygroundCellClick: (index: number) => void;
  isSelectingClusterSymbols: boolean;
}

const MiniPlayground: FC<MiniPlaygroundProps> = ({
  miniPlaygroundSymbols,
  onMiniPlaygroundCellClick,
  isSelectingClusterSymbols,
}) => {
  return (
    <div className={styles.playgroundContainer}>
      {miniPlaygroundSymbols
        ? miniPlaygroundSymbols.map((symbol, index) => (
            <SymbolButton
              key={index}
              value={index}
              imgSrc={symbolSources[symbol.id]}
              onClick={() => onMiniPlaygroundCellClick(index)}
              isSelectingClusterSymbols={isSelectingClusterSymbols}
              onChange={() => {}}
              highlight={true}
            />
          ))
        : null}
    </div>
  );
};

export default MiniPlayground;
