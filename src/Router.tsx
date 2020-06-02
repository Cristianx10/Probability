import loadable from '@loadable/component';

import React, { useEffect, useState } from "react";

import {
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router";
import { BrowserRouter } from 'react-router-dom';

import UserFirebase from './constants/firebase/User/UserFirebase';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import { IStore } from './redux/Store';


const App = loadable(() => import('./components/App/App'));
const Login = loadable(() => import("./components/Registro/Login/Login"));
const SplatScreen = loadable(() => import('./components/SplatScreen/SplatScreen'));
const Registro = loadable(() => import('./components/Registro/Registro/Registro'));

const Router = () => {
    
    const user = useSelector((store:IStore) => store.sUser);


    return <BrowserRouter>
        {user.session_Active === "goToSign" && <Redirect to="/signup" />}
        <Header />
        <Switch>
            <Route path="/" component={SplatScreen} exact></Route>

            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Registro} />

            <Route path="/index" exact><App /></Route>


        </Switch>
    </BrowserRouter>
}

export default Router;