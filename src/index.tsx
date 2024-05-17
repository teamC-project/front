import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Service from './views/Service/Designer/service';
import Exa from './views/Service/Designer/exa';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Service /> */}
    <Exa />
  </React.StrictMode>
);
