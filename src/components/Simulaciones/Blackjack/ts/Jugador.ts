import { Shape, Text } from 'createjs-module';

import { FCJSAlignCenterCenter, FCJSAlignDistLeft, ICJSAlignContainer } from '../../../../constants/createjs/createjsAlignContainer';
import { CJSContainer } from '../../../../constants/createjs/createjsContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';

import Carta from './Carta';

class Jugador extends CJSContainer implements ICJSAlignContainer {

    cartas: Carta[] = [];
    scene: CJSScene;
    cuenta: number;
    f = new CJSShape();

    constructor(scene: CJSScene) {
        super();
        this.scene = scene;
        this.cuenta = 0;
        this.scene.addChild(this);
        this.addChild(new Text())
        this.f.create<Text>("cuenta", new Text("No tengo cartas", "30px arial"), this).y = -30;
    }

    addCarta(card: Carta) {
        this.cartas.push(card);
        this.addChild(card.getGraphics());

        var [t] = this.f.getText("cuenta");
        t.text = `Mis cartas son ${this.getValueCards()}`;

        FCJSAlignDistLeft({ x: 0, y: 0 }, this.cartas);

        this.scene.update();
    }

    getValueCards() {
        var valor = 0;
        var valueCards: number[] = [];

        this.cartas.forEach((c) => {
            valueCards.push(c.getValue());
        })

        //Mayor a menos
        valueCards.sort((a, b) => { return b - a });

        valueCards.forEach((c) => {
            if (c != 1) {
                valor += c;
            } else {
                if (valor + 11 <= 21) {
                    valor += 11;
                } else {
                    valor += 1;
                }
            }
        });
        return valor;
    }

    setTransform(x?: number, y?: number, width?: number | undefined, height?: number | undefined): void {
        this.setBounds(x, y, width, height);
        this.container.x = x ? x : 0;
        this.container.y = y ? y : 0;
    }
    
    getGraphics(): createjs.DisplayObject {
        return this.container;
    }


}

export default Jugador;