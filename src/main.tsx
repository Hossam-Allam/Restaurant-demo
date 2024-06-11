import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';
import App from './App'

import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)