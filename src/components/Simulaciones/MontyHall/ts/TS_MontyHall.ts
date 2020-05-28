import inicio from '../scenes/inicio';
import { ICJSGetBounds } from '../../../../constants/createjs/createjsAlignContainer';
import createjsConfig from '../../../../constants/createjs/createjsConfig';
import Asistente from '../../../../constants/convesacion/Asistente/Asistente';
import { IIsAsistente } from '../../../../constants/convesacion/Asistente/Asistente';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';
import Objetivo, { IObjetivos } from '../../../../constants/probabilidad/ManagerObjetivos/Objetivo';


class TS_MontyHall extends createjsConfig implements ICJSGetBounds, IObjetivos, IIsAsistente {

    nPuertas = 0;

    asistente?: Asistente;

    inicio: inicio;

    constructor() {
        super();
        this.size(1280, 720);

        this.inicio = new inicio(this.scene, this);
        this.scene.addScene(this.inicio, false);
        this.update();
    }

    setAsistente(asistente: Asistente) {
        this.asistente = asistente;
    }

    getObjetivos() {
        return [
            new Objetivo("#MontyHall", "Calcular la probabilidad de abrir una puerta", 1)
        ];
    }

}

export default TS_MontyHall;



/*
var Jarvis = new Artyom();

Jarvis.initialize({
    lang: "es-ES",
    listen: true,
    continuous: true,
    debug: true,
    speed: 1
});

Jarvis.addCommands([
    {
        indexes: ["Hola", "si", "se"],
        action: (i: number) => {
            if (i == 0) {
                Jarvis.say("Bienvenido al programa de concursos aqui tendras que poner a prueba tu destreza. ¿Te gustaria ganar el premio que hay detras de las puertas?")
            } else {
                Jarvis.say("Cual es tu nombre", {
                    onEnd: () => {
                        var a = Jarvis.redirectRecognizedTextOutput((text: string, isFinal: boolean) => {
                            if (isFinal) {
                                var dispatch = Store.dispatch({ type: updateUser, payload: text });
                                Jarvis.say(`Bienvenido ${text}`);
                                Jarvis.redirectRecognizedTextOutput(()=>{});
                            } else {

                            }
                        });
                    }
                })
            }
        }
    },
    {
        indexes: ["Quien es paciente"],
        action: () => {
            Jarvis.say("Solo soy una inteligencia artificial implementada para tu comodidad")
        }
    }
]);

*/