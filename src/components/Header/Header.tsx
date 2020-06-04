import React, { useState } from "react";
import "./Header.scss";
import UserFirebase from "../../constants/firebase/User/UserFirebase";
import { useSelector } from "react-redux";
import Store from "../../redux/Store";
import { IStore } from '../../redux/Store';
import { type as changeSessionActive } from "../../redux/user/actions/changeSessionActive";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Rlink } from '../../Router';


const Header = () => {

    const [goToIndex, setGoToIndex] = useState(false);

    var user = useSelector((store: IStore) => store.sUser)

    const iniciarSession = () => {
        UserFirebase.logout(() => {
            Store.dispatch({ type: changeSessionActive, payload: "goToLogin" });
        });
    }

    const cerrarSession = () => {
        UserFirebase.logout(() => {
            Store.dispatch({ type: changeSessionActive, payload: "undefined" });
            setGoToIndex(true);
        });
    }

    return (<div>
        {goToIndex && <Redirect to="/" />}
        <nav>
            <div className="nav-wrapper">
                <Link to={Rlink.inicio}>
                    <a className="brand-logo">Logo</a>
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <Link to={Rlink.about}>
                            <a href="">SOBRE NOSOTROS</a>
                        </Link>
                    </li>
                    <li>
                        <Link to={Rlink.simulaciones}>
                            <a href="">SIMULACIONES</a>
                        </Link>
                    </li>
                    {user.session_Active == "undefined" || user.session_Active == "goToLogin" ?
                        <li onClick={iniciarSession}><a href="">INICIAR SESSIÓN</a></li> :
                        <li onClick={cerrarSession}><a href="">CERRAR SESSIÓN</a></li>}

                </ul>
            </div>
        </nav>
    </div >)

}

export default Header;