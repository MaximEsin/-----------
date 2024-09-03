/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/cognitive-complexity */
/* TODO: Remove all eslint-disable comments */
/* eslint-disable @typescript-eslint/default-param-last */
import { addNewReels, changeSymbolId, changeSymbolMultiplier, updateReelsState } from '../../context/actions';
import {
  AddNewReelsAction,
  ChangeSymbolIdAction,
  ChangeSymbolMultiplierAction,
  UpdateReelsStateAction,
} from '../../interfaces/actions';
import { ReelSymbol } from '../../interfaces/step';

type ReelsStateActions =
  | AddNewReelsAction
  | ChangeSymbolIdAction
  | ChangeSymbolMultiplierAction
  | UpdateReelsStateAction;

export interface ReelsState {
  reels: {
    [nodeId: string]: ReelSymbol[];
  };
}

const initialState: ReelsState = {
  reels: {},
};

export const reelStateReducer = (state = initialState, action: ReelsStateActions) => {
  switch (action.type) {
    case addNewReels: {
      return {
        ...state,
        reels: {
          ...state.reels,
          [action.payload.nodeId]: action.payload.symbols,
        },
      };
    }
    case changeSymbolId: {
      let foundCurrentNode = false;
      const updatedReels = { ...state.reels };

      action.payload.nodesStorage.forEach((node) => {
        if (node.id === action.payload.nodeId) {
          foundCurrentNode = true;
        }
        if (foundCurrentNode) {
          updatedReels[node.id] = updatedReels[node.id].map((symbol, index) => {
            if (index === action.payload.index) {
              if (symbol.properties?.multiplier) {
                const newMultiplier = action.payload.symbolsWithMultiplier?.find(
                  (multiplier) => multiplier.id === action.payload.currentSymbolId,
                );

                return {
                  ...symbol,
                  id: action.payload.currentSymbolId,
                  properties: { multiplier: newMultiplier?.value ? newMultiplier.value : 1 },
                };
              }
              return {
                ...symbol,
                id: action.payload.currentSymbolId,
              };
            }
            return symbol;
          });
        }
      });

      return {
        ...state,
        reels: updatedReels,
      };
    }
    case changeSymbolMultiplier: {
      return {
        ...state,
        reels: {
          ...state.reels,
          [action.payload.nodeId]: state.reels[action.payload.nodeId].map((symbol, index) => {
            if (index === action.payload.index) {
              return { ...symbol, properties: { multiplier: action.payload.multiplier } };
            }
            return symbol;
          }),
        },
      };
    }
    case updateReelsState: {
      return {
        ...state,
        reels: action.payload.state.reels,
      };
    }
    default: {
      return state;
    }
  }
};
