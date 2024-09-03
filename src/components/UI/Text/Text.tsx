import { FC } from 'react';

import styles from './Text.module.css';

interface TextProps {
  text: string;
}

const Text: FC<TextProps> = ({ text }) => {
  return <p className={styles.text}>{text}</p>;
};

export default Text;
