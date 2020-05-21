import Puerta from "../ts/Puerta";
import TS_MontyHall from '../ts/TS_MontyHall';
import { FCJSAlignCenterCenter } from '../../../../constants/createjs/createjsAlignContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';
import CJSSceneManager from '../../../../constants/createjs/Scene/createjsSceneManager';
import Objetivo from "../../../../constants/probabilidad/ManagerObjetivos/Objetivo";
import ManagerConteo from '../../../../constants/probabilidad/conteo/ManagerConteo';
import { random } from '../../../../constants/helpers/helpers';
import { Shape } from "createjs-module";

class inicio extends CJSScene {


    f = new CJSShape();
    puertas: Puerta[] = [];


    montyHall: TS_MontyHall;

    constructor(sceneManger: CJSSceneManager, montyHall: TS_MontyHall) {
        super(sceneManger);
        this.montyHall = montyHall;

        var nPuertas = 3 //random(2, 12);
        var nIndex = 2 //random(2, 12);


        for (let index = 0; index < nPuertas; index++) {

            var puerta = new Puerta(this);
            if (index === (nIndex-1)) {
                puerta.caso.favorable = true;
                puerta.caso.addProp("contiene", { valueSpecific: { singular: "Auto", plural: "Autos" } });
            }
            this.addPuerta(puerta);
            this.montyHall.eConteo.addCaso(puerta.caso);
        }

        this.configValues();
    }


    addPuerta(puerta: Puerta) {
        this.puertas.push(puerta);
    }

    configValues() {

        var line = this.f.create("line", new Shape(), this.container) as Shape;

        FCJSAlignCenterCenter(this, this.puertas, 200, 200,
            {});


        this.puertas.forEach((p) => {
            p.draw();
        })
        /*
                if (this.sceneManager) {
                    let g = this.sceneManager.getBounds();
                    line.graphics.beginFill("#FF9600").rect(0, 550, g.width, 50)
                }
                */

    }

}

export default inicio;