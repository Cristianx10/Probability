import React, { useEffect, useState, useRef } from "react";

import Database from '../../../constants/firebase/Database/Database';
import DB_ROUTES from '../../../constants/firebase/Database/Database_Routes';
import UserFirebase from '../../../constants/firebase/User/UserFirebase';
import { type as changeSessionActive } from "../../../redux/user/actions/changeSessionActive";

import "./Registro.scss";
import Store from "../../../redux/Store";
import Firebase from '../../../constants/firebase/firebase';
import { Redirect } from 'react-router-dom';

var waitEvent: NodeJS.Timeout | any = undefined;


const Registro = () => {

    const [edad, setEdad] = useState("");
    const [account, setAccount] = useState("local")
    const [genero, setGenero] = useState("");
    const [email, setEmail] = useState("");

    const [repeatUser, serRepeatUser] = useState({ find: false, repeat: false });
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [goToIndex, setGoToIndex] = useState(false);

    const [pass, setPass] = useState("");
    const [confirmpass, setConfirmPass] = useState("");

    const [registeComplete, setRegisterComplete] = useState("0");


    const refEmail = useRef<HTMLElement | any>();
    const refName = useRef<HTMLElement | any>();



    const onChangeGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
        var target = event.target;
        if (target) {
            setGenero(target.value)
        }
    }

    const onChangeEdad = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            setEdad(target.value)
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

    const onChangeConfirPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            setConfirmPass(target.value)
        }
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            setName(target.value);
        }
    }

    const onChangeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        var target = event.target;
        if (target) {
            serRepeatUser({ find: true, repeat: false })
            setNickName(target.value);

            clearTimeout(waitEvent);

            waitEvent = setTimeout(() => {
                reviewNameUser(target.value);
            }, 1000)

        }
    }

    const reviewNameUser = (userName: string) => {
        var nickTemName = userName.toLowerCase();
        var route = DB_ROUTES.users.namesUser._this + "/" + nickTemName;
        Database.evalueteRouteExistMin(route, nickTemName, (exist: boolean, obj: any) => {
            console.log(exist, obj, route)
            if (exist) {
                serRepeatUser({ find: false, repeat: true });
            } else {
                serRepeatUser({ find: false, repeat: false });
            }
        });

    }

    const redirectGoogle = () => {
        UserFirebase.redirectGoogleLogin();
    }

    const redirectIndex = () => {

        if (!repeatUser.repeat &&
            name != "" &&
            email != "" &&
            edad != "" &&
            genero != "" &&
            pass === confirmpass) {


            if (account == "local") {
                UserFirebase.createUser(null, email, "local", name, pass);
                UserFirebase.createUserInformation(parseInt(edad), genero, nickName,
                    () => {
                        if (UserFirebase.user.registerComplete == true) {
                            Store.dispatch({ type: changeSessionActive, payload: "active" });
                            setGoToIndex(true);
                        }
                    });
            } else if (account == "google") {
                UserFirebase.createUserInformation(parseInt(edad), genero, nickName,
                    () => {
                        if (UserFirebase.user.registerComplete == true) {
                            Store.dispatch({ type: changeSessionActive, payload: "active" });
                            setGoToIndex(true);
                        }
                    });
            }

        }
    }

    useEffect(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});

        const updateInformation = () => {
            if (!UserFirebase.user.registerComplete) {
                var user_name = UserFirebase.user.name;
                var user_email = UserFirebase.user.email;
                var user_account = UserFirebase.user.account;

                setRegisterComplete("1");
                if (refEmail && refEmail.current) {
                    var ref = refEmail.current as HTMLElement | any;
                    ref.querySelector("input").value = user_email;
                    ref.querySelector("input").disabled = true;
                    ref.querySelector("label").classList.add("active");
                    ref.querySelector("i").classList.add("active");
                }

                if (refName && refName.current) {
                    var refe = (refName.current) as HTMLElement | any;
                    refe.querySelector("input").value = user_name;
                    refe.querySelector("label").classList.add("active");
                    refe.querySelector("i").classList.add("active");
                }
                setName(user_name);
                setEmail(user_email);
                setAccount(user_account);
            } else {
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

    return <div className="Registro">
        {goToIndex && <Redirect to="/" />}
        <div className="Registro__container ws12 wm8 hs0 hm10 z-depth-2">
            <div className="row ws12 wm9">
                <div className="col s12">
                    <h5>Has parte de nuestra comunidad</h5>
                </div>
                <div className="section input-field col s12 m6" ref={refName}>
                    <i className="material-icons prefix">assignment_ind</i>
                    <input id="first_name" type="text" className="validate" onChange={onChangeName} />
                    <label>Nombre de usuario</label>

                </div>
                <div className="section input-field col s12 m6">
                    <i className="material-icons prefix">face</i>
                    <input id="first_name" type="text" className="validate" onChange={onChangeNickName} />
                    <label>Nickname o apodo</label>

                    {repeatUser.find &&
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>}
                    {repeatUser.repeat &&
                        <span className="red-text">* El nombre de usuario ya existe intente otro.</span>}
                </div>


                <div className="section input-field col s12 m6">
                    <i className="material-icons prefix">insert_invitation</i>
                    <input id="first_name" type="number" className="validate" onChange={onChangeEdad} />
                    <label>Edad</label>
                </div>

                <div className="section input-field col s12 m6">
                    <i className="material-icons prefix">account_circle</i>
                    <select defaultValue="" onChange={onChangeGenero}>
                        <option value="">¿Cuál es tu genero?</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="3">Otro</option>
                    </select>
                    <label>Genero</label>
                </div>


                <div className="section input-field col s12" ref={refEmail}>
                    <i className="material-icons prefix">mail_outline</i>
                    <input className="validate"
                        onChange={onChangeEmail}

                        id="password" type="email" defaultValue={""} />
                    <label data-error="wrong" data-success="right">Email</label>
                </div>

                {account == "local" && <>
                    <div className="section input-field col s12 m6">
                        <i className="material-icons prefix">lock_outline</i>
                        <input id="password"
                            onChange={onChangePass}
                            type="password" defaultValue={""} />
                        <label >Contraseña</label>
                    </div>
                    <div className="section input-field col s12 m6">
                        <i className="material-icons prefix">lock_outline</i>
                        <input id="password"
                            onChange={onChangeConfirPass}
                            type="password" defaultValue={""} />
                        <label >Confirmar contraseña</label>
                    </div>
                </>
                }



                <div className={"input-field col s12" + (registeComplete != "1" ? " m6" : " m12")
                } onClick={redirectIndex}>
                    <a href="#" className="btn waves-effect waves-light col large s12">Register</a>
                </div>

                {registeComplete != "1" &&
                    <div className="input-field col s12 m6">
                        <a href="#"
                            onClick={redirectGoogle}
                            className="btn red waves-effect waves-light col large s12">
                            <i className="material-icons left">email</i>
                            Registrase con Google
                            </a>
                    </div>
                }


            </div>

        </div>

    </div >
}

export default Registro;