import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/Routes';
import './assets'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
