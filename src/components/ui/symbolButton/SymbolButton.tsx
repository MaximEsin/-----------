import { FC, useState } from 'react';
import styles from './SymbolButton.module.css';

interface SymbolButtonProps {
  imgSrc: string | undefined;
  onClick: (value: number) => void;
  value: number;
  isSelectingClusterSymbols: boolean;
  onChange?: (index: number, multiplier: number) => void;
  highlight?: boolean;
}

const SymbolButton: FC<SymbolButtonProps> = ({
  imgSrc,
  onClick,
  value,
  onChange,
  highlight,
  isSelectingClusterSymbols,
}) => {
  const [highlighted, setHighlighted] = useState<boolean>(false);

  const handleHighlight = () => {
    if (highlight && isSelectingClusterSymbols) {
      setHighlighted(!highlighted);
    }
  };

  const onCellClick = (value: number) => {
    onClick(value);
    handleHighlight();
  };

  return (
    <button
      className={highlighted ? styles.highlightBtn : styles.btn}
      onClick={() => onCellClick(value)}
    >
      <img src={imgSrc} alt="symbol" className={styles.img} />
      {onChange && (
        <input
          type="number"
          className={styles.input}
          onChange={(event) => onChange(value, Number(event.target.value))}
        />
      )}
    </button>
  );
};

export default SymbolButton;
