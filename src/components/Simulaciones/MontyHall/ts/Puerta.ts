
import * as createjs from 'createjs-module';

import { ICJSAlignContainer } from '../../../../constants/createjs/createjsAlignContainer';

import TS_MontyHall from './TS_MontyHall';
import { CJSContainer } from '../../../../constants/createjs/createjsContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';
import { create } from 'domain';
import { Graphics } from 'createjs-module';

class Puerta implements ICJSAlignContainer {

    global: TS_MontyHall;
    container = new CJSContainer();
    f = new CJSShape();

    g = new createjs.Graphics();


    constructor(global: TS_MontyHall) {
        this.global = global;

        this.container.setBackground("#F6F6F6");
        this.global.addChild(this.container);
        this.global.update();

        this.f.create("puerta", new createjs.Shape(), this.container);
        this.f.create("signo", new createjs.Text("?", "200px arial"), this.container);


        this.mouseEvent();
    }

    mouseEvent() {
        var [puerta, signo] = this.f.getShape("puerta", "signo");

        this.container.on("mouseover", () => {
            if (puerta.stateIDUse != "abierta") {
                puerta.getState("sobre");
                this.global.update();
            }
        });

        this.container.on("mouseout", () => {
            if (puerta.stateIDUse != "abierta") {
                puerta.getState("cerrada");
                this.global.update();
            }
        });

        this.container.on("click", () => {
            puerta.getState("abierta");
            signo.removeStage();
            this.global.update();
        });

    }

    draw() {
        var { x, y, width, height } = this.container.getBounds();
        var [puerta, line] = this.f.getShape("puerta", "line");

        puerta.state["cerrada"] = new Graphics()
            .beginFill("#E5E5E5")
            .rect(x, y, width, height)
            .endFill()
            .beginStroke("#FF9600")
            .setStrokeStyle(20)
            .rect(x, y, width, height);

        puerta.state["sobre"] = new Graphics()
            .beginFill("#F6F6F6")
            .rect(x, y, width, height)
            .endFill()
            .beginStroke("#FF9600")
            .setStrokeStyle(20)
            .rect(x, y, width, height);

        puerta.state["abierta"] = new Graphics()
            .beginFill("#F6F6F6")
            .rect(x, y, width, height)
            .beginFill("#DFDFDF")
            .rect(x + 20, y + height * .1, width * .8, height * .8)
            .beginFill("#CBC8C8")
            .rect(x + 50, y + height * .2, width * .6, height * .6)
            .beginFill("#9D9B9B")
            .rect(x + 80, y + height * .3, width * .4, height * .4)
            .endFill()
            .beginStroke("#FF9600")
            .setStrokeStyle(20)
            .rect(x, y, width, height);

        puerta.getState("cerrada");





        this.global.update();
    }

    setTransform(x: number, y: number, width: number, height: number): void {
        this.container.setBounds(x, y, width, height);

        var [signo] = this.f.getText("signo");
        let b = signo.getBounds();

        signo.x = x + (width / 2) - (b.width / 2);
        signo.y = y + (height / 2) - (b.height / 2);


        this.global.update();
    }


}

export default Puerta;