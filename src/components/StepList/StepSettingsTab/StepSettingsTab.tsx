// @ts-nocheck
import { ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { StepTypes } from '../../../interfaces/step';
import {
  addFreeSpinsAction,
  changeNextStepTypeAction,
  changeStepCostAction,
  changeStepTypeAction,
  changeStepWinAction,
  changeTotalWinAction,
  updateCurrentMultiplierAction,
} from '../../../services/actions';
import Container from '../../UI/Container/Container';
import Input from '../../UI/Input/Input';
import Select from '../../UI/Select/Select';
import Text from '../../UI/Text/Text';
import styles from './StepSettingsTab.module.css';

const StepSettingsTab = () => {
  const dispatch = useAppDispatch();
  const { currentStepIndex, steps } = useAppSelector(
    (state) => state.mainReducer
  );

  return (
    <div className={styles.settingsTabContainer}>
      <div className={styles.settingsTab}>
        <Container>
          <Text text="Цена шага" />
          <Input
            type="number"
            placeholder="Cost"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(changeStepCostAction(Number(e.target.value)))
            }
            value={steps[currentStepIndex].cost}
          />
        </Container>
        <Container>
          <Text text="Тип следующего шага" />
          <Select
            options={[
              { value: StepTypes.BaseGame, text: 'Обычная игра' },
              { value: StepTypes.BonusGame, text: 'Бонусная игра' },
            ]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              dispatch(changeNextStepTypeAction(Number(e.target.value)))
            }
            value={steps[currentStepIndex].payload.nextStepType}
          />
        </Container>
        <Container>
          <Text text="Сумма выигрыша в этом шаге" />
          <Input
            type="number"
            placeholder="Step Win"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(changeStepWinAction(Number(e.target.value)))
            }
            value={steps[currentStepIndex].stepWin}
          />
        </Container>
        <Container>
          <Text text="Сумма выигрыша за раунд" />
          <Input
            type="number"
            placeholder="Total Win"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(changeTotalWinAction(Number(e.target.value)))
            }
            value={steps[currentStepIndex].totalWin}
          />
        </Container>
        <Container>
          <Text text="Тип этого шага" />
          <Select
            options={[
              { value: StepTypes.BaseGame, text: 'Обычная игра' },
              { value: StepTypes.BonusGame, text: 'Бонусная игра' },
            ]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              dispatch(changeStepTypeAction(Number(e.target.value)))
            }
            value={steps[currentStepIndex].type}
          />
        </Container>
        {steps[currentStepIndex].payload.counter && (
          <div className={styles.fsContainer}>
            <Container>
              <Text text="Добавить фри спины" />
              <Input
                type="number"
                placeholder="Add Free Spins"
                value={steps[currentStepIndex].payload.counter.added}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch(addFreeSpinsAction(Number(e.target.value)))
                }
              />
            </Container>
            <Container>
              <Text text="Сколько осталось фри спинов" />
              <Input
                type="number"
                placeholder="Free Spins Left"
                value={steps[currentStepIndex].payload.counter.left}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  e.preventDefault()
                }
                disabled
              />
            </Container>
            <Container>
              <Text text="Сколько сыграно фри спинов" />
              <Input
                type="number"
                placeholder="Free Spins Played"
                value={steps[currentStepIndex].payload.counter.played}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  e.preventDefault()
                }
                disabled
              />
            </Container>
          </div>
        )}
        {steps[currentStepIndex].payload.currentMultiplier && (
          <Container>
            <Text text="Текущий множитель" />
            <Input
              type="number"
              placeholder="Current Multiplier"
              value={steps[currentStepIndex].payload.currentMultiplier}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch(updateCurrentMultiplierAction(Number(e.target.value)))
              }
            />
          </Container>
        )}
      </div>
    </div>
  );
};

export default StepSettingsTab;
