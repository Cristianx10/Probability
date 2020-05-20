import React, {  useState } from "react";
import TS_MontyHall from './ts/TS_MontyHall';
import Canvas from "../../Canvas/Canvas";

import "./MontyHall.scss";

const MontyHall = () => {

    const [TMontyHall] = useState(new TS_MontyHall());

    return <div className="MontyHall">
        <Canvas canvas={TMontyHall} />
    </div>
}

export default MontyHall;