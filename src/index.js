// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CounterProvider } from './store'; // Importe o provedor da loja

ReactDOM.render(
  <React.StrictMode>
    {/* Envolve sua aplicação com o CounterProvider */}
    <CounterProvider>
      <App />
    </CounterProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
