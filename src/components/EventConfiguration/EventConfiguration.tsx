import { ChangeEvent, FC } from 'react';
import SelectElement from '../ui/selectElement/SelectElement';
import styles from './EventConfiguration.module.css';
import { Event, Symbol } from '../../context/interfaces';
import ClusterSettings from '../ClusterSettings/ClusterSettings';
import InputElement from '../ui/inputElement/InputElement';
import MedKitSettings from '../MedKitSettings/MedKitSettings';

interface EventConfigurationProps {
  events: Event[] | undefined;
  onChangeEventType: (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  onChangeClusterId: (
    event: ChangeEvent<HTMLSelectElement>,
    eventIndex: number,
    clusterIndex: number
  ) => void;
  onChangeWinValue: (
    event: ChangeEvent<HTMLInputElement>,
    eventIndex: number,
    clusterIndex: number
  ) => void;
  onChangeClusterIndices: (index: number, eventIndex: number) => void;
  onClearClusterIndices: () => void;
  onAddNewClusterItem: () => void;
  onAdrenalineMultiplierChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMiniPlaygroundInit: () => void;
  miniPlaygroundSymbols: Symbol[] | undefined;
  onMiniPlaygroundCellClick: (index: number) => void;
  isSelectingClusterSymbols: boolean;
  onChangeEventIndex: (index: number) => void;
}

const EventConfiguration: FC<EventConfigurationProps> = ({
  events,
  onChangeEventType,
  onChangeClusterId,
  onChangeWinValue,
  onChangeClusterIndices,
  onClearClusterIndices,
  onAddNewClusterItem,
  onAdrenalineMultiplierChange,
  onMiniPlaygroundInit,
  miniPlaygroundSymbols,
  onMiniPlaygroundCellClick,
  isSelectingClusterSymbols,
  onChangeEventIndex,
}) => {
  const changeEventType = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    onChangeEventType(event, index);
    onChangeEventIndex(index);
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>Настройки событий</p>
      {events
        ? events.map((event, index) => {
            return (
              <div className={styles.eventContainer} key={index}>
                <SelectElement
                  labelText={'Тип события'}
                  onChange={(event) => changeEventType(event, index)}
                  options={[
                    { name: 'Кластер', value: 1 },
                    { name: 'Аптечка', value: 2 },
                    { name: 'Адреналин', value: 3 },
                  ]}
                  defaultValue={event.type}
                />
                {event.type === 1 && (
                  <ClusterSettings
                    eventIndex={index}
                    onChangeClusterId={onChangeClusterId}
                    clusters={event.clusters}
                    onChangeWinValue={onChangeWinValue}
                    onChangeClusterIndices={onChangeClusterIndices}
                    onClearClusterIndices={onClearClusterIndices}
                    onAddNewClusterItem={onAddNewClusterItem}
                  />
                )}
                {event.type === 2 && (
                  <MedKitSettings
                    onMiniPlaygroundInit={onMiniPlaygroundInit}
                    miniPlaygroundSymbols={miniPlaygroundSymbols}
                    onMiniPlaygroundCellClick={onMiniPlaygroundCellClick}
                    isSelectingClusterSymbols={isSelectingClusterSymbols}
                  />
                )}
                {event.type === 3 && (
                  <div className={styles.adrenalineContainer}>
                    <InputElement
                      labelText={'Множитель при срабатывании адреналина'}
                      type={'number'}
                      onChange={(event) => onAdrenalineMultiplierChange(event)}
                    />
                  </div>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default EventConfiguration;
