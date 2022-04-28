import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <React.StrictMode>
      <Router>
         <App />
      </Router>
   
  </React.StrictMode>
);
