import { games } from '../../context/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { CommonSchema } from '../../interfaces/commonSchema';
import { CustomSchema } from '../../interfaces/customSchema';
import { Games, MultiplierInitValue } from '../../interfaces/games';
import { Step } from '../../interfaces/step';
import { setGameAction } from '../../services/actions';
import Game from '../Game/Game';
import styles from './ChooseGame.module.css';

const ChooseGame = () => {
  const dispatch = useAppDispatch();
  const { chosenGame } = useAppSelector((state) => state.mainReducer);

  const handleChooseGame = (
    gameName: Games,
    stepTemplate: Step,
    commonSchema: CommonSchema[],
    customSchema: CustomSchema[],
    symbolsAmount: number,
    symbolsWithMultiplier?: MultiplierInitValue[],
  ) => {
    dispatch(setGameAction(gameName, stepTemplate, commonSchema, customSchema, symbolsAmount, symbolsWithMultiplier));
  };

  return (
    <div className={styles.container}>
      {chosenGame === Games.None && (
        <div className={styles.tableContainer}>
          <h1 className={styles.title}>Выберите игру</h1>
          <div className={styles.table}>
            {games.map((game, index) => {
              return (
                <button
                  key={game.name}
                  className={styles.card}
                  onClick={() =>
                    handleChooseGame(
                      game.name,
                      game.stepTemplate,
                      game.commonSchema,
                      game.customSchema,
                      game.symbolsAmount,
                      game.symbolsWithMultiplier,
                    )
                  }
                  type="button"
                >
                  <p className={styles.text}>{Games[index + 1]}</p>
                  <img className={styles.img} src={game.img} alt="Game icon" />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {chosenGame !== Games.None && <Game />}
    </div>
  );
};

export default ChooseGame;
