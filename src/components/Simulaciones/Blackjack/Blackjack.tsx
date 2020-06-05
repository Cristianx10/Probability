import React, { useState, Props, createContext, useContext, useReducer } from "react";
import Modo from "./pages/Modo/Modo";

import "./Blackjack.scss";
import Multiplayer from "./pages/Multiplayer/Multiplayer";
import Solitario from "./pages/Solitario/Solitario";
import Simulacion from "./pages/Simulacion/Simulacion";
import MultiplayerManager from '../../../constants/multiplayer/MultiplayerManager';


interface INav {
    page: string;
}


export const NavegationContext = createContext<{ setPage: (page: "Inicio" | "Mutiplayer" | "Solitario" | "Simulacion") => void, server: MultiplayerManager }>({
    setPage: (page: "Inicio" | "Mutiplayer" | "Solitario" | "Simulacion") => { },
    server: new MultiplayerManager()

});

var initNavigation: INav = {
    page: "Inicio"
};

function reducer(state: INav, action: string) {
    return { page: action };
}


const Blackjack = () => {

    // const [page, setPage] = useState<"inicio">("inicio");

    //const navegation = useContext(NavegationContext);
    const [server] = useState(new MultiplayerManager());
    const [state, dispatch] = useReducer(reducer, initNavigation);

    var viewPage = <></>;


    switch (state.page) {
        case "Inicio":
            viewPage = <Modo />
            break;
        case "Mutiplayer":
            viewPage = <Multiplayer />
            break;
        case "Solitario":
            viewPage = <Solitario />
            break;
        case "Simulacion":
            viewPage = <Simulacion />
            break;

    }

    return (
        <NavegationContext.Provider value={{ setPage: dispatch, server }}>
            <div className="Blackjack" >
                {viewPage}
            </div>
        </NavegationContext.Provider>
    )
}

export default Blackjack;

