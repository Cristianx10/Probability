import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { mente } from '../../App/App';
import Canvas from "../../Canvas/Canvas";
import Chat from "../../Chat/Chat";
import Saludo from "../../../configValues/Saludo.json";
import { IStore } from '../../../redux/Store';
import Store from '../../../redux/Store';
import { random } from '../../../constants/helpers/helpers';
import Asistente from '../../../constants/convesacion/Asistente/Asistente';
import ManagerObjetivos from '../../../constants/probabilidad/ManagerObjetivos/ManagerObjetivos';
import { type as addMessage } from '../../../redux/asistente/actions/addMessage';

import "./MontyHall.scss";

import TS_MontyHall from './ts/TS_MontyHall';

const MontyHall = () => {

    const user = useSelector((store: IStore) => store.sUser);

    const [TMontyHall] = useState(new TS_MontyHall());
    const [asistente] = useState(new Asistente());
    const [managerObjetivos] = useState(new ManagerObjetivos(TMontyHall));


    useEffect(() => {
        console.log("SE CARGO LA ACTIVIDAD")
        TMontyHall.setAsistente(asistente);

        // TMontyHall.inicio.initLogic.init.exe();
        TMontyHall.inicio.initLogic.generarPuertas.initHilo();
        TMontyHall.inicio.initLogic.generarPuertas.exe();

        /*asistente.decidir.addConocimiento(Saludo);


        asistente.decidir.ejecutarAccion("#saludo", (r: { id: string, respuesta: string, acciones: Function[] }) => {

            for (let index = 0; index < r.acciones.length; index++) {
                let accion = r.acciones[index];
                
                accion(() => {
                    asistente.addMensaje(`Respuesta: ${r.id} |  ${r.respuesta}`, undefined, () => { });
                });

            }
        });

        */

        /*
        asistente.setDefaulEvent({ event: "script" });
        asistente.addMensaje("Hola, bienvenido a probability aqui aprenderas los fundamentos de probabilidad", { time: 1000 })
        asistente.addMensaje("Mi nombre es Jorge. Y te estare acompañando a traves de esta interacción", { time: 1000 });
        asistente.addMensaje("Bien, comencemos");
*/

        /*
        
                var c = TMontyHall.inicio.eConteo;
        
                let obj = c.toTextComas(c.getCasosPropsNoRepeat("nombre"), "Minus");
                let objs = c.toTextComas(c.getCasosPropsNoRepeat("nombre", { favorable: true }), "Minus");
                let favor = c.getFavorables();
                let posi = c.getPosibles();
        
                asistente.addMensaje(`En este momento ${obj.plural ? "tenemos" : "tengo"} ${posi} ${obj.result}, detras de todas ${obj.plural ? "estas" : "esta"} ${obj.result} se encuentran ${favor > 1 ? favor : "una"} ${objs.result} con un PREMIO especial`);
                asistente.addMensaje(`¿Cuál crees que es la posibilidad de atinarle a ${favor > 1 ? favor : "una"} ${objs.result} correcta?`, { event: "qInput" })
        */

    }, []);

    return <div className="MontyHall">
        <Chat asistente={asistente} />
        <Canvas canvas={TMontyHall} />
    </div>
}

export default MontyHall;