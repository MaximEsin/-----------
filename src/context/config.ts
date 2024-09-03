import { Game, Games } from '../interfaces/games';
import { spin4deadCommonSchema } from './commonSchemas/spin4dead';
import { spin4deadCustomSchema } from './customSchemas/spin4dead';
import { spin4DeadSymbolSources } from './imgPaths/spin4dead';
import { spin4deadStep } from './stepTemplates/spin4dead';

export const games: Game[] = [
  {
    name: Games.Spin4Dead,
    img: spin4DeadSymbolSources[5],
    stepTemplate: spin4deadStep,
    imgPaths: spin4DeadSymbolSources,
    commonSchema: spin4deadCommonSchema,
    customSchema: spin4deadCustomSchema,
    reels: 5,
    rows: 5,
    symbolsAmount: 13,
    symbolsWithMultiplier: [
      { id: 5, value: 0.1 },
      { id: 6, value: 0.1 },
      { id: 7, value: 0.1 },
      { id: 8, value: 1 },
      { id: 9, value: 2 },
      { id: 13, value: 2 },
    ],
  },
];
