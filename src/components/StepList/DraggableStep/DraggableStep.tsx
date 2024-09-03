import classNames from 'classnames';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setStepIndexAction, toggleStepSettingsTabAction } from '../../../services/actions';
import styles from './DraggableStep.module.css';

export interface DragItem {
  index: number;
  type: string;
}

interface DraggableStepProps {
  index: number;
  moveStep: (dragIndex: number, hoverIndex: number) => void;
  isFS: boolean;
}

const DraggableStep: FC<DraggableStepProps> = ({ index, moveStep, isFS }) => {
  const dispatch = useAppDispatch();
  const { currentStepIndex } = useAppSelector((state) => state.mainReducer);

  const ref = useRef<HTMLDivElement>(null);

  const [, dragRef] = useDrag(() => ({
    type: 'step',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop({
    accept: 'step',
    drop(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveStep(dragIndex, hoverIndex);
    },
  });

  dragRef(dropRef(ref));

  const handleSettingsButtonClick = () => {
    dispatch(setStepIndexAction(index));
    dispatch(toggleStepSettingsTabAction());
  };

  return (
    <div
      className={classNames(styles.step, {
        [styles.stepHighlighted]: index === currentStepIndex,
      })}
      key={index}
      ref={ref}
    >
      <button
        className={isFS ? styles.fsStepBtn : styles.stepBtn}
        onClick={() => dispatch(setStepIndexAction(index))}
        type="button"
      >
        <p className={styles.stepText}>{index + 1}</p>
      </button>
      <button className={styles.stepBtnSmall} type="button" onClick={handleSettingsButtonClick}>
        <img className={styles.img} src="./settings.svg" alt="settings icon" />
      </button>
    </div>
  );
};

export default DraggableStep;
