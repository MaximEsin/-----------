import './index.css';

import { ReactFlowProvider } from '@xyflow/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App/App';
import { store } from './services/reducers';

ReactDOM.createRoot(document.getElementById('main')!).render(
  <Provider store={store}>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </Provider>,
);
