import React from "react";
import {
    Switch,
    Route,
} from "react-router";
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App';

const Router = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/" ><App /></Route>
        </Switch>
    </BrowserRouter>
}

export default Router;