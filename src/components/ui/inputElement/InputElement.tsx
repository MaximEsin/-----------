import { ChangeEvent, FC } from 'react';
import styles from './InputElement.module.css';

interface InputElementProps {
  labelText: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: number | string;
}

const InputElement: FC<InputElementProps> = ({
  labelText,
  type,
  onChange,
  defaultValue,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.labelText}>{labelText}</p>
      <input
        className={styles.input}
        type={type}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputElement;
