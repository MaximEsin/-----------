import { FC } from 'react';

import styles from './Select.module.css';

interface OptionItem {
  value: number;
  text: string;
}

interface SelectProps {
  options: OptionItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: number;
}

const Select: FC<SelectProps> = ({ options, onChange, value }) => {
  return (
    <select className={styles.select} onChange={(e) => onChange(e)} value={value}>
      {options.map((option) => {
        return (
          <option key={option.value} className={styles.option} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
