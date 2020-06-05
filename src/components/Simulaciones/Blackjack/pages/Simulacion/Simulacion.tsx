import React, { useState, useEffect, useContext } from "react";
import TS_Blackjack from '../../ts/TS_Blackjack';
import Canvas from '../../../../Canvas/Canvas';

import "./Simulacion.scss";

import { NavegationContext } from '../../Blackjack';

const Simulacion = () => {

    var [TBlackjack] = useState(new TS_Blackjack())

    var { server } = useContext(NavegationContext);

    useEffect(() => {
        TBlackjack.update();
        TBlackjack.setServer(server);
    });

    return <div className="Simulacion">
        <h1>Simulacion</h1>
        <Canvas canvas={TBlackjack} />
    </div>
}

export default Simulacion;