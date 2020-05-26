import { Bitmap, Tween } from "createjs-module";

import { ICJSGetBounds, ICJSAlignContainer } from '../../../../constants/createjs/createjsAlignContainer';
import CJSScene from '../../../../constants/createjs/Scene/createjsScene';

class Carta implements ICJSAlignContainer {

    graphics: Bitmap;
    value: number;
    temPos: { x: number, y: number } = { x: 0, y: 0 }
    scena?: CJSScene;

    constructor(graphics: Bitmap, value: number) {
        this.graphics = graphics;
        this.value = value;

        this.graphics.on("mouseover", () => {
            this.graphics.y -= 30;
            this.update();
        })

        this.graphics.on("mouseout", () => {
            this.graphics.y = this.temPos.y;
            this.update();
        })
    }

    update(){
        if(this.scena){
            this.scena.update();
        }
    }

    setTransform(x: number, y: number, width: number, height: number): void {
        this.graphics.setBounds(x, y, width, height);
        this.graphics.x = x;
        this.graphics.y = y;
        this.temPos = { x, y };
    }

    getGraphics() {
        return this.graphics;
    }


    getBounds(): { x: number; y: number; width: number; height: number; } {
        return this.graphics.getBounds();
    }

    getValue(){
        if(this.value > 10){
            return 10;
        }else{
            return this.value;
        }
    }


}

export default Carta;