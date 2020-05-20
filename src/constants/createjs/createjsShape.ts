import { Graphics, Shape, Text, Stage } from "createjs-module";

interface ICJSShape {
    state: any;
    getState: Function;
    stateIDUse: string;
    container: any;
    removeStage: Function;
    addStage: Function;
}


class CJSShape {

    s: any = {};

    create(id: string, object: any, stage?: any, move?: boolean) {

        if (stage) {
            stage.addChild(object);
        }

        object.state = {};
        object.container = stage;
        object.removeStage = () => {
            object.container.removeChild(object);
        }

        object.addStage = () => {
            object.container.addChild(object);
        }
        object.removeStage = () => {
            object.container.removeChild(object);
        }
        object.getState = (id: string) => {
            object.stateIDUse = id;
            object.graphics = new Graphics();
            object.graphics = object.state[id];
        };
        object.stateIDUse = "";
        this.s[id] = object;


        if (move) {
            var guia = new Text("", "40px arial");
            stage.addChild(guia);
            object.on("pressmove", (evt: any) => {
                if (stage) {
                    object.x = stage.mouseX;
                    object.y = stage.mouseY;

                    guia.x = stage.mouseX;
                    guia.y = stage.mouseY;

                    guia.text = `${stage.mouseX} , ${stage.mouseY}`
                    stage.update();
                }
            });

        }

        return object;

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