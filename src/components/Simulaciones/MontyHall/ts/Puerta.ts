import { Graphics, DisplayObject } from 'createjs-module';

import { ICJSAlignContainer } from '../../../../constants/createjs/createjsAlignContainer';
import { CJSContainer } from '../../../../constants/createjs/createjsContainer';
import CJSShape from '../../../../constants/createjs/createjsShape';
import MConteo_Caso from '../../../../constants/probabilidad/conteo/MConteo_Caso';

import TS_MontyHall from './TS_MontyHall';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';

class Puerta implements ICJSAlignContainer {

    container = new CJSContainer();
    f = new CJSShape();

    caso = new MConteo_Caso();

    scene: CJSScene;

    constructor(scene: CJSScene) {
        this.scene = scene;

        this.scene.addChild(this.container);

        this.container.setBackground("#F6F6F6");

        this.f.create("puerta", new createjs.Shape(), this.container);
        this.f.create("signo", new createjs.Text("?", "150px arial"), this.container);

        this.mouseEvent();
    }
    getGraphics(): DisplayObject {
        return this.container.container;
    }




    mouseEvent() {
        var [puerta, signo] = this.f.getShape("puerta", "signo");

        this.container.on("mouseover", () => {
            if (puerta.stateIDUse != "abierta") {
                puerta.getState("sobre");
                this.scene.update();
            }
        });

        this.container.on("mouseout", () => {
            if (puerta.stateIDUse != "abierta") {
                puerta.getState("cerrada");
                this.scene.update();
            }
        });

        this.container.on("click", () => {
            if (puerta.stateIDUse != "abierta") {
                var [premio] = this.f.getShape("premio");
                puerta.getState("abierta");
                signo.removeStage();
                premio.visible = true;
                this.scene.update();

            }
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


        var premio = this.f.create("premio", new createjs.Shape(), this.container) as createjs.Shape;
        var con = this.caso.getProp("contiene", "string");


        premio.graphics.beginFill(con == "Auto" ? "blue" : "red").drawCircle(x + (width / 2), y + (height / 2), width * .3);
        premio.visible = false;

        this.scene.update();
    }

    destroy() {
        this.f.removeAllChildren();
        this.scene.removeChild(this.container);
        this.container.removeAllEventListeners();
    }

    setTransform(x: number, y: number, width: number, height: number): void {
        this.container.setBounds(x, y, width, height);

        var [signo] = this.f.getText("signo");
        let b = signo.getBounds();

        signo.x = x + (width / 2) - (b.width / 2);
        signo.y = y + (height / 2) - (b.height / 2);


        this.scene.update();
    }


}

export default Puerta;