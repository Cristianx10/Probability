import React, { useState, useEffect, useContext, createContext } from "react";
import { NavegationContext } from '../../Blackjack';

import MultiplayerManager from "../../../../../constants/multiplayer/MultiplayerManager";
import DB_ROUTES from '../../../../../constants/firebase/Database/Database_Routes';

import "./Multiplayer.scss";
import Database from '../../../../../constants/firebase/Database/Database';


export const ServerContext = createContext({});

const Multiplayer = () => {

    const [nameID, setNameID] = useState("")
    const [name, setName] = useState("")
    const [publico, setPublico] = useState(true);
    const [listServers, setListServer] = useState<{ name: string, key: string }[]>([]);

    useEffect(() => {
        Database.readBrachDatabaseFilter(DB_ROUTES.simulations.blackjack._this + "/namesUsers",
            "visible", true,
            (snaps) => {
                var list: { name: string, key: string }[] = [];
                snaps.forEach((snap) => {
                    var key = snap.val().UID || "";
                    var name = snap.key || "";
                    list.push({ name, key })
                })
                console.log(snaps.val())
                setListServer(list);
            })
        M.updateTextFields();
    }, [])

    return <NavegationContext.Consumer>
 
        {
            ({ server, setPage }) => {

                const onChageNameId = (event: React.ChangeEvent<HTMLInputElement>) => {
                    var target = event.target;
                    if (target) {
                        setNameID(target.value)
                    }
                }

                const createServer = () => {

                    var ser = DB_ROUTES.servidor.blackjack._thisN;


                    server.createServer(ser, name, publico, () => {
                        setPage("Simulacion");
                    });


                }

                const joinServer = (id: string) => {
                    var ser = DB_ROUTES.servidor.blackjack._thisN;
                    server.joinServer(ser, id, () => {
                        setPage("Simulacion");
                    });
                }

                const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
                    var target = e.target;
                    if (target) {
                        setName(target.value)
                    }
                }

                const onChangePublico = (e: React.ChangeEvent<HTMLInputElement>) => {
                    var target = e.target;
                    if (target) {
                        if (target.checked) {
                            setPublico(false)
                        } else {
                            setPublico(true)
                        }
                    }
                }


             


                return <div className="Multiplayer valign-top background-image" style={{ backgroundImage: "url('/img/simulaciones/blackjack/backgrounds/tablero-juegos.jpg')" }}>

                    <div className="row h4 valign-center">

                        <div className="col s12 valign-center">
                            <h1 className="white-text" >¿Qué deseas realizar?</h1>
                        </div>

                    </div>

                    <div className="row h4 w6 valign-wrapper">

                        <div className="col s6 valign-center section">
                            <div className="input-field">
                                <input id="server_name" type="text" className="validate white-text" onChange={onChangeName} />
                                <label>Nombre del server</label>
                            </div>

                            <div className="section">
                                <div className="switch">
                                    <label>Publica
                                        <input type="checkbox" onChange={onChangePublico} />
                                        <span className="lever"></span>
                                        Privada</label>
                                </div>
                            </div>

                            <div className="section">
                                <a className="waves-effect waves-light btn-large orange" onClick={() => {
                                    createServer();
                                }}>
                                    <i className="material-icons left">add</i>
                                        Crear servidor
                                </a>
                            </div>

                        </div>

                        <div className="col s6 valign-center">
                            <div className="section">

                                <div className="input-field">
                                    <input onChange={onChageNameId} id="server_id" type="text" className="validate white-text" />
                                    <label>ID del Servidor</label>
                                </div>

                                <div>
                                    <ul className="collection with-header">
                                        <li className="collection-header"><h4>Servidores</h4></li>
                                        {listServers.map((list, i) => {
                                            return <li key={i} className="collection-item">
                                                <div>{list.name}<a
                                                    onClick={() => { joinServer(list.name) }}
                                                    className="secondary-content">
                                                    <i className="material-icons">send</i></a></div>
                                            </li>
                                        })}
                                    </ul>
                                </div>

                                <a className="waves-effect waves-light btn-large red" onClick={() => {
                                    joinServer(nameID);
                                }}>
                                    <i className="material-icons left">directions_run</i>
                                    Unirse a partida
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            }
        }
    </NavegationContext.Consumer>


}

export default Multiplayer;