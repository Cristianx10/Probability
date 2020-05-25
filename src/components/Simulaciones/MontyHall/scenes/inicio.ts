import { Shape } from "createjs-module";

import Puerta from "../ts/Puerta";
import TS_MontyHall from '../ts/TS_MontyHall';
import { FCJSAlignCenterCenter } from '../../../../constants/createjs/createjsAlignContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';
import CJSSceneManager from '../../../../constants/createjs/Scene/createjsSceneManager';
import { typeProps } from '../../../../constants/probabilidad/conteo/MConteo_Caso';
import ManagerConteo from '../../../../constants/probabilidad/conteo/ManagerConteo';
import MConteo_Controller from "../../../../constants/probabilidad/conteo/ManagerConteoController";

class inicio extends CJSScene implements MConteo_Controller {

    f = new CJSShape();
    puertas: Puerta[] = [];
    montyHall: TS_MontyHall;
    eConteo: ManagerConteo;

    constructor(sceneManger: CJSSceneManager, montyHall: TS_MontyHall) {
        super(sceneManger);
        this.montyHall = montyHall;

        this.eConteo = new ManagerConteo(this);
        if(this.montyHall.asistente){
            this.eConteo.mDecision.setAsistente(this.montyHall.asistente)
        }
        this.eConteo.execute()
    }

    nCasosTotal = 0;
    nCasosMin = 1;
    nCasosMax = 12;


    limpiarCasos() {
        this.puertas.forEach((p) => {
            p.destroy();
        });
        this.puertas = [];
        this.eConteo.limpiarCasos();
    }

    agregarCaso(type: typeProps) {
        var puerta = new Puerta(this);
        puerta.caso.combineProps(type);

        var caso = puerta.caso;

        this.addPuerta(puerta);

        this.eConteo.addCaso(puerta.caso);

        switch (caso.getProp("variacion")) {
            case 0:
                caso.addProp("nombre", { valueSpecific: { singular: "Puerta", plural: "Puertas" } });
                caso.addProp("contiene", { value: "Cabra" });
                break;
            case 1:
                caso.addProp("nombre", { valueSpecific: { singular: "Puerta", plural: "Puertas" } });
                caso.addProp("contiene", { valueSpecific: { singular: "Auto", plural: "Autos" } });
                break;
        }

        return puerta.caso;

    }

    generarScena() {

        FCJSAlignCenterCenter(this, this.puertas, 200, 200,
            {});

        this.puertas.forEach((p) => { p.draw(); });
        this.update();
    }


    addPuerta(puerta: Puerta) {
        this.puertas.push(puerta);
    }

    configValues() {

        var line = this.f.create("line", new Shape(), this.container) as Shape;

        /*
                if (this.sceneManager) {
                    let g = this.sceneManager.getBounds();
                    line.graphics.beginFill("#FF9600").rect(0, 550, g.width, 50)
                }
                */
    }

}

export default inicio;