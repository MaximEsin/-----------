import { useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { StepTypes } from '../../interfaces/step';
import { addNewStepAction, removeStepAction, reorderStepsAction } from '../../services/actions';
import DraggableStep, { DragItem } from './DraggableStep/DraggableStep';
import styles from './StepList.module.css';
import StepSettingsTab from './StepSettingsTab/StepSettingsTab';

const StepList = () => {
  const dispatch = useAppDispatch();
  const { currentStepIndex, steps, isStepSettingsTabOpen } = useAppSelector((state) => state.mainReducer);

  const handleAddNewStep = () => {
    dispatch(addNewStepAction());
  };

  const moveStep = (dragIndex: number, hoverIndex: number) => {
    dispatch(reorderStepsAction(dragIndex, hoverIndex));
  };

  const [, trashDropRef] = useDrop(() => ({
    accept: 'step',
    drop: (item: DragItem) => {
      dispatch(removeStepAction(item.index));
    },
  }));

  const isStepFS = (index: number) => {
    return steps[index].type === StepTypes.BonusGame;
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>Список шагов</p>
      <div className={styles.overflowContainer}>
        {steps.map((_, index) =>
          isStepSettingsTabOpen && currentStepIndex === index ? (
            <div key={Date.now() * Math.random()} className={styles.stepWithSettingsContainer}>
              <DraggableStep index={index} moveStep={moveStep} isFS={isStepFS(index)} />
              <StepSettingsTab />
            </div>
          ) : (
            <DraggableStep key={Date.now() * Math.random()} index={index} moveStep={moveStep} isFS={isStepFS(index)} />
          ),
        )}
        <div className={styles.buttonContainer}>
          <button className={styles.addStepButton} type="button" onClick={() => handleAddNewStep()}>
            <p className={styles.buttonText}>+</p>
          </button>
          <button className={styles.addStepButton} type="button" ref={trashDropRef}>
            <img src="./trashIcon.svg" alt="Trash Icon" className={styles.img} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepList;
