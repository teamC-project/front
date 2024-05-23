import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
<<<<<<< HEAD
      {/* <ServiceContainer /> */}
=======
>>>>>>> d7329a5c82b76ed591a1e5d4be928b223a67f25d
    </BrowserRouter>
  </React.StrictMode>
);
