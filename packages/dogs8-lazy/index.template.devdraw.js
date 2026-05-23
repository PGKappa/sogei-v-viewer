import React from 'react';
import ReactDOM from 'react-dom';
import './components/styles/main.scss';
import "./partners/${partner}/main.scss";

import App from './tests/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app-container')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
