import { Bitmap, Tween } from "createjs-module";

import { ICJSGetBounds, ICJSAlignContainer } from '../../../../constants/createjs/createjsAlignContainer';

class Carta implements ICJSAlignContainer {

    graphics: Bitmap;
    value: number;

    constructor(graphics: Bitmap, value: number) {
        this.graphics = graphics;
        this.value = value;
    }
    setTransform(x: number, y: number, width: number, height: number): void {
        this.graphics.setBounds(x, y, width, height);        
    }

    getGraphics(){
        return this.graphics;
    }


    getBounds(): { x: number; y: number; width: number; height: number; } {
        return this.graphics.getBounds();
    }



}

export default Carta;