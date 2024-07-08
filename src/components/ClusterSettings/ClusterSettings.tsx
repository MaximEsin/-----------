import { ChangeEvent, FC } from 'react';
import SelectElement from '../ui/selectElement/SelectElement';
import styles from './ClusterSettings.module.css';
import InputElement from '../ui/inputElement/InputElement';
import { Cluster } from '../../context/interfaces';
import Button from '../ui/button/Button';

interface ClusterSettingsProps {
  eventIndex: number;
  onChangeClusterId: (
    event: ChangeEvent<HTMLSelectElement>,
    eventIndex: number,
    clusterIndex: number
  ) => void;
  clusters: Cluster[] | undefined;
  onChangeWinValue: (
    event: ChangeEvent<HTMLInputElement>,
    eventIndex: number,
    clusterIndex: number
  ) => void;
  onChangeClusterIndices: (index: number, eventIndex: number) => void;
  onClearClusterIndices: () => void;
  onAddNewClusterItem: () => void;
}

const ClusterSettings: FC<ClusterSettingsProps> = ({
  eventIndex,
  onChangeClusterId,
  clusters,
  onChangeWinValue,
  onChangeClusterIndices,
  onClearClusterIndices,
  onAddNewClusterItem,
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Настройки кластера</p>
      {clusters
        ? clusters.map((cluster, index) => {
            return (
              <div key={index} className={styles.container}>
                <SelectElement
                  labelText={'Выбор героя'}
                  onChange={(event) =>
                    onChangeClusterId(event, eventIndex, index)
                  }
                  options={[
                    { name: 'Капитан', value: 1 },
                    { name: 'Солдат', value: 2 },
                    { name: 'Подрывник', value: 3 },
                    { name: 'Снайпер', value: 4 },
                  ]}
                  defaultValue={cluster.id}
                />
                <InputElement
                  labelText={'Сумма выигрыша'}
                  type={'number'}
                  onChange={(event) =>
                    onChangeWinValue(event, eventIndex, index)
                  }
                  defaultValue={cluster.win}
                />
                <p>Начать/перестать выбирать символы кластера</p>
                <div className={styles.elementContainer}>
                  <input
                    className={styles.input}
                    readOnly
                    value={cluster.indices.join(', ')}
                  />
                  <button
                    onClick={onClearClusterIndices}
                    className={styles.btn}
                  >
                    Стереть
                  </button>
                </div>
                <Button
                  text={'Выбрать'}
                  onClick={() => onChangeClusterIndices(index, eventIndex)}
                />
                {clusters.length === 1 && (
                  <div className={styles.newClusterBtn}>
                    <Button
                      text={'Добавить 2 кластер в этот ивент'}
                      onClick={onAddNewClusterItem}
                    />
                  </div>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ClusterSettings;
