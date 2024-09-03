import { useAppSelector } from '../../hooks';
import EventItem from '../EventItem/EventItem';
import styles from './EventList.module.css';

const EventList = () => {
  const { commonSchema, customSchema } = useAppSelector((state) => state.mainReducer);
  return (
    <div className={styles.container}>
      {commonSchema.map((schema) => {
        return <EventItem name={schema.name} key={schema.name} />;
      })}
      {customSchema.map((schema) => {
        return <EventItem name={schema.name} key={schema.name} />;
      })}
    </div>
  );
};

export default EventList;
