import createjsConfig from '../../../../constants/createjs/createjsConfig';

import Puerta from './Puerta';
import { ICJSGetBounds, FCJSAlignCenterCenter } from '../../../../constants/createjs/createjsAlignContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';

class TS_MontyHall extends createjsConfig implements ICJSGetBounds {

    nPuertas = 0;
    puertas: Puerta[] = [];
    f = new CJSShape();

    constructor() {
        super();
        this.size(1280, 720);

        var line = this.f.create("line", new createjs.Shape(), this.stage);

        for (let index = 0; index < 3; index++) {
            var puerta = new Puerta(this);
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

    configValues() {

    }
}

export default TS_MontyHall;