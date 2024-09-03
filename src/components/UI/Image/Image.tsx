import { FC } from 'react';

import styles from './Image.module.css';

interface ImageProps {
  src: string;
  alt: string;
}

const Image: FC<ImageProps> = ({ src, alt }) => {
  return <img className={styles.img} src={src} alt={alt} />;
};

export default Image;
