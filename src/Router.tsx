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
import Sobre from './pages/Sobre/Sobre';
import Simulaciones from './pages/Simulaciones/Simulaciones';


const App = loadable(() => import('./components/App/App'));
const Login = loadable(() => import("./components/Registro/Login/Login"));
const SplatScreen = loadable(() => import('./components/SplatScreen/SplatScreen'));
const Registro = loadable(() => import('./components/Registro/Registro/Registro'));

const Router = () => {

    const user = useSelector((store: IStore) => store.sUser);


    return <BrowserRouter>
        {user.session_Active === "goToSign" && <Redirect to="/signup" />}
        {user.session_Active === "goToLogin" && <Redirect to="/login" />}
        <Header />
        <Switch>
            <Route path={Rlink.index} component={SplatScreen} exact></Route>

            <Route path={Rlink.login} component={Login} exact />
            <Route path={Rlink.signup} component={Registro} />

            <Route path={Rlink.inicio} exact component={App}></Route>

            <Route path={Rlink.about} exact component={Sobre} />
            <Route path={Rlink.simulaciones} exact component={Simulaciones} />


        </Switch>
    </BrowserRouter>
}

export default Router;


export const Rlink = {
    index: "/",
    inicio: "/index",
    login: "/login",
    signup: "/signup",
    about: "/about",
    simulaciones: "/simulaciones"
}