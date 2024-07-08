import { ChangeEvent, FC } from 'react';
import styles from './SelectElement.module.css';

interface OptionConfiguration {
  name: string;
  value: number;
}

interface SelectElementProps {
  labelText: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: OptionConfiguration[];
  defaultValue?: number;
}

const SelectElement: FC<SelectElementProps> = ({
  labelText,
  onChange,
  options,
  defaultValue,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.labelText}>{labelText}</p>
      <select
        className={styles.select}
        onChange={onChange}
        defaultValue={defaultValue}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectElement;
