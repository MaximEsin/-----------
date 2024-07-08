import { FC } from 'react';
import MiniPlayground from '../MiniPlayground/MiniPlayground';
import Button from '../ui/button/Button';
import styles from './MedKitSettings.module.css';
import { Symbol } from '../../context/interfaces';

interface MedKitSettingsProps {
  onMiniPlaygroundInit: () => void;
  miniPlaygroundSymbols: Symbol[] | undefined;
  onMiniPlaygroundCellClick: (index: number) => void;
  isSelectingClusterSymbols: boolean;
}

const MedKitSettings: FC<MedKitSettingsProps> = ({
  onMiniPlaygroundInit,
  miniPlaygroundSymbols,
  onMiniPlaygroundCellClick,
  isSelectingClusterSymbols,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Настройки события аптечки</p>
      {!miniPlaygroundSymbols && (
        <Button text={'Инициализировать поле'} onClick={onMiniPlaygroundInit} />
      )}
      {miniPlaygroundSymbols && (
        <MiniPlayground
          miniPlaygroundSymbols={miniPlaygroundSymbols}
          onMiniPlaygroundCellClick={onMiniPlaygroundCellClick}
          isSelectingClusterSymbols={isSelectingClusterSymbols}
        />
      )}
    </div>
  );
};

export default MedKitSettings;
