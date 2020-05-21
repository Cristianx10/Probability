import { Container, Shape } from "createjs-module";

import { ICJSIsConteiner } from "../createjsContainer";

import CJSSceneManager from './createjsSceneManager';

class CJSScene implements ICJSIsConteiner {

    container: Container = new Container();
    private background = new Shape();
    VALUE_BACKGROUND: string = "white";
    active: boolean = false;
    sceneManager?: CJSSceneManager;

    constructor(sceneManager: CJSSceneManager) {
        this.sceneManager = sceneManager;
        this.container.addChild(this.background);
        this.updateStage();
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

    update() {
        if (this.sceneManager) {
            this.sceneManager.stage.update();
        }
    }

    updateStage() {
        if (this.sceneManager) {
            var stage = this.sceneManager.getStage();
       
            var { x, y, width, height } = stage.getBounds();
            this.container.setBounds(x, y, width, height);
            this.drawBackground();
        }
    }

    on(type: string, event: Function) {
        this.container.on(type, (e) => { event(e); });
    }

    setBackground(value: string) {
        this.VALUE_BACKGROUND = value;
        this.drawBackground();
    }

    private drawBackground() {
        var { x, y, width, height } = this.getBounds();
        this.background.graphics.clear().beginFill(this.VALUE_BACKGROUND).rect(x, y, width, height);
    }

    getContainer(): createjs.Container {
        return this.container;
    }

    getBounds() {
        return this.container.getBounds();
    }
}

export default CJSScene;