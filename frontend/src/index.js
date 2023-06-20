import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App, { RouterApp } from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterApp />
  </Provider>
);

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
