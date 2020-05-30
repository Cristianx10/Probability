import React from 'react';

import "./Login.scss";

const Login = () => {


    return <div className="Login" style={{backgroundImage:"url('/img/assets/background/suerte_dados_vasos.jpg')"}}>
       
            <div className="Login__container row">
                <div className="col s12 z-depth-6 card-panel">
                    <form className="login-form">
                        <div className="row">
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">mail_outline</i>
                                <input className="validate" id="email" type="email" />
                                <label data-error="wrong" data-success="right">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock_outline</i>
                                <input id="password" type="password" />
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
                            <div className="input-field col s12">
                                <a href="#" className="btn waves-effect waves-light col s12">Login</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 m6 l6">
                                <p className="margin medium-small"><a href="#">Register Now!</a></p>
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