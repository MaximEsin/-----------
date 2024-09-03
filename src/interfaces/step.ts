// eslint-disable-next-line import/no-cycle
import { GameEvents } from './events';

// TODO: добавить катомные расширения для содержимого payload
export interface Step {
  cost: number;
  payload: {
    currentMultiplier?: number;
    beforeSymbols: ReelSymbol[];
    afterSymbols: ReelSymbol[];
    nextStepType: StepTypes;
    counter?: {
      left: number;
      played: number;
      added: number;
    };
    events: GameEvents[];
  };
  stepWin: number;
  totalWin: number;
  type: StepTypes;
}

export interface ReelSymbol {
  id: number;
  indices: number[];
  properties?: {
    multiplier?: number;
  };
}

export enum StepTypes {
  BaseGame = 1,
  BonusGame = 2,
}
