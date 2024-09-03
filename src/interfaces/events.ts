import { IChangeEvent } from '@rjsf/core';

// eslint-disable-next-line import/no-cycle
import { ReelSymbol } from './step';

export interface CustomEventProps {
  eventData: GameEvents;
  onSubmit: (data: DataToStore) => void;
}

export type DataToStore = IChangeEvent | GameEvents;

export type GameEvents = Spin4DeadEvents;

type Spin4DeadEvents =
  | Spin4DeadClusterEvent
  | Spin4DeadAdrenalineEvent
  | Spin4DeadMedKitEvent
  | Spin4DeadJokerEvent
  | Spin4DeadRefreshEvent
  | Spin4DeadUpgradeEvent;

export enum Spin4DeadEventTypes {
  Cluster = 1,
  MedKit = 2,
  Adrenaline = 3,
  Joker = 4,
  Refresh = 5,
  Upgrade = 6,
}

export interface Spin4DeadClusterEvent {
  type: Spin4DeadEventTypes.Cluster;
  clusters: Spin4DeadCluster[];
  toRemove?: number[];
}

interface Spin4DeadCluster {
  id: number;
  indices: number[];
  win: number;
}

interface Spin4DeadAdrenalineEvent {
  type: Spin4DeadEventTypes.Adrenaline;
  multiplier: number;
}

export interface Spin4DeadMedKitEvent {
  type: Spin4DeadEventTypes.MedKit;
  symbols: ReelSymbol[];
  toReplace?: ReelSymbol[];
}

export interface Spin4DeadJoker {
  index: number;
  multiplier: number;
}

export interface Spin4DeadJokerEvent {
  type: Spin4DeadEventTypes.Joker;
  multipliers: Spin4DeadJoker[];
}

export interface Spin4DeadRefreshEvent {
  type: Spin4DeadEventTypes.Refresh;
  symbols: ReelSymbol[];
  toReplace?: ReelSymbol[];
}

export interface Spin4DeadUpgradeEvent {
  type: Spin4DeadEventTypes.Upgrade;
  symbols: ReelSymbol[];
}
