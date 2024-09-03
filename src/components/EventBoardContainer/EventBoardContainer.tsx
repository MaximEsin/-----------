import Board from '../EventBoard/EventBoard';
import EventList from '../EventList/EventList';
import styles from './EventBoardContainer.module.css';

const EventBoardContainer = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Доска событий</p>
      <div className={styles.flexRowContainer}>
        <EventList />
        <Board />
      </div>
    </div>
  );
};

export default EventBoardContainer;
