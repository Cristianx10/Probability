export interface ICJSIsConteiner {
    getContainer(): createjs.Container;
}

export class CJSContainer implements ICJSIsConteiner {


    container = new createjs.Container();
    background = new createjs.Shape();
    VALUE_BACKGROUND: string = "white";

    constructor() {
        this.container.addChild(this.background);
        this.container.cursor = "pointer";
        this.setBounds(0, 0, 100, 100);
    }

    addChild(...children: createjs.DisplayObject[] | ICJSIsConteiner[]) {

        children.forEach((c: createjs.DisplayObject | ICJSIsConteiner) => {
            if((c as ICJSIsConteiner).getContainer != null){
                this.container.addChild((c as ICJSIsConteiner).getContainer());
            }else{
                this.container.addChild((c as createjs.DisplayObject));
            }
        });

    }

    removeChild(...children: createjs.DisplayObject[] | ICJSIsConteiner[]){
        children.forEach((c: createjs.DisplayObject | ICJSIsConteiner) => {
            if((c as ICJSIsConteiner).getContainer != null){
                this.container.removeChild((c as ICJSIsConteiner).getContainer());
            }else{
                this.container.removeChild((c as createjs.DisplayObject));
            }
        });
    }

    setBackground(value: string) {
        this.VALUE_BACKGROUND = value;
        var { x, y, width, height } = this.getBounds();
        this.background.graphics.clear().beginFill(this.VALUE_BACKGROUND).rect(x, y, width, height);
    }

    on(type: string, event: Function) {
        this.container.on(type, (e) => { event(e); });
    }

    getContainer(): createjs.Container {
        return this.container;
    }

    setBounds(x: number, y: number, width: number, height: number) {
        this.container.setBounds(x, y, width, height);
        this.background.graphics.clear().beginFill(this.VALUE_BACKGROUND).rect(x, y, width, height);
    }

    getBounds() {
        return this.container.getBounds();
    }

}
