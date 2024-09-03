/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */

import { updateStateAction } from '../services/actions';
import { updateReelsStateAction } from '../services/actions/reelsState';
import { store } from '../services/reducers';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const loadStateFromFile = (file: File) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const json = event.target?.result as string;
      const state = JSON.parse(json);
      const parsedState = JSON.parse(state);
      store.dispatch(updateStateAction(parsedState.mainReducer));
      store.dispatch(updateReelsStateAction(parsedState.reelStateReducer));
      console.log('State loaded successfully:', state);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Error reading file:', error);
  };

  reader.readAsText(file);
};
