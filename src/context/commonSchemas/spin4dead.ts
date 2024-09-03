import { CommonSchema } from '../../interfaces/commonSchema';
import { Spin4DeadEventTypes } from '../../interfaces/events';

export enum Spin4DeadEvents {
  Cluster,
  MedKit,
  Adrenaline,
  Joker,
  Refresh,
  Upgrade,
}

export const spin4deadCommonSchema: CommonSchema[] = [
  {
    name: Spin4DeadEvents[Spin4DeadEvents.Adrenaline],
    eventSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'integer',
          enum: [3],
          default: Spin4DeadEventTypes.Adrenaline,
          title: 'Тип события',
        },
        multiplier: {
          type: 'integer',
          title: 'Множитель',
        },
      },
      required: ['type', 'multiplier'],
    },
    uiSchema: {
      type: { 'ui:widget': 'hidden' },
    },
  },
];
