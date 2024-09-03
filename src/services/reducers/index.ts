/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-cycle */
/* TODO: Remove all eslint-disable comments */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Edge, Node } from '@xyflow/react';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';

import {
  addFreeSpins,
  addNewNode,
  addNewStep,
  changeNextStepType,
  changeStepCost,
  changeStepType,
  changeStepWin,
  changeSymbolIdInInit,
  changeSymbolInitMultiplier,
  changeTotalWin,
  randomizeSymbols,
  removeStep,
  reorderSteps,
  setGame,
  setNewReels,
  setStepIndex,
  storeCurrentNodeId,
  storeCurrentSymbolId,
  toggleModal,
  toggleStepSettingsTab,
  updateAfterSymbols,
  updateCurrentMultiplier,
  updateCustomSchemas,
  updateEdgesStorage,
  updateEvent,
  updateNodeStorage,
  updateState,
} from '../../context/actions';
import { nodeTemplate } from '../../context/templates';
import {
  AddFreeSpinsAction,
  AddNewNodeAction,
  AddNewStepAction,
  ChangeNextStepTypeAction,
  ChangeStepCostAction,
  ChangeStepTypeAction,
  ChangeStepWinAction,
  ChangeSymbolIdInInitAction,
  ChangeSymbolInitMultiplierAction,
  ChangeTotalWinAction,
  RandomizeSymbolsAction,
  RemoveStepAction,
  ReorderStepsAction,
  SetGameAction,
  SetNewReelsAction,
  SetStepIndexAction,
  StoreCurrentNodeIdAction,
  StoreCurrentSymbolIdAction,
  ToggleModalAction,
  ToggleStepSettingsTabAction,
  UpdateAfterSymbolsAction,
  UpdateCurrentMultiplierAction,
  UpdateCustomSchemasAction,
  UpdateEdgeStorageAction,
  UpdateEventAction,
  UpdateNodeStorageAction,
  UpdateStateAction,
} from '../../interfaces/actions';
import { CommonSchema } from '../../interfaces/commonSchema';
import { CustomSchema } from '../../interfaces/customSchema';
import { GameEvents } from '../../interfaces/events';
import { Games, MultiplierInitValue } from '../../interfaces/games';
import { Step, StepTypes } from '../../interfaces/step';
import { updateStateAction } from '../actions';
import { updateReelsStateAction } from '../actions/reelsState';
import { reelStateReducer } from './reelsState';

const saveStateToSessionStorage = (state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    throw new Error('Could not save state to sessionStorage');
  }
};

const loadStateFromSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveStateToLocalStorage = (state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    throw new Error('Could not save state to localStorage');
  }
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedStore = loadStateFromSessionStorage();

type Actions =
  | SetGameAction
  | SetStepIndexAction
  | AddNewStepAction
  | ReorderStepsAction
  | RemoveStepAction
  | UpdateNodeStorageAction
  | UpdateEdgeStorageAction
  | AddNewNodeAction
  | ToggleModalAction
  | StoreCurrentNodeIdAction
  | StoreCurrentSymbolIdAction
  | ChangeSymbolIdInInitAction
  | UpdateEventAction
  | UpdateAfterSymbolsAction
  | RandomizeSymbolsAction
  | SetNewReelsAction
  | ChangeSymbolInitMultiplierAction
  | ToggleStepSettingsTabAction
  | ChangeStepCostAction
  | ChangeNextStepTypeAction
  | ChangeStepWinAction
  | ChangeTotalWinAction
  | ChangeStepTypeAction
  | UpdateCurrentMultiplierAction
  | AddFreeSpinsAction
  | UpdateCustomSchemasAction
  | UpdateStateAction;

export interface State {
  steps: Step[];
  chosenGame: Games;
  currentStepIndex: number;
  commonSchema: CommonSchema[];
  customSchema: CustomSchema[];
  nodesStorage: Node[][];
  edgesStorage: Edge[][];
  isModalOpen: boolean;
  currentNodeId: string;
  currentSymbolId: number;
  symbolsAmount: number;
  isStepSettingsTabOpen: boolean;
  stepTemplate?: Step;
  symbolsWithMultiplier?: MultiplierInitValue[];
  deleteDataForNextStep?: boolean;
  isStateJustUploaded?: boolean;
}

