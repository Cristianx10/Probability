import createjsConfig from '../../../../constants/createjs/createjsConfig';
import { ICJSGetBounds, FCJSAlignCenterCenter } from '../../../../constants/createjs/createjsAlignContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';

import ManagerConteo from '../../../../constants/probabilidad/conteo/ManagerConteo';
import Objetivo, { IObjetivos } from '../../../../constants/probabilidad/ManagerObjetivos/Objetivo';

import Puerta from './Puerta';
import Artyom from '../../../../constants/artyom.js/artyom';


var Jarvis = new Artyom();
Jarvis.initialize({ lang: "es-ES", listen: true });

/*
Jarvis.say("Bienvenido al programa de concursos aqui tendras que poner a prueba tu destreza para ganar el premio que esta detras de la puerta",
{
    onStart: function () {
        console.log("The text has been started.");
    },
    onEnd: function () {
        console.log("The text has been finished.");
    }
});
*/

Jarvis.addCommands([
    {
        indexes: ["Hola"],
        action: () => {
            Jarvis.say("Quien");
            Jarvis.say("Bienvenido al programa de concursos aqui tendras que poner a prueba tu destreza para ganar el premio que esta detras de la puerta")
            Jarvis.when("quien", ()=>{   Jarvis.say("Solo soy una inteligencia artificial implementada para tu comodidad")})
        }
    }
]);

Jarvis.addCommands([
    {
        indexes: ["Quien"],
        action: () => {
            Jarvis.say("Solo soy una inteligencia artificial implementada para tu comodidad")
        }
    }
]);

Jarvis.simulateInstruction("Hello");


class TS_MontyHall extends createjsConfig implements ICJSGetBounds, IObjetivos {

    nPuertas = 0;
    puertas: Puerta[] = [];
    f = new CJSShape();

    eConteo: ManagerConteo;
    objetivos: Objetivo[];

    constructor() {
        super();
        this.size(1280, 720);

        this.configValues();

        this.eConteo = new ManagerConteo();
        this.objetivos = [];

        this.objetivos.push(new Objetivo("#MontyHall", "Calcular la probabilidad de abrir una puerta", 1));

    }


    setConfig() {

    }

    configValues() {
        var line = this.f.create("line", new createjs.Shape(), this.stage);

        for (let index = 0; index < 3; index++) {
            var puerta = new Puerta(this);
            if (index === 2) {
                puerta.favorable = true;
            }
            this.puertas.push(puerta);
        }

        FCJSAlignCenterCenter(this, this.puertas, "20%", 400);


        this.puertas.forEach((p) => {
            p.draw();
        })

        let g = this.stage.getBounds();

        line.graphics.beginFill("#FF9600").rect(0, 550, g.width, 50)
    }

    getBounds(): { x: number; y: number; width: number; height: number; } {
        return this.stage.getBounds();
    }

    getObjetivos(): Objetivo[] {
        return this.objetivos;
    }


}

export default TS_MontyHall;