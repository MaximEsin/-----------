import { CommonSchema } from './commonSchema';
import { CustomSchema } from './customSchema';
import { Step } from './step';

export enum Games {
  None,
  Spin4Dead,
}
export interface Game {
  name: Games;
  img: string;
  stepTemplate: Step;
  imgPaths: Record<number, string>;
  commonSchema: CommonSchema[];
  customSchema: CustomSchema[];
  reels: number;
  rows: number;
  symbolsAmount: number;
  symbolsWithMultiplier?: MultiplierInitValue[];
}

export interface MultiplierInitValue {
  id: number;
  value: number;
}
