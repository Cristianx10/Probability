import React, { useEffect, useState } from 'react';

import UserFirebase from '../../../constants/firebase/User/UserFirebase';
import Store from '../../../redux/Store';
import { type as changeSessionActive } from "../../../redux/user/actions/changeSessionActive";

import "./Login.scss";
import { Redirect } from 'react-router';


const Login = () => {

    const [goToIndex, setGoToIndex] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const onLogin = () => {
        if (email != "" && pass != "") {
            UserFirebase.login(email, pass, () => {
                setGoToIndex(true);
            });
        }
    }

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            setEmail(target.value)
        }
    }

    const onChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            setPass(target.value)
        }
    }

    const redirectGoogle = () => {
        UserFirebase.redirectGoogleLogin();
    }


    useEffect(() => {
        const updateInformation = () => {
            if (!UserFirebase.user.registerComplete) {
                Store.dispatch({ type: changeSessionActive, payload: "goToSign" });
            } else {
                Store.dispatch({ type: changeSessionActive, payload: "active" });
                setGoToIndex(true);
            }
        }

        UserFirebase.event.getEvent("redirectGoogle", () => {
            updateInformation();
        });

        UserFirebase.event.getEvent("loadUserDatabase", () => {
            updateInformation();
        });

    }, [])

    return <div className="Login" style={{ backgroundImage: "url('/img/assets/background/suerte_dados_vasos.jpg')" }}>

        {goToIndex && <Redirect to="/" />}
        <div className="Login__container row">

            <div className="col s12 z-depth-6 card-panel">

                <form className="login-form">
                    <div className="row">
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mail_outline</i>
                            <input onChange={onChangeEmail} className="validate" id="email" type="email" />
                            <label data-error="wrong" data-success="right">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">lock_outline</i>
                            <input onChange={onChangePass} id="password" type="password" />
                            <label >Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m12 l12  login-text">
                            <input type="checkbox" id="remember-me" />
                            <label >Remember me</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <a onClick={onLogin} href="#" className="btn waves-effect waves-light col s12">Login</a>
                        </div>

                        <div className="input-field col s12 m6">
                            <a href="#"
                                onClick={redirectGoogle}
                                className="btn red waves-effect waves-light col large s12">
                                <i className="material-icons left">email</i>
                            Entrar con Google
                            </a>
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-field col s6 m6 l6">
                            <p className="margin medium-small"><a href="/signup">Registrase Ahora!</a></p>
                        </div>
                        <div className="input-field col s6 m6 l6">
                            <p className="margin right-align medium-small"><a href="#">Forgot password?</a></p>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    </div>
}

export default Login;