import { Shape } from 'createjs-module';

import BarajaManger from '../ts/BarajaManager';
import Jugador from '../ts/Jugador';
import { FCJSAlignCenterCenter } from '../../../../constants/createjs/createjsAlignContainer';
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

        this.crupier = new Jugador();

        //De 4 a 8 jugadores
        this.jugadores = [];

        this.barajaManager = new BarajaManger(this);
        this.setBackground("#034007");

        this.barajaManager.load(() => {
            var cartas = this.barajaManager.generarCartas(1);

            shuffle(cartas);

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