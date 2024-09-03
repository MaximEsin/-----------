import { CustomEventProps } from './events';

export interface CustomSchema {
  name: string;
  element: React.ComponentType<CustomEventProps>;
}
