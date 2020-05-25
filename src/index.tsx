import React from 'react';
import ReactDOM from 'react-dom';

import "./index.scss";
import { Provider } from 'react-redux';
import Store from './redux/Store';
import Router from './Router';




ReactDOM.render(
  <Provider store={Store}>
    <Router />
  </Provider>
  , document.getElementById('root')
);