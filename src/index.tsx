import React from 'react';
import ReactDOM from 'react-dom';

import "./index.scss";
import { Provider } from 'react-redux';
import Store from './redux/Store';
import Router from './Router';

import "materialize-css";
import "materialize-css/dist/css/materialize.min.css"
import Databse from './constants/firebase/Database/Database';


Databse.inicializate();



ReactDOM.render(
  <Provider store={Store}>
    <Router />
  </Provider>
  , document.getElementById('root')
);