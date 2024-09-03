import { games } from '../../context/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changeSymbolIdInInitAction,
  changeSymbolInitMultiplierAction,
  updateAfterSymbolsAction,
} from '../../services/actions';
import { changeSymbolIdAction, changeSymbolMultiplierAction } from '../../services/actions/reelsState';
import Reels from '../Reels/Reels';
import styles from './Playground.module.css';

const Playground = () => {
  const dispatch = useAppDispatch();
  const { chosenGame, steps, currentStepIndex, currentNodeId, currentSymbolId, nodesStorage, symbolsWithMultiplier } =
    useAppSelector((state) => state.mainReducer);
  const { reels } = useAppSelector((state) => state.reelStateReducer);

  const currentStep = steps[currentStepIndex];
  const config = games[chosenGame - 1];
  const isInitNode = currentNodeId === 'init';
  const width = isInitNode ? config.rows * 6 : config.rows * 5;

  const handleButtonClickInitType = (index: number) => {
    dispatch(changeSymbolIdInInitAction(index));
    if (nodesStorage[currentStepIndex].length > 1) {
      dispatch(
        changeSymbolIdAction(
          currentSymbolId,
          nodesStorage[currentStepIndex][1].id,
          index,
          nodesStorage[currentStepIndex] as unknown as Node[],
          symbolsWithMultiplier,
        ),
      );
    }

    dispatch(updateAfterSymbolsAction(index));
  };

  const handleButtonClick = (index: number) => {
    dispatch(
      changeSymbolIdAction(
        currentSymbolId,
        currentNodeId,
        index,
        nodesStorage[currentStepIndex] as unknown as Node[],
        symbolsWithMultiplier,
      ),
    );
    dispatch(updateAfterSymbolsAction(index));
  };

  const handleMultiplierChange = (index: number, multiplier: number, nodeId?: string) => {
    let validatedMultiplier = multiplier;
    if (multiplier < 0.1) validatedMultiplier = 0.1;
    if (nodeId) {
      dispatch(changeSymbolMultiplierAction(index, validatedMultiplier, nodeId));
    } else {
      dispatch(changeSymbolInitMultiplierAction(index, validatedMultiplier));
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Барабан</p>
      <div className={styles.container} style={{ width: `${width}rem` }}>
        {isInitNode ? (
          <Reels
            reels={currentStep.payload.beforeSymbols ?? []}
            imagePaths={config.imgPaths}
            onInputChange={handleMultiplierChange}
            onButtonClick={handleButtonClickInitType}
          />
        ) : (
          <div className={styles.reels}>
            <Reels
              reels={reels[currentNodeId]}
              imagePaths={config.imgPaths}
              onInputChange={handleMultiplierChange}
              onButtonClick={handleButtonClick}
              currentNodeId={currentNodeId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
