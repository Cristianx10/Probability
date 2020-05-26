import { Container, Shape, DisplayObject } from "createjs-module";

export interface ICJSIsConteiner {
    getContainer(): Container;
}

export class CJSContainer implements ICJSIsConteiner {

    container = new Container();
    background = new Shape();
    VALUE_BACKGROUND: string = "white";

    constructor() {
        this.container.addChild(this.background);
        this.container.cursor = "pointer";
        this.setBounds(0, 0, 100, 100);
    }

    addChild(...children: DisplayObject[] | ICJSIsConteiner[]) {

        children.forEach((c: DisplayObject | ICJSIsConteiner) => {
            if ((c as ICJSIsConteiner).getContainer != null) {
                this.container.addChild((c as ICJSIsConteiner).getContainer());
            } else {
                this.container.addChild((c as DisplayObject));
            }
        });

    }

    removeChild(...children: DisplayObject[] | ICJSIsConteiner[]) {
        children.forEach((c: DisplayObject | ICJSIsConteiner) => {
            if ((c as ICJSIsConteiner).getContainer != null) {
                this.container.removeChild((c as ICJSIsConteiner).getContainer());
            } else {
                this.container.removeChild((c as DisplayObject));
            }
        });
    }

    setBackground(value: string) {
        this.VALUE_BACKGROUND = value;
        var { x, y, width, height } = this.getBounds();
        this.background.graphics.clear().beginFill(this.VALUE_BACKGROUND).rect(0, 0, width, height);
    }

    on(type: string, event: Function) {
        this.container.on(type, (e) => { event(e); });

    }

    removeAllEventListeners() {
        this.container.removeAllEventListeners();
    }

    getContainer(): Container {
        return this.container;
    }

    setBounds(x?: number, y?: number, width?: number, height?: number) {
        var d = this.getBounds();

        var fX = x ? x : (d.x ? d.x : 0);
        var fY = y ? y : (d.y ? d.y : 0);
        var fWidth = width ? width : (d.width ? d.width : 0);
        var fHeight = height ? height : (d.height ? d.height : 0);

        this.container.setBounds(fX, fY, fWidth, fHeight);
        this.container.x = fX;
        this.container.y = fY;
        this.background.graphics.clear().beginFill(this.VALUE_BACKGROUND).rect(0, 0, fWidth, fHeight);
    }

    getBounds() {
        var bounds = this.container.getBounds();

        if (bounds == null) {
            this.container.setBounds(0, 0, 0, 0);
            bounds = this.container.getBounds();
        }

        return bounds;
    }

}
