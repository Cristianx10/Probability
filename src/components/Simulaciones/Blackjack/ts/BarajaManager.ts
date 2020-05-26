import { LoadQueue, Bitmap, Tween, Ticker } from 'createjs-module';

import CJSLoad from '../../../../constants/createjs/Scene/createjsLoad';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';

import Carta from './Carta';

class BarajaManger implements CJSLoad {

    carga = new LoadQueue();
    graphicsImg: { id: string, img: Bitmap, value: number }[]
    scene: CJSScene;

    fload?: Function;


    constructor(scene: CJSScene) {
        this.scene = scene;
        this.graphicsImg = [];
        this.carga.loadManifest(
            [
                { id: "A", src: "/img/simulaciones/blackjack/cartas/A.png", value: 1 },
                { id: "2", src: "/img/simulaciones/blackjack/cartas/2.png", value: 2 },
                { id: "3", src: "/img/simulaciones/blackjack/cartas/3.png", value: 3 },
                { id: "4", src: "/img/simulaciones/blackjack/cartas/4.png", value: 4 },
                { id: "5", src: "/img/simulaciones/blackjack/cartas/5.png", value: 5 },
                { id: "6", src: "/img/simulaciones/blackjack/cartas/6.png", value: 6 },
                { id: "7", src: "/img/simulaciones/blackjack/cartas/7.png", value: 7 },
                { id: "8", src: "/img/simulaciones/blackjack/cartas/8.png", value: 8 },
                { id: "9", src: "/img/simulaciones/blackjack/cartas/9.png", value: 9 },
                { id: "10", src: "/img/simulaciones/blackjack/cartas/10.png", value: 10 },
                { id: "J", src: "/img/simulaciones/blackjack/cartas/J.png", value: 11 },
                { id: "Q", src: "/img/simulaciones/blackjack/cartas/Q.png", value: 12 },
                { id: "K", src: "/img/simulaciones/blackjack/cartas/K.png", value: 13 },
            ]
        );

        this.carga.on("fileload", (r: any) => {
            this.graphicsImg.push({ id: r.id, img: r.result, value: r.item.value });
        });

        this.carga.on("complete", () => {
           // console.log("FELICITACIONES, SE CARGAN TODOS LOS COMPONENTES", this.fload)
            if (this.fload) {
                this.fload();
            }
        })

        /*
        Ticker.addEventListener("tick", (e: any) => {

            if (!e.paused) {
                this.scene.update();
                console.log("update")
            }

        });
        */
    }


    load(f: Function): void {
        this.fload = f;
    }


    generarCartas(numero: number) {
        var arrayCartas: Carta[] = [];
        for (let index = 0; index < numero; index++) {
            this.graphicsImg.forEach((g) => {
                var carta = new Carta(new Bitmap(g.img), g.value);
                carta.scena = this.scene;
                arrayCartas.push(carta);
            });
        }
        return arrayCartas;
    }

}

export default BarajaManger;