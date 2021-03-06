import { Shape } from 'createjs-module';

import BarajaManger from '../ts/BarajaManager';
import Jugador from '../ts/Jugador';
import { FCJSAlignCenterCenter, FCJSAlignDistLeft } from '../../../../constants/createjs/createjsAlignContainer';
import { shuffle } from '../../../../constants/helpers/helpers';
import ServerGlobal from '../../../../constants/multiplayer/ServerGlobal';
import prop from '../../../../constants/multiplayer/prop';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';
import CJSSceneManager from '../../../../constants/createjs/Scene/createjsSceneManager';
import TS_Blackjack from '../ts/TS_Blackjack';
import Sofia from '../../../../constants/Sofia/Sofia';

class juego extends CJSScene {

    barajaManager: BarajaManger;
    crupier: Jugador;
    jugadores: Jugador[];
    blackjack: TS_Blackjack;

    logic: Sofia;

    servidor?: ServerGlobal;
    //  movidas: prop<number>;

    constructor(blackjack: TS_Blackjack) {
        super(blackjack.scene);
        this.blackjack = blackjack;
        
        this.logic = new Sofia("crupier");

        this.blackjack.event.getEvent("loadServer", () => {
            if (this.blackjack.server) {


            }
        })




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
        FCJSAlignDistLeft({ x: 200, y: 400 }, this.jugadores, { padding: 300 });

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

        })

    }

}

export default juego;