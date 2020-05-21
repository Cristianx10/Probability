import React, { useState, useEffect } from "react";
import TS_MontyHall from './ts/TS_MontyHall';
import Canvas from "../../Canvas/Canvas";
import ManagerObjetivos from '../../../constants/probabilidad/ManagerObjetivos/ManagerObjetivos';

import { useSelector, useDispatch } from "react-redux";

import "./MontyHall.scss";
import { IStore } from '../../../redux/Store';
import Asistente from '../../../constants/convesacion/Asistente/Asistente';

import Store from '../../../redux/Store';
import { type as addMessage } from '../../../redux/asistente/actions/addMessage';
import Chat from "../../Chat/Chat";

const MontyHall = () => {

    const user = useSelector((store: IStore) => store.sUser);

    const [TMontyHall] = useState(new TS_MontyHall());
    const [asistente] = useState(new Asistente());
    const [managerObjetivos] = useState(new ManagerObjetivos(TMontyHall));


    useEffect(() => {
        TMontyHall.setAsistente(asistente);

        asistente.addMensaje("Hola","script", 1000)
        asistente.addMensaje("Mi nombre es Jorge. Y te estare acompañando a traves de esta interacción","script", 2000)

    }, []);

    return <div className="MontyHall">
        <Chat asistente={asistente} />
        <Canvas canvas={TMontyHall} />
    </div>
}

export default MontyHall;