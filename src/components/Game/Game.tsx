import DataTransferPanel from '../DataTransferPanel/DataTransferPanel';
import BoardContainer from '../EventBoardContainer/EventBoardContainer';
import StepList from '../StepList/StepList';
import styles from './Game.module.css';

const Game = () => {
  return (
    <div className={styles.game}>
      <StepList />
      <BoardContainer />
      <DataTransferPanel />
    </div>
  );
};

export default Game;
