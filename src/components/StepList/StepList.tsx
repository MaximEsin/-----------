import { FC } from 'react';
import { Step } from '../../context/interfaces';
import styles from './StepList.module.css';

interface StepListProps {
  steps: Array<Step>;
  onCurrentStepIdChange: (id: number) => void;
  onAddNewStep: () => void;
  onRemoveStep: (id: number) => void;
}

const StepList: FC<StepListProps> = ({
  steps,
  onCurrentStepIdChange,
  onAddNewStep,
  onRemoveStep,
}) => {
  const handleCurrentStepIdChange = (id: number) => () => {
    onCurrentStepIdChange(id);
  };
  // TODO: Подумать над неймингом))
  const handleRemoveButtonStep = (id: number) => () => {
    onRemoveStep(id);
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>Список степов</p>
      <div className={styles.stepList}>
        {steps.map((step, index) => {
          return (
            <div key={index} className={styles.stepContainer}>
              <button
                className={styles.step}
                onClick={handleCurrentStepIdChange(step.id)}
              >
                {step.id}
              </button>
              <button
                className={styles.removeStep}
                onClick={handleRemoveButtonStep(step.id)}
              >
                Удалить
              </button>
            </div>
          );
        })}
        <button className={styles.step} onClick={onAddNewStep}>
          +
        </button>
      </div>
    </div>
  );
};

export default StepList;
