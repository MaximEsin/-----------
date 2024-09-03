/* eslint-disable import/no-cycle */
import { Edge, Node } from '@xyflow/react';

import {
  addFreeSpins,
  addNewNode,
  addNewReels,
  addNewStep,
  changeNextStepType,
  changeStepCost,
  changeStepType,
  changeStepWin,
  changeSymbolId,
  changeSymbolIdInInit,
  changeSymbolInitMultiplier,
  changeSymbolMultiplier,
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
  updateReelsState,
  updateState,
} from '../context/actions';
import { State } from '../services/reducers';
import { ReelsState } from '../services/reducers/reelsState';
import { CommonSchema } from './commonSchema';
import { CustomSchema } from './customSchema';
import { GameEvents } from './events';
import { Games, MultiplierInitValue } from './games';
import { ReelSymbol, Step, StepTypes } from './step';

export interface SetGameAction {
  readonly type: typeof setGame;
  payload: {
    gameName: Games;
    stepTemplate: Step;
    commonSchema: CommonSchema[];
    customSchema: CustomSchema[];
    symbolsAmount: number;
    symbolsWithMultiplier?: MultiplierInitValue[];
  };
}

export interface SetStepIndexAction {
  readonly type: typeof setStepIndex;
  payload: {
    stepIndex: number;
  };
}

export interface AddNewStepAction {
  readonly type: typeof addNewStep;
}

export interface ReorderStepsAction {
  readonly type: typeof reorderSteps;
  payload: {
    dragIndex: number;
    hoverIndex: number;
  };
}

export interface RemoveStepAction {
  readonly type: typeof removeStep;
  payload: {
    stepIndex: number;
  };
}

export interface UpdateNodeStorageAction {
  readonly type: typeof updateNodeStorage;
  payload: {
    nodes: Node[];
  };
}

export interface UpdateEdgeStorageAction {
  readonly type: typeof updateEdgesStorage;
  payload: {
    edges: Edge[];
    reels: { [nodeId: string]: ReelSymbol[] };
  };
}

export interface AddNewNodeAction {
  readonly type: typeof addNewNode;
  payload: {
    node: Node;
  };
}

export interface ToggleModalAction {
  readonly type: typeof toggleModal;
}

export interface StoreCurrentNodeIdAction {
  readonly type: typeof storeCurrentNodeId;
  payload: {
    nodeId: string;
  };
}

export interface StoreCurrentSymbolIdAction {
  readonly type: typeof storeCurrentSymbolId;
  payload: {
    symbolId: number;
  };
}

export interface ChangeSymbolIdInInitAction {
  readonly type: typeof changeSymbolIdInInit;
  payload: {
    index: number;
  };
}

export interface AddNewReelsAction {
  readonly type: typeof addNewReels;
  payload: {
    nodeId: string;
    symbols: ReelSymbol[];
  };
}

export interface ChangeSymbolIdAction {
  readonly type: typeof changeSymbolId;
  payload: {
    currentSymbolId: number;
    nodeId: string;
    index: number;
    nodesStorage: Node[];
    symbolsWithMultiplier: MultiplierInitValue[] | undefined;
  };
}

export interface UpdateEventAction {
  readonly type: typeof updateEvent;
  payload: {
    event: GameEvents;
  };
}

export interface UpdateAfterSymbolsAction {
  readonly type: typeof updateAfterSymbols;
  payload: {
    index: number;
  };
}

export interface RandomizeSymbolsAction {
  readonly type: typeof randomizeSymbols;
  payload: {
    randomGenIds: number[];
  };
}

export interface SetNewReelsAction {
  readonly type: typeof setNewReels;
  payload: {
    reels: ReelSymbol[];
  };
}

export interface ChangeSymbolInitMultiplierAction {
  readonly type: typeof changeSymbolInitMultiplier;
  payload: {
    index: number;
    multiplier: number;
  };
}

export interface ChangeSymbolMultiplierAction {
  readonly type: typeof changeSymbolMultiplier;
  payload: {
    index: number;
    multiplier: number;
    nodeId: string;
  };
}

export interface ToggleStepSettingsTabAction {
  readonly type: typeof toggleStepSettingsTab;
}

export interface ChangeStepCostAction {
  readonly type: typeof changeStepCost;
  payload: {
    cost: number;
  };
}

export interface ChangeNextStepTypeAction {
  readonly type: typeof changeNextStepType;
  payload: {
    nextStepType: StepTypes;
  };
}

export interface ChangeStepWinAction {
  readonly type: typeof changeStepWin;
  payload: {
    stepWin: number;
  };
}

export interface ChangeTotalWinAction {
  readonly type: typeof changeTotalWin;
  payload: {
    totalWin: number;
  };
}

export interface ChangeStepTypeAction {
  readonly type: typeof changeStepType;
  payload: {
    type: StepTypes;
  };
}

export interface UpdateCurrentMultiplierAction {
  readonly type: typeof updateCurrentMultiplier;
  payload: {
    currentMultiplier: number;
  };
}

export interface AddFreeSpinsAction {
  readonly type: typeof addFreeSpins;
  payload: {
    added: number;
  };
}

export interface UpdateCustomSchemasAction {
  readonly type: typeof updateCustomSchemas;
  payload: {
    schemas: CustomSchema[];
  };
}

export interface UpdateStateAction {
  readonly type: typeof updateState;
  payload: {
    state: State;
  };
}

export interface UpdateReelsStateAction {
  readonly type: typeof updateReelsState;
  payload: {
    state: ReelsState;
  };
}
