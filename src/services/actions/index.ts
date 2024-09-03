import { Edge, Node } from '@xyflow/react';

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
import { CommonSchema } from '../../interfaces/commonSchema';
import { CustomSchema } from '../../interfaces/customSchema';
import { GameEvents } from '../../interfaces/events';
import { Games, MultiplierInitValue } from '../../interfaces/games';
import { ReelSymbol, Step, StepTypes } from '../../interfaces/step';
import { AppDispatch, State } from '../reducers';

export function setGameAction(
  gameName: Games,
  stepTemplate: Step,
  commonSchema: CommonSchema[],
  customSchema: CustomSchema[],
  symbolsAmount: number,
  symbolsWithMultiplier?: MultiplierInitValue[],
) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: setGame,
      payload: {
        gameName,
        stepTemplate,
        commonSchema,
        customSchema,
        symbolsAmount,
        symbolsWithMultiplier,
      },
    });
  };
}

export function setStepIndexAction(stepIndex: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: setStepIndex,
      payload: {
        stepIndex,
      },
    });
  };
}

export function addNewStepAction() {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: addNewStep,
    });
  };
}

export function reorderStepsAction(dragIndex: number, hoverIndex: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: reorderSteps,
      payload: {
        dragIndex,
        hoverIndex,
      },
    });
  };
}

export function removeStepAction(stepIndex: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: removeStep,
      payload: {
        stepIndex,
      },
    });
  };
}

export function updateNodeStorageAction(nodes: Node[]) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateNodeStorage,
      payload: {
        nodes,
      },
    });
  };
}

export function updateEdgeStorageAction(edges: Edge[], reels: { [nodeId: string]: ReelSymbol[] }) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateEdgesStorage,
      payload: {
        edges,
        reels,
      },
    });
  };
}

export function addNewNodeAction(node: Node) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: addNewNode,
      payload: {
        node,
      },
    });
  };
}

export function toggleModalAction() {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: toggleModal,
      payload: {},
    });
  };
}

export function storeCurrentNodeIdAction(nodeId: string) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: storeCurrentNodeId,
      payload: {
        nodeId,
      },
    });
  };
}

export function storeCurrentSymbolIdAction(symbolId: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: storeCurrentSymbolId,
      payload: {
        symbolId,
      },
    });
  };
}

export function changeSymbolIdInInitAction(index: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeSymbolIdInInit,
      payload: {
        index,
      },
    });
  };
}

export function updateEventAction(event: GameEvents) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateEvent,
      payload: {
        event,
      },
    });
  };
}

export function updateAfterSymbolsAction(index: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateAfterSymbols,
      payload: {
        index,
      },
    });
  };
}

export function randomizeSymbolsAction(randomGenIds: number[]) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: randomizeSymbols,
      payload: {
        randomGenIds,
      },
    });
  };
}

export function setNewReelsAction(reels: ReelSymbol[]) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: setNewReels,
      payload: {
        reels,
      },
    });
  };
}

export function changeSymbolInitMultiplierAction(index: number, multiplier: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeSymbolInitMultiplier,
      payload: {
        index,
        multiplier,
      },
    });
  };
}

export function toggleStepSettingsTabAction() {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: toggleStepSettingsTab,
    });
  };
}

export function changeStepCostAction(cost: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeStepCost,
      payload: {
        cost,
      },
    });
  };
}

export function changeNextStepTypeAction(nextStepType: StepTypes) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeNextStepType,
      payload: {
        nextStepType,
      },
    });
  };
}

export function changeStepWinAction(stepWin: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeStepWin,
      payload: {
        stepWin,
      },
    });
  };
}

export function changeTotalWinAction(totalWin: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeTotalWin,
      payload: {
        totalWin,
      },
    });
  };
}

export function changeStepTypeAction(type: StepTypes) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeStepType,
      payload: {
        type,
      },
    });
  };
}

export function updateCurrentMultiplierAction(currentMultiplier: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateCurrentMultiplier,
      payload: {
        currentMultiplier,
      },
    });
  };
}

export function addFreeSpinsAction(added: number) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: addFreeSpins,
      payload: {
        added,
      },
    });
  };
}

export function updateCustomSchemasAction(schemas: CustomSchema[]) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateCustomSchemas,
      payload: {
        schemas,
      },
    });
  };
}

export function updateStateAction(state: State) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateState,
      payload: {
        state,
      },
    });
  };
}
