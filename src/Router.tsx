import loadable from '@loadable/component';
import React, { lazy, Suspense } from "react";
import {
    Switch,
    Route,
} from "react-router";
import { BrowserRouter } from 'react-router-dom'

const App = loadable(() => import('./components/App/App'));
const Login = loadable(() => import("./components/Registro/Login/Login"));
const SplatScreen = loadable(() => import('./components/SplatScreen/SplatScreen'));

const Router = () => {
    return <BrowserRouter>
        <Switch>

            <Route path="/" component={SplatScreen} exact></Route>

            <Route path="/login" component={Login} exact />

            <Route path="/index" exact><App /></Route>

        </Switch>
    </BrowserRouter>
}

export default Router;