import { Container, Shape } from "createjs-module";

import { ICJSIsConteiner } from "../createjsContainer";

import CJSSceneManager from './createjsSceneManager';

class CJSScene implements ICJSIsConteiner {

    container: Container = new Container();
    private background = new Shape();
    VALUE_BACKGROUND: string = "white";
    active: boolean = false;
    sceneManager?: CJSSceneManager;
    facciones?: Function;

    constructor(sceneManager: CJSSceneManager) {
        this.sceneManager = sceneManager;
        this.container.addChild(this.background);
        var b = this.sceneManager.getBounds();
        this.setBounds(b.x, b.y, b.width, b.height);
        this.updateStage();
    }

    isLoadFiles = false;
    private sceneLoadRequest: Function[] = [];
    private currentSceneLoad = 0;


    ejecutar(id: string, props: any) {
     
        if (this.facciones) {
            this.facciones(id, props);
        }
    }

    setAcciones(accion: Function) {
        this.facciones = accion;
    
    }


    addChild(...children: createjs.DisplayObject[] | ICJSIsConteiner[]) {

        children.forEach((c: createjs.DisplayObject | ICJSIsConteiner) => {
            if ((c as ICJSIsConteiner).getContainer != null) {
                this.container.addChild((c as ICJSIsConteiner).getContainer());
            } else {
                this.container.addChild((c as createjs.DisplayObject));
            }
        });
    }

    removeChild(...children: createjs.DisplayObject[] | ICJSIsConteiner[]) {
        children.forEach((c: createjs.DisplayObject | ICJSIsConteiner) => {
            if ((c as ICJSIsConteiner).getContainer != null) {
                this.container.removeChild((c as ICJSIsConteiner).getContainer());
            } else {
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

export default CJSScene;