import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ServiceContainer from './layouts/ServiceContainer';
// import App from './App';
// import Service from '../../project_example/service';
// import Exa from '../../project_example/exa';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <ServiceContainer />
    </BrowserRouter>
  </React.StrictMode>
);
