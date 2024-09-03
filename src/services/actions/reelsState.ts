import { addNewReels, changeSymbolId, changeSymbolMultiplier, updateReelsState } from '../../context/actions';
import { MultiplierInitValue } from '../../interfaces/games';
import { ReelSymbol } from '../../interfaces/step';
import { AppDispatch } from '../reducers';
import { ReelsState } from '../reducers/reelsState';

export function addNewReelsAction(nodeId: string, symbols: ReelSymbol[]) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: addNewReels,
      payload: {
        nodeId,
        symbols,
      },
    });
  };
}

export function changeSymbolIdAction(
  currentSymbolId: number,
  nodeId: string,
  index: number,
  nodesStorage: Node[],
  symbolsWithMultiplier: MultiplierInitValue[] | undefined,
) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeSymbolId,
      payload: {
        currentSymbolId,
        nodeId,
        index,
        nodesStorage,
        symbolsWithMultiplier,
      },
    });
  };
}

export function changeSymbolMultiplierAction(index: number, multiplier: number, nodeId: string) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: changeSymbolMultiplier,
      payload: {
        index,
        multiplier,
        nodeId,
      },
    });
  };
}

export function updateReelsStateAction(state: ReelsState) {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: updateReelsState,
      payload: {
        state,
      },
    });
  };
}
