import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from './redux/Store';

import { Provider } from 'react-redux';
import Store from './redux/Store';
import Router from './Router';
import Databse from './constants/firebase/Database/Database';

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css"

import "./index.scss";
import "./constants/styles/responsive.scss";
import "./constants/styles/helpers.scss";

Databse.inicializate();


ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);