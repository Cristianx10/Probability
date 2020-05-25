import React, { useState } from "react";
import TS_Blackjack from './ts/TS_Blackjack';
import Canvas from "../../Canvas/Canvas";

const Blackjack = () => {

    var [TBlackjack] = useState(new TS_Blackjack);

    return (<div>
        <h1>Blackjack</h1>
        <Canvas canvas={TBlackjack} />
    </div>);
}

export default Blackjack;