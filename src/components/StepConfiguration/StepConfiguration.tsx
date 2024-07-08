import { ChangeEvent, FC } from 'react';
import SelectElement from '../ui/selectElement/SelectElement';
import styles from './StepConfiguration.module.css';
import { symbolSources } from '../../context/constants';
import SymbolButton from '../ui/symbolButton/SymbolButton';
import EventConfiguration from '../EventConfiguration/EventConfiguration';
import Button from '../ui/button/Button';
import { Event, Symbol } from '../../context/interfaces';

interface StepConfigurationProps {
  events: Event[] | undefined;
  onStepTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSymbolClick: (value: number) => void;
  onAddEvent: () => void;
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

const StepConfiguration: FC<StepConfigurationProps> = ({
  events,
  onStepTypeChange,
  onSymbolClick,
  onAddEvent,
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
  return (
    <div className={styles.container}>
      <p className={styles.title}>Настройка степа</p>
      <div className={styles.settingsContainer}>
        <SelectElement
          labelText={'Тип степа'}
          onChange={onStepTypeChange}
          options={[
            { name: 'Базовая игра', value: 1 },
            { name: 'Бонусная игра', value: 2 },
          ]}
        />
        <div className={styles.overflowContainer}>
          <EventConfiguration
            events={events}
            onChangeEventType={onChangeEventType}
            onChangeClusterId={onChangeClusterId}
            onChangeWinValue={onChangeWinValue}
            onChangeClusterIndices={onChangeClusterIndices}
            onClearClusterIndices={onClearClusterIndices}
            onAddNewClusterItem={onAddNewClusterItem}
            onAdrenalineMultiplierChange={onAdrenalineMultiplierChange}
            onMiniPlaygroundInit={onMiniPlaygroundInit}
            miniPlaygroundSymbols={miniPlaygroundSymbols}
            onMiniPlaygroundCellClick={onMiniPlaygroundCellClick}
            isSelectingClusterSymbols={isSelectingClusterSymbols}
            onChangeEventIndex={onChangeEventIndex}
          />
        </div>
        <Button text={'Добавить событие'} onClick={onAddEvent} />
        <p>Символы</p>
        <div className={styles.symbolsContainer}>
          {Object.keys(symbolSources).map((id) => {
            return (
              <SymbolButton
                key={id}
                imgSrc={symbolSources[Number(id)]}
                onClick={onSymbolClick}
                value={Number(id)}
                isSelectingClusterSymbols={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepConfiguration;
