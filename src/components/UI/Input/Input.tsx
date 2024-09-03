import { ChangeEvent, FC } from 'react';

import styles from './Input.module.css';

interface InputProps {
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  placeholder?: string;
  disabled?: boolean;
}

const Input: FC<InputProps> = ({ type, placeholder, onChange, value, disabled }) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={styles.input}
      onChange={(e) => onChange(e)}
      disabled={disabled}
    />
  );
};

export default Input;
