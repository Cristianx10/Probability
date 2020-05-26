import { Shape } from 'createjs-module';

import BarajaManger from '../ts/BarajaManager';
import Jugador from '../ts/Jugador';
import { FCJSAlignCenterCenter, FCJSAlignDistLeft } from '../../../../constants/createjs/createjsAlignContainer';
import { shuffle } from '../../../../constants/helpers/helpers';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';
import CJSSceneManager from '../../../../constants/createjs/Scene/createjsSceneManager';

class juego extends CJSScene {

    barajaManager: BarajaManger;
    crupier: Jugador;
    jugadores: Jugador[];

    constructor(sceneManager: CJSSceneManager) {
        super(sceneManager);

        this.isLoadFiles = true;

        this.crupier = new Jugador(this);

        var b = this.getBounds();
        this.crupier.setBounds(300, 100, 600, 50);

        //De 4 a 8 jugadores
        this.jugadores = [];

        this.barajaManager = new BarajaManger(this);
        this.setBackground("#034007");

        var a = new Jugador(this);
        var c = new Jugador(this);
        this.jugadores.push(a);
        this.jugadores.push(c);
        FCJSAlignDistLeft({ x: 200, y: 400 }, this.jugadores, {padding:300});

        this.barajaManager.load(() => {
            var cartas = this.barajaManager.generarCartas(1);

            shuffle(cartas);


            this.crupier.addCarta(cartas[0]);
            this.crupier.addCarta(cartas[1]);
            this.crupier.addCarta(cartas[2]);


            a.addCarta(cartas[3])
            a.addCarta(cartas[4])
            a.addCarta(cartas[5])

            c.addCarta(cartas[6])
            c.addCarta(cartas[7])
            c.addCarta(cartas[8])


            this.update();

            /*

            cartas.forEach((carta, i) => {
                this.addChild(carta.graphics);
            });

            FCJSAlignCenterCenter(this, cartas, 170, 130, {anim:"continuo"});

            this.update();

            console.log("TODO ESTA CARGADO")
*/

        })

    }

}

export default juego;