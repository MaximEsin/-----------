/* eslint-disable no-param-reassign */
import { Step } from '../interfaces/step';

const generateAndDownloadFile = (content: string, fileName: string, contentType: string) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const exportSteps = (steps: Step[]) => {
  const stepsCopy = structuredClone(steps);
  stepsCopy.forEach((step) => {
    step.payload.events.forEach((event) => {
      if ('toRemove' in event) {
        event.toRemove = undefined;
      }
      if ('toReplace' in event) {
        event.toReplace = undefined;
      }
      return event;
    });
  });
  const jsonContent = JSON.stringify(stepsCopy);
  generateAndDownloadFile(jsonContent, 'steps.json', 'application/json');
};

export const exportState = () => {
  const jsonContent = JSON.stringify(sessionStorage.state);
  generateAndDownloadFile(jsonContent, 'state.json', 'application/json');
};
