import { ChangeEvent, useRef, useState } from 'react';
import styles from './App.module.css';
import Playground from '../Playground/Playground';
import StepList from '../StepList/StepList';
import StepConfiguration from '../StepConfiguration/StepConfiguration';
import { Cluster, Step } from '../../context/interfaces';
import { handleDownloadClick } from '../../dataDownloader';

export interface AppState {
  steps: Array<Step>;
  currentStepId: number;
  currentTargetId: number;
  isSelectingClusterSymbols: boolean;
  currentEventIndex: number;
  currentClusterIndex: number;
}

const App = () => {
  const lastStepIdRef = useRef(1);
  const [appState, setAppState] = useState<AppState>({
    steps: [
      {
        id: 1,
        payload: {
          beforeSymbols: [
            { id: 5, indices: [0], properties: { multiplier: 8 } },
            { id: 6, indices: [1], properties: { multiplier: 8 } },
            { id: 7, indices: [2], properties: { multiplier: 8 } },
            { id: 8, indices: [3], properties: { multiplier: 8 } },
            { id: 15, indices: [4], properties: { multiplier: 8 } },
            { id: 5, indices: [5], properties: { multiplier: 8 } },
            { id: 6, indices: [6], properties: { multiplier: 8 } },
            { id: 7, indices: [7], properties: { multiplier: 8 } },
            { id: 8, indices: [8], properties: { multiplier: 8 } },
            { id: 15, indices: [9], properties: { multiplier: 8 } },
            { id: 5, indices: [10], properties: { multiplier: 8 } },
            { id: 6, indices: [11], properties: { multiplier: 8 } },
            { id: 7, indices: [12], properties: { multiplier: 8 } },
            { id: 8, indices: [13], properties: { multiplier: 8 } },
            { id: 15, indices: [14], properties: { multiplier: 8 } },
            { id: 5, indices: [15], properties: { multiplier: 8 } },
            { id: 6, indices: [16], properties: { multiplier: 8 } },
            { id: 7, indices: [17], properties: { multiplier: 8 } },
            { id: 8, indices: [18], properties: { multiplier: 8 } },
            { id: 15, indices: [19], properties: { multiplier: 8 } },
          ],
          nextStepType: 1,
          events: [],
        },
        cost: 0,
        stepWin: 100,
        totalWin: 0,
        type: 1,
      },
    ],
    currentStepId: 1,
    currentTargetId: 5,
    isSelectingClusterSymbols: false,
    currentEventIndex: 0,
    currentClusterIndex: 0,
  });

  const handleCellClick = (index: number) => {
    if (!appState.isSelectingClusterSymbols) {
      setAppState((prev) => {
        const { steps, currentStepId } = prev;
        const stepsCopy = [...steps];
        const currentStep = stepsCopy.find((step) => step.id === currentStepId);
        const symbols = currentStep?.payload.beforeSymbols;
        const targetSymbol = symbols?.find((symbol) =>
          symbol.indices.includes(index)
        );
        targetSymbol!.id = appState.currentTargetId;
        return { ...prev, steps: stepsCopy };
      });
    } else {
      setAppState((prev) => {
        const { steps, currentStepId } = prev;
        const stepsCopy = [...steps];
        const currentStep = stepsCopy.find((step) => step.id === currentStepId);
        const clusters = currentStep?.payload.events[prev.currentEventIndex];
        const targetCluster = clusters?.clusters?.[prev.currentClusterIndex];
        if (targetCluster!.indices.includes(index)) {
          targetCluster!.indices = targetCluster!.indices.filter(
            (i) => i !== index
          );
          return { ...prev, steps: stepsCopy };
        } else {
          targetCluster!.indices.push(index);
          return { ...prev, steps: stepsCopy };
        }
      });
    }
  };

  const handleMiniPlaygroundCellClick = (index: number) => {
    if (!appState.isSelectingClusterSymbols) {
      setAppState((prev) => {
        const { steps, currentStepId } = prev;
        const stepsCopy = [...steps];
        const currentStep = stepsCopy.find((step) => step.id === currentStepId);
        const symbols =
          currentStep?.payload.events[prev.currentEventIndex].symbols;
        const targetSymbol = symbols?.find((symbol) =>
          symbol.indices.includes(index)
        );
        targetSymbol!.id = appState.currentTargetId;
        return { ...prev, steps: stepsCopy };
      });
    } else {
      setAppState((prev) => {
        const { steps, currentStepId } = prev;
        const stepsCopy = [...steps];
        const currentStep = stepsCopy.find((step) => step.id === currentStepId);
        currentStep!.payload.events[prev.currentEventIndex].clusters![
          prev.currentClusterIndex
        ].indices.push(index);
        return { ...prev, steps: stepsCopy };
      });
    }
  };

  const handleStepTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentStepType = parseInt(event.target.value);
    setAppState((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === prev.currentStepId
          ? { ...step, type: currentStepType }
          : step
      ),
    }));
  };

  const getSymbolIds = () => {
    const { steps, currentStepId } = appState;
    const currentStep = steps.find((step) => step.id === currentStepId);
    if (currentStep) {
      return currentStep.payload.beforeSymbols.map((symbol) => symbol.id);
    }
    return [];
  };

  const handleSymbolClick = (id: number) => {
    setAppState((prev) => ({ ...prev, currentTargetId: id }));
  };

  const handleMultiplierChange = (index: number, multiplier: number) => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      const symbols = currentStep?.payload.beforeSymbols;
      const targetSymbol = symbols?.find((symbol) =>
        symbol.indices.includes(index)
      );
      targetSymbol!.properties.multiplier = multiplier;
      return { ...prev, steps: stepsCopy };
    });
  };

  const addNewStep = () => {
    lastStepIdRef.current += 1;
    setAppState((prev) => {
      const newStep: Step = {
        id: lastStepIdRef.current,
        payload: {
          beforeSymbols: prev.steps[
            prev.steps.length - 1
          ].payload.beforeSymbols.map((symbol) => ({ ...symbol })),
          nextStepType: 1,
          events: [],
        },
        cost: 0,
        stepWin: 0,
        totalWin: 0,
        type: 1,
      };
      return {
        ...prev,
        steps: [...prev.steps, newStep],
        currentStepId: lastStepIdRef.current,
      };
    });
  };

  const handleCurrentStepIdChange = (id: number) => {
    setAppState((prev) => ({ ...prev, currentStepId: id }));
  };

  const removeStep = (id: number) => {
    setAppState((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== id),
    }));
  };

  const handleAddEvent = () => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      currentStep!.payload.events.push({
        type: 1,
      });
      return { ...prev, steps: stepsCopy };
    });
  };

  const getEventsForCurrentStep = () => {
    const { steps, currentStepId } = appState;
    const currentStep = steps.find((step) => step.id === currentStepId);
    return currentStep?.payload.events;
  };

  const handleChangeEventType = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      currentStep!.payload.events[index].type = parseInt(event.target.value);
      if (parseInt(event.target.value) === 1) {
        currentStep!.payload.events[index].clusters = [
          { id: 1, win: 1, indices: [] },
        ];
      }
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleChangeClusterId = (
    event: ChangeEvent<HTMLSelectElement>,
    eventIndex: number,
    clusterIndex: number
  ) => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      currentStep!.payload.events[eventIndex].clusters![clusterIndex].id =
        parseInt(event.target.value);
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleClusterIndicesChange = (index: number, eventIndex: number) => {
    setAppState((prev) => {
      return {
        ...prev,
        isSelectingClusterSymbols: !prev.isSelectingClusterSymbols,
        currentClusterIndex: index,
        currentEventIndex: eventIndex,
      };
    });
  };

  const handleChangeWinValue = (
    event: ChangeEvent<HTMLInputElement>,
    eventIndex: number,
    clusterIndex: number
  ) => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      currentStep!.payload.events[eventIndex].clusters![clusterIndex].win =
        parseInt(event.target.value);
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleClearClusterIndices = () => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      const clusters = currentStep?.payload.events[prev.currentEventIndex];
      const targetCluster = clusters?.clusters?.[prev.currentClusterIndex];
      targetCluster!.indices = [];
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleAddNewClusterItem = () => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      const clusters = currentStep?.payload.events[prev.currentEventIndex];
      const currentClusters = clusters?.clusters as Cluster[];
      currentClusters.push({ id: 1, win: 1, indices: [] });
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleAdrenalineMultiplierChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      currentStep!.payload.events[prev.currentEventIndex].multiplier = parseInt(
        event.target.value
      );
      return { ...prev, steps: stepsCopy };
    });
  };

  const handleMiniPlaygroundInit = () => {
    setAppState((prev) => {
      const { steps, currentStepId } = prev;
      const stepsCopy = [...steps];
      const currentStep = stepsCopy.find((step) => step.id === currentStepId);
      const currentEvent = currentStep?.payload.events[prev.currentEventIndex];
      if (!currentEvent?.symbols) {
        currentEvent!.symbols = prev.steps[
          prev.steps.length - 1
        ].payload.beforeSymbols.map((symbol) => ({ ...symbol }));
      }
      if (!currentStep!.payload.events[appState.currentEventIndex + 1])
        currentStep!.payload.events.push({ type: 1, clusters: [] });
      return { ...prev, steps: stepsCopy };
    });
  };

  const getMiniPlaygroundSymbols = () => {
    const { steps, currentStepId } = appState;
    const currentStep = steps.find((step) => step.id === currentStepId);
    const targetEvent =
      currentStep?.payload.events.find((event) => event.type === 2) || null;
    return targetEvent?.symbols;
  };

  const handleChangeCurrentEventIndex = (index: number) => {
    setAppState((prev) => ({ ...prev, currentEventIndex: index }));
  };

  return (
    <div className={styles.app}>
      <button
        className={styles.btn}
        onClick={() => handleDownloadClick(appState.steps)}
      >
        Скачать степы
      </button>
      <StepList
        steps={appState.steps}
        onCurrentStepIdChange={handleCurrentStepIdChange}
        onAddNewStep={addNewStep}
        onRemoveStep={removeStep}
      />
      <StepConfiguration
        events={getEventsForCurrentStep()}
        onStepTypeChange={handleStepTypeChange}
        onSymbolClick={handleSymbolClick}
        onAddEvent={handleAddEvent}
        onChangeEventType={handleChangeEventType}
        onChangeClusterId={handleChangeClusterId}
        onChangeWinValue={handleChangeWinValue}
        onChangeClusterIndices={handleClusterIndicesChange}
        onClearClusterIndices={handleClearClusterIndices}
        onAddNewClusterItem={handleAddNewClusterItem}
        onAdrenalineMultiplierChange={handleAdrenalineMultiplierChange}
        onMiniPlaygroundInit={handleMiniPlaygroundInit}
        miniPlaygroundSymbols={getMiniPlaygroundSymbols()}
        onMiniPlaygroundCellClick={handleMiniPlaygroundCellClick}
        isSelectingClusterSymbols={appState.isSelectingClusterSymbols}
        onChangeEventIndex={handleChangeCurrentEventIndex}
      />
      <Playground
        getSymbolIds={getSymbolIds}
        currentStepId={appState.currentStepId}
        onCellClick={handleCellClick}
        onMultiplierChange={handleMultiplierChange}
        isSelectingClusterSymbols={appState.isSelectingClusterSymbols}
      />
    </div>
  );
};

export default App;
