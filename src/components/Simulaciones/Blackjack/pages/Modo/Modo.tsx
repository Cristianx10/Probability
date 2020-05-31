import React from "react";
import { NavegationContext } from '../../Blackjack';

import "./Modo.scss";


const Modo = () => {

    return < NavegationContext.Consumer >
        {
            ({ setPage }) => {
                return <div className="Modo valign-top background-image" style={{ backgroundImage: "url('/img/simulaciones/blackjack/backgrounds/tablero-juegos.jpg')" }}>

                    <div className="row h4 valign-center">

                        <div className="col s12 valign-center">
                            <h1 className="white-text" >Blackjack</h1>
                        </div>

                    </div>

                    <div className="row h4 w6 valign-wrapper">
                        <div className="col s6 valign-center">
                            <a className="waves-effect waves-light btn-large orange" onClick={() => {
                                setPage("Mutiplayer")
                            }}>
                                <i className="material-icons left">group</i>
                                Multiplayer
                            </a>
                        </div>

                        <div className="col s6 valign-center">
                            <a className="waves-effect waves-light btn-large red" onClick={() => {
                                setPage("Solitario")
                            }}>
                                <i className="material-icons left">face</i>
                                Solitario
                            </a>
                        </div>
                    </div>

                </div>
            }
        }

    </NavegationContext.Consumer >
}

export default Modo;


