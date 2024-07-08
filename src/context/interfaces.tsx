export interface Symbol {
  id: number;
  indices: number[];
  properties: {
    multiplier: number;
  };
}

export interface Cluster {
  id: number;
  win: number;
  indices: number[];
}
export interface Event {
  type: number;
  clusters?: Cluster[];
  multiplier?: number;
  symbols?: Symbol[];
}

export interface Step {
  id: number;
  cost: number;
  payload: {
    beforeSymbols: Symbol[];
    nextStepType: number;
    events: Event[];
  };
  stepWin: number;
  totalWin: number;
  type: number;
}
