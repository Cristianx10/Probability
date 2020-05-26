import { Graphics, Shape, Text, Stage, DisplayObject } from "createjs-module";

interface ICJSShape {
    state: any;
    getState: Function;
    stateIDUse: string;
    container: any;
    removeStage: Function;
    addStage: Function;
    graphics: Graphics;
}


class CJSShape {

    s: any = {};

    create<T>(id: string, object: DisplayObject, stage?: any, move?: boolean): T | DisplayObject & ICJSShape {

        if (stage) {
            stage.addChild(object);
        }

        var obj = object as DisplayObject & ICJSShape;

        obj.state = {};
        obj.container = stage;
        obj.removeStage = () => {
            obj.container.removeChild(obj);
        }

        obj.addStage = () => {
            obj.container.addChild(obj);
        }
        obj.removeStage = () => {
            obj.container.removeChild(obj);
        }
        obj.getState = (id: string) => {
            obj.stateIDUse = id;
            //obj.graphics = new Graphics();
            obj.graphics = obj.state[id];
        };
        obj.stateIDUse = "";
        this.s[id] = obj;


        if (move) {
            var guia = new Text("", "40px arial");
            stage.addChild(guia);
            obj.on("pressmove", (evt: any) => {
                if (stage) {
                    obj.x = stage.mouseX;
                    obj.y = stage.mouseY;

                    guia.x = stage.mouseX;
                    guia.y = stage.mouseY;

                    guia.text = `${stage.mouseX} , ${stage.mouseY}`
                    stage.update();
                }
            });

        }

        return obj;

    }

    removeAllChildren() {
        var shapes = Object.values(this.s);
        shapes.forEach((shape: any) => {
            shape.container.removeChild(shape);
        })
    }

    state(o: any) {
        return new Graphics();
    }

    t(): string {
        return "hola";
    }

    getShape(...ids: string[]) {

        var array = [this.t];

        var result: (Shape & ICJSShape)[];
        result = [];
        ids.forEach((id) => {
            result.push(this.s[id] as (Shape & ICJSShape));
        })
        return result;
    }

    getText(...ids: string[]) {
        var result: (Text & ICJSShape)[] = [];
        ids.forEach((id) => {
            var r = this.s[id] as (Text & ICJSShape);
            result.push(r);
        })
        return result;
    }

}

export default CJSShape;