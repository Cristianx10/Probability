import React, {  useState } from "react";
import TS_MontyHall from './ts/TS_MontyHall';
import Canvas from "../../Canvas/Canvas";
import ManagerObjetivos from '../../../constants/probabilidad/ManagerObjetivos/ManagerObjetivos';

import "./MontyHall.scss";

const MontyHall = () => {

    const [TMontyHall] = useState(new TS_MontyHall());
    const [managerObjetivos] = useState(new ManagerObjetivos(TMontyHall));

    return <div className="MontyHall">
        <Canvas canvas={TMontyHall} />
    </div>
}

export default MontyHall;