const initialState: State = {
  steps: [],
  chosenGame: Games.None,
  currentStepIndex: 0,
  commonSchema: [],
  customSchema: [],
  nodesStorage: [[nodeTemplate]],
  edgesStorage: [[]],
  isModalOpen: false,
  currentNodeId: 'init',
  currentSymbolId: 1,
  symbolsAmount: 0,
  isStepSettingsTabOpen: false,
};

const updateStep = (state: State, currentStepIndex: number, newStep: Step) => {
  return [...state.steps.slice(0, currentStepIndex), newStep, ...state.steps.slice(currentStepIndex + 1)];
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const mainReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case setGame: {
      return {
        ...state,
        chosenGame: action.payload.gameName,
        steps: [action.payload.stepTemplate],
        commonSchema: action.payload.commonSchema,
        customSchema: action.payload.customSchema,
        stepTemplate: action.payload.stepTemplate,
        symbolsAmount: action.payload.symbolsAmount,
        symbolsWithMultiplier: action.payload.symbolsWithMultiplier,
      };
    }
    case setStepIndex: {
      return {
        ...state,
        currentStepIndex: action.payload.stepIndex,
      };
    }
    case addNewStep: {
      const newStep = {
        ...state.steps[state.steps.length - 1],
        payload: {
          ...state.steps[state.steps.length - 1].payload,
          events: [],
          beforeSymbols: state.stepTemplate?.payload.beforeSymbols,
          afterSymbols: state.stepTemplate?.payload.afterSymbols,
        },
      };

      if (state.deleteDataForNextStep) {
        if (newStep.payload.currentMultiplier) {
          delete newStep.payload.currentMultiplier;
        }

        return {
          ...state,
          steps: [...state.steps, newStep],
          deleteDataForNextStep: false,
          nodesStorage: [...state.nodesStorage, [nodeTemplate]],
          edgesStorage: [...state.edgesStorage, []],
        };
      }

      const newStepPayloadCopy = structuredClone(newStep.payload);

      if (newStepPayloadCopy.counter?.added) {
        newStepPayloadCopy.counter.left += newStepPayloadCopy.counter.added;
        newStepPayloadCopy.counter.added = 0;
      }

      if (newStepPayloadCopy.counter?.left !== undefined) {
        newStep.type = StepTypes.BonusGame;
        newStepPayloadCopy.nextStepType = StepTypes.BonusGame;
        newStepPayloadCopy.counter.left -= 1;
        newStepPayloadCopy.counter.played += 1;
      }

      if (newStepPayloadCopy.counter?.left === 0) {
        newStepPayloadCopy.nextStepType = StepTypes.BaseGame;
      }

      if (newStepPayloadCopy.counter?.left === -1) {
        newStep.type = StepTypes.BaseGame;
        newStepPayloadCopy.nextStepType = StepTypes.BaseGame;
        delete newStepPayloadCopy.counter;
        if (newStepPayloadCopy.currentMultiplier) {
          delete newStepPayloadCopy.currentMultiplier;
        }
      }

      newStep.payload = newStepPayloadCopy;

      return {
        ...state,
        steps: [...state.steps, newStep],
        nodesStorage: [...state.nodesStorage, [nodeTemplate]],
        edgesStorage: [...state.edgesStorage, []],
      };
    }
    case reorderSteps: {
      const newSteps = [...state.steps];
      const [reorderedItem] = newSteps.splice(action.payload.dragIndex, 1);
      newSteps.splice(action.payload.hoverIndex, 0, reorderedItem);

      const newNodes = [...state.nodesStorage];
      const [reorderedNodes] = newNodes.splice(action.payload.dragIndex, 1);
      newNodes.splice(action.payload.hoverIndex, 0, reorderedNodes);

      const newEdges = [...state.edgesStorage];
      const [reorderedEdges] = newEdges.splice(action.payload.dragIndex, 1);
      newEdges.splice(action.payload.hoverIndex, 0, reorderedEdges);
      return { ...state, steps: newSteps, nodesStorage: newNodes, edgesStorage: newEdges };
    }
    case removeStep: {
      if (state.steps.length > 1) {
        const newSteps = state.steps.filter((_, index) => index !== action.payload.stepIndex);

        const newNodes = state.nodesStorage.filter((_, index) => index !== action.payload.stepIndex);

        const newEdges = state.edgesStorage.filter((_, index) => index !== action.payload.stepIndex);

        return {
          ...state,
          steps: newSteps,
          nodesStorage: newNodes,
          edgesStorage: newEdges,
        };
      }
      return state;
    }
    case updateNodeStorage: {
      const newNodesStorage = [...state.nodesStorage];
      newNodesStorage[state.currentStepIndex] = action.payload.nodes;
      return {
        ...state,
        nodesStorage: newNodesStorage,
      };
    }
    case updateEdgesStorage: {
      const newEdgesStorage = [...state.edgesStorage];
      const currentEdges = action.payload.edges;
      const isDeleting = currentEdges.length < newEdgesStorage[state.currentStepIndex].length;

      if (currentEdges.length > 0 && currentEdges[0].source !== 'init') {
        const initIndex = currentEdges.findIndex((edge) => edge.source === 'init');
        if (initIndex !== -1) {
          currentEdges.splice(0, initIndex);
        }
      }

      newEdgesStorage[state.currentStepIndex] = currentEdges;

      const newSteps = [...state.steps];
      const currentStep = newSteps[state.currentStepIndex];
      const currentEvents = currentStep.payload.events;

      if (currentEvents.length < currentEdges.length) {
        for (let i = currentEvents.length; i < currentEdges.length; i += 1) {
          currentEvents.push({} as GameEvents);
        }
      } else if (currentEvents.length > currentEdges.length) {
        currentEvents.splice(currentEdges.length);
      }

      if (isDeleting) {
        const currentExistingEdges = newEdgesStorage[state.currentStepIndex];
        const doesInitExist = currentExistingEdges.find((edge) => edge.source === 'init');
        const lastExistingEdge = currentExistingEdges[currentExistingEdges.length - 1];
        if (lastExistingEdge === undefined || !doesInitExist) {
          currentStep.payload = {
            ...currentStep.payload,
            afterSymbols: currentStep.payload.beforeSymbols,
          };
        } else {
          currentStep.payload = {
            ...currentStep.payload,
            afterSymbols: action.payload.reels[lastExistingEdge.target],
          };
        }
      }

      return {
        ...state,
        edgesStorage: newEdgesStorage,
        steps: newSteps,
      };
    }
    case addNewNode: {
      const newNodes = [...state.nodesStorage[state.currentStepIndex]];
      newNodes.push(action.payload.node);
      return {
        ...state,
        nodesStorage: [
          ...state.nodesStorage.slice(0, state.currentStepIndex),
          newNodes,
          ...state.nodesStorage.slice(state.currentStepIndex + 1),
        ],
      };
    }
    case toggleModal: {
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    }
    case storeCurrentNodeId: {
      return {
        ...state,
        currentNodeId: action.payload.nodeId,
      };
    }
    case storeCurrentSymbolId: {
      return {
        ...state,
        currentSymbolId: action.payload.symbolId,
      };
    }
    case changeSymbolIdInInit: {
      const newStep = { ...state.steps[state.currentStepIndex] };

      const newBeforeSymbols = [...newStep.payload.beforeSymbols];

      newBeforeSymbols[action.payload.index] = {
        ...newBeforeSymbols[action.payload.index],
        id: state.currentSymbolId,
        properties: {
          ...newBeforeSymbols[action.payload.index].properties,
          multiplier:
            state.symbolsWithMultiplier?.find((multiplier) => multiplier.id === state.currentSymbolId)?.value ?? 1,
        },
      };

      newStep.payload = {
        ...newStep.payload,
        beforeSymbols: newBeforeSymbols,
      };

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case updateEvent: {
      const newSteps = [...state.steps];
      const currentStep = newSteps[state.currentStepIndex];
      const currentEvents = currentStep.payload.events;
      const nodeIndex = state.nodesStorage[state.currentStepIndex].findIndex((node) => node.id === state.currentNodeId);
      currentEvents[nodeIndex - 1] = action.payload.event;

      return {
        ...state,
        steps: newSteps,
      };
    }
    case updateAfterSymbols: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      const afterSymbols = newStep.payload.afterSymbols.map((symbol) => ({ ...symbol }));
      afterSymbols[action.payload.index].id = state.currentSymbolId;
      afterSymbols[action.payload.index].properties = {
        ...afterSymbols[action.payload.index].properties,
        multiplier:
          state.symbolsWithMultiplier?.find((multiplier) => multiplier.id === state.currentSymbolId)?.value ?? 1,
      };

      newStep.payload = {
        ...newStep.payload,
        afterSymbols,
      };

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case randomizeSymbols: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      const availableIds = action.payload.randomGenIds;

      const beforeSymbols = newStep.payload.beforeSymbols.map((symbol) => {
        let newId;
        if (availableIds && availableIds.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableIds.length);
          newId = availableIds[randomIndex];
        } else {
          newId = Math.floor(Math.random() * state.symbolsAmount);
        }
        return { ...symbol, id: newId };
      });

      newStep.payload = {
        ...newStep.payload,
        beforeSymbols,
        afterSymbols: beforeSymbols,
      };

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case setNewReels: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      const newReels = action.payload.reels.map((symbol) => ({ ...symbol }));
      newStep.payload = {
        ...newStep.payload,
        afterSymbols: [...newReels],
      };

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case changeSymbolInitMultiplier: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      const beforeSymbols = newStep.payload.beforeSymbols.map((symbol, index) => {
        if (index === action.payload.index) {
          return {
            ...symbol,
            properties: {
              ...symbol.properties,
              multiplier: action.payload.multiplier,
            },
          };
        }
        return symbol;
      });

      newStep.payload = {
        ...newStep.payload,
        beforeSymbols,
      };

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case toggleStepSettingsTab: {
      return {
        ...state,
        isStepSettingsTabOpen: !state.isStepSettingsTabOpen,
      };
    }
    case changeStepCost: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      newStep.cost = action.payload.cost;

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case changeNextStepType: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      newStep.payload.nextStepType = action.payload.nextStepType;

      if (action.payload.nextStepType === StepTypes.BonusGame && !newStep.payload.counter) {
        newStep.payload.counter = {
          left: 0,
          played: 0,
          added: 0,
        };
      }

      if (
        action.payload.nextStepType === StepTypes.BaseGame &&
        newStep.type === StepTypes.BaseGame &&
        newStep.payload.counter
      ) {
        delete newStep.payload.counter;
      }

      if (action.payload.nextStepType === StepTypes.BaseGame && newStep.payload.currentMultiplier) {
        return {
          ...state,
          deleteDataForNextStep: true,
          steps: updateStep(state, state.currentStepIndex, newStep),
        };
      }

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case changeStepWin: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      newStep.stepWin = action.payload.stepWin;

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case changeTotalWin: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      newStep.totalWin = action.payload.totalWin;

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case changeStepType: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      newStep.type = action.payload.type;

      if (action.payload.type === StepTypes.BonusGame && !newStep.payload.counter) {
        newStep.payload = {
          ...newStep.payload,
          counter: {
            left: 0,
            played: 0,
            added: 0,
          },
        };
      }

      if (
        action.payload.type === StepTypes.BaseGame &&
        newStep.payload.nextStepType === StepTypes.BaseGame &&
        newStep.payload.counter
      ) {
        delete newStep.payload.counter;
      }

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case updateCurrentMultiplier: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      if (!newStep.payload.currentMultiplier) newStep.payload.currentMultiplier = action.payload.currentMultiplier;
      else newStep.payload.currentMultiplier += action.payload.currentMultiplier;

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case addFreeSpins: {
      const newStep = { ...state.steps[state.currentStepIndex] };
      if (!newStep.payload.counter) {
        newStep.payload.counter = {
          left: 0,
          played: 0,
          added: action.payload.added,
        };
      } else {
        newStep.payload.counter.added = action.payload.added;
      }

      return {
        ...state,
        steps: updateStep(state, state.currentStepIndex, newStep),
      };
    }
    case updateCustomSchemas: {
      return {
        ...state,
        customSchema: action.payload.schemas,
        isStateJustUploaded: false,
      };
    }
    case updateState: {
      return {
        ...state,
        ...action.payload.state,
        isStateJustUploaded: true,
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({ mainReducer, reelStateReducer });

export const store = legacy_createStore(rootReducer, persistedStore, applyMiddleware(thunk));

store.subscribe(() => {
  saveStateToSessionStorage(store.getState());
});

export const saveCurrentStateToLocalStorage = () => {
  saveStateToLocalStorage(store.getState());
};

export const loadStateFromLocalStorageAndUpdateRedux = () => {
  const state = loadStateFromLocalStorage();
  if (state) {
    store.dispatch(updateStateAction(state.mainReducer));
    store.dispatch(updateReelsStateAction(state.reelStateReducer));
  }
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
