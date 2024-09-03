import { RJSFSchema, UiSchema } from '@rjsf/utils';

export interface CommonSchema {
  name: string;
  eventSchema: RJSFSchema;
  uiSchema: UiSchema;
}
