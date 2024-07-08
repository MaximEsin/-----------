import { Step } from './context/interfaces';

type ClonedStep = Omit<Step, 'id'> & {
  id?: Step['id']
}

const download = (content: string, fileName: string, contentType: string) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const handleDownloadClick = (steps: Step[]) => {
  const stepsCopy: ClonedStep[] = structuredClone(steps);
  stepsCopy.forEach((step) => {
    step.id = undefined;

    step.stepWin = step.payload.events.reduce((acc, event) => {
      if (!event.clusters) return acc;

      const winValue = event.clusters.reduce((clusterAcc, cluster) => {
        return clusterAcc + cluster.win;
      }, 0);

      return acc + winValue;
    }, 0)
  });
  const jsonContent = JSON.stringify(stepsCopy);
  download(jsonContent, 'steps.json', 'application/json');
};
