import { games } from '../../context/config';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { storeCurrentSymbolIdAction } from '../../services/actions';
import styles from './SymbolTab.module.css';

const SymbolTab = () => {
  const dispatch = useAppDispatch();
  const { chosenGame } = useAppSelector((state) => state.mainReducer);

  const config = games[chosenGame - 1];

  const handleButtonClick = (src: string) => {
    const key = Object.keys(config.imgPaths).find((keyValue) => config.imgPaths[Number(keyValue)] === src);

    dispatch(storeCurrentSymbolIdAction(Number(key)));
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Список всех символов в игре</p>
      <div className={styles.container}>
        {Object.values(config.imgPaths).map((src, index) => {
          return (
            <button className={styles.btn} key={src} type="button" onClick={() => handleButtonClick(src)}>
              <img className={styles.img} src={src} alt={`Symbol ${index}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SymbolTab;
