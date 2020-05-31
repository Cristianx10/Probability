import React, { useState, useEffect } from "react";
import TS_Blackjack from '../../ts/TS_Blackjack';
import Canvas from '../../../../Canvas/Canvas';

import "./Simulacion.scss";

const Simulacion = () => {

    var [TBlackjack] = useState(new TS_Blackjack())

    useEffect(()=>{
        TBlackjack.update();
    })
    
    return <div className="Simulacion">
        <h1>Simulacion</h1>
        <Canvas canvas={TBlackjack} />
    </div>
}

export default Simulacion;