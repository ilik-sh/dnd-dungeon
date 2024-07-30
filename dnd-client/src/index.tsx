import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './app/styles/fonts.css';
import './app/styles/index.css';
import './app/styles/variables.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

reportWebVitals();
