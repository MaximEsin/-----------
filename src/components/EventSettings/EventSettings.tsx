import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { useState } from 'react';

import { games } from '../../context/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CommonSchema } from '../../interfaces/commonSchema';
import { CustomSchema } from '../../interfaces/customSchema';
import { DataToStore, GameEvents } from '../../interfaces/events';
import { randomizeSymbolsAction, updateEventAction } from '../../services/actions';
import styles from './EventSettings.module.css';

const EventSettings = () => {
  const dispatch = useAppDispatch();
  const { steps, chosenGame, currentStepIndex, currentNodeId, nodesStorage, commonSchema, customSchema } =
    useAppSelector((state) => state.mainReducer);

  const [randomGenIds, setRandomGenIds] = useState<number[]>([]);

  let currentEvent: CustomSchema | CommonSchema | undefined;

  const getCurrentEventData = () => {
    const eventIndex = nodesStorage[currentStepIndex].findIndex((node) => node.id === currentNodeId);
    return steps[currentStepIndex].payload.events[eventIndex - 1];
  };

  const [eventData] = useState<GameEvents | undefined>(getCurrentEventData());

  // TODO: change id to index
  if (currentNodeId !== 'init') {
    const extractedId = currentNodeId.split('-')[0];

    const foundSchema =
      Object.values(commonSchema).find((schema) => schema.name === extractedId) ||
      Object.values(customSchema).find((schema) => schema.name === extractedId);

    currentEvent = foundSchema;
  }

  const onSubmit = (data: DataToStore) => {
    if ('formData' in data) {
      dispatch(updateEventAction(data.formData as GameEvents));
    } else {
      dispatch(updateEventAction(data as GameEvents));
    }
  };

  const handleGenerateButtonClick = () => {
    dispatch(randomizeSymbolsAction(randomGenIds));
  };

  const handleSelectButtonClick = (id: number) => {
    if (randomGenIds.includes(id)) {
      setRandomGenIds((prev) => prev.filter((item) => item !== id));
    } else {
      setRandomGenIds((prev) => [...prev, id]);
    }
  };

  return (
    <div className={styles.container}>
      {currentNodeId !== 'init' &&
        currentEvent &&
        ('element' in currentEvent ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <currentEvent.element eventData={eventData} onSubmit={onSubmit} />
        ) : (
          <Form
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            schema={currentEvent.eventSchema}
            uiSchema={currentEvent.uiSchema}
            validator={validator}
            formData={eventData}
            onSubmit={onSubmit}
          />
        ))}
      {currentNodeId === 'init' && (
        <div className={styles.wrapper}>
          <button className={styles.button} type="button" onClick={() => handleGenerateButtonClick()}>
            Сгенерировать случайное поле
          </button>
          <div className={styles.symbolsContainer}>
            {Object.entries(games[chosenGame - 1].imgPaths).map(([id, path]) => (
              <button
                key={id}
                type="button"
                className={randomGenIds.includes(Number(id)) ? styles.activeBtn : styles.btn}
                onClick={() => handleSelectButtonClick(Number(id))}
              >
                <img className={styles.img} key={path} src={path} alt="game" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSettings;
