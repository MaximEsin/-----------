import { Step } from './context/interfaces';

const download = (content: string, fileName: string, contentType: string) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const handleDownloadClick = (steps: Step[]) => {
  const stepsCopy = structuredClone(steps);
  stepsCopy.forEach((step) => {
    step.id = undefined;
  });
  const jsonContent = JSON.stringify(stepsCopy);
  download(jsonContent, 'steps.json', 'application/json');
};
