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


const App = loadable(() => import('./components/App/App'));
const Login = loadable(() => import("./components/Registro/Login/Login"));
const SplatScreen = loadable(() => import('./components/SplatScreen/SplatScreen'));
const Registro = loadable(() => import('./components/Registro/Registro/Registro'));

const Router = () => {

    const [completeRegister, setCompleteRegister] = useState(false)

    useEffect(() => {

        UserFirebase.getUserChangeLocal((login: boolean) => {
            if (login) {
                UserFirebase.registerGoogle((register) => {
                    if (!register) {
                        setCompleteRegister(true)
                    }
                });
            }
        })


    }, []);


    return <BrowserRouter>
        {completeRegister && <Redirect to="/signup" />}
        <Switch>
            <Route path="/" component={SplatScreen} exact></Route>

            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Registro} />

            <Route path="/index" exact><App /></Route>


        </Switch>
    </BrowserRouter>
}

export default Router;