import React from "react";
import "./Header.scss";
import UserFirebase from "../../constants/firebase/User/UserFirebase";
import { useSelector } from "react-redux";
import Store from "../../redux/Store";
import { IStore } from '../../redux/Store';


const Header = () => {

    var user = useSelector((store: IStore) => store.sUser)

    const cerrarSession = () => {
        UserFirebase.logout();
    }

    return (<div>
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="">SOBRE NOSOTROS</a></li>
                    <li><a href="">SIMULACIONES</a></li>
                    {user.session_Active != "undefined" && <li onClick={cerrarSession}><a href="collapsible.html">CERRAR SESSIÓN</a></li>}

                </ul>
            </div>
        </nav>
    </div>)

}

export default Header;