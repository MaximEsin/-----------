import { FC } from 'react';
import { useDrag } from 'react-dnd';

import styles from './EventItem.module.css';

interface EventItemProps {
  name: string;
}

export const eventType = 'EVENT';

const EventItem: FC<EventItemProps> = ({ name }) => {
  const [, dragRef] = useDrag(() => ({
    type: eventType,
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div className={styles.container} ref={dragRef}>
      <p className={styles.text}>{name}</p>
    </div>
  );
};

export default EventItem;
