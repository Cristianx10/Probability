import { Graphics, Tween, DisplayObject, Ticker } from 'createjs-module';
export interface ICJSGetBounds {
    getBounds(): { x: number, y: number, width: number, height: number };
}

export interface ICJSAlignContainer {
    setTransform(x?: number, y?: number, width?: number, height?: number): void;
    getGraphics(): DisplayObject;
}

export const FCJSAlignCenterCenter = (base: ICJSGetBounds, objects: ICJSAlignContainer[], width: number | string, height: number, config?: { padding?: number, graphics?: Graphics, anim?: "continuo" | "start" }) => {

    var b = base.getBounds();

    var nContainers = objects.length;

    const widthTotal = b.width;
    const heightTotal = b.height;


    const padding = config ? (config.padding != null ? config.padding : 50) : 50;

    if ((width + "").includes("%")) {
        let w = parseInt(width + "") / 100;
        width = Math.floor((widthTotal * w));
    } else {
        width = parseInt(width + "");
    }

    var seccionesX = Math.floor(widthTotal / width);
    var seccionesY = Math.floor(heightTotal / height);

    var seccionSpaceX = seccionesX > nContainers ? nContainers : seccionesX;
    var spaceX = (widthTotal - (width * seccionSpaceX)) / (seccionSpaceX + 1);

    var nItemVerical = Math.ceil(nContainers / seccionSpaceX);

    console.log("Mis secciones en X", nContainers, seccionSpaceX)

    console.log("Vertical item", nItemVerical)

    var seccionSpaceY = seccionesY > nItemVerical ? nItemVerical : seccionesY;

    var spaceY = (heightTotal - (height * seccionSpaceY)) / (seccionSpaceY + 1);


    var cy = spaceY;
    var cx = 0;
    var count = 0;

    var glo: any = {};

    for (let index = 0; index < nContainers; index++) {

        var object = objects[index];

        var countIndex = index - count;
        var pad = padding / 2;
        cx += spaceX;

        var x = cx + pad;
        var y = cy;

        object.setTransform(x, y, width - padding, height);


        if (config && config.anim) {

            if (index > 0) {
                glo[index] = {};
                glo[index].x = (cx + pad) * 1;
                glo[index].y = cy * 1;
                glo[index].f = () => {

                    Tween.get(objects[index].getGraphics()).to({ x: glo[index].x, y: glo[index].y }, 200).call(() => {
                        if (glo[index + 1] != null) {
                            glo[index + 1].f();
                            console.log("Ejecutando... ", index + 1)
                        } else {
                            setTimeout(() => {
                                Ticker.removeAllEventListeners();
                            }, 1000)

                            console.log("Removido")
                        }
                    });

                }
            } else {

                Tween.get(object.getGraphics()).to({ x: cx + pad, y: cy }, 200).call(() => {
                    if (glo[index + 1] != null) {
                        glo[index + 1].f();
                        console.log("Ejecutando... ", index + 1)
                    }
                });

            }
        } else {
            object.getGraphics().x = x;
            object.getGraphics().y = y;
        }


        if (config && config.graphics) {
            config.graphics
                .beginFill("red")
                .rect(cx + pad, cy, width - padding, height)
                .endFill()
                .beginStroke("black")
                .rect(cx, cy, width, height);
        }

        if ((countIndex + 1) === seccionesX) {
            cy += height + spaceY;
            cx = 0;
            count = index + 1;


            var realNContainers = nContainers - (index + 1);
            if (realNContainers < seccionSpaceX) {
                seccionSpaceX = seccionesX > realNContainers ? realNContainers : seccionesX;

                spaceX = (widthTotal - (width * seccionSpaceX)) / (realNContainers + 1);
            }

        } else {
            cx += width;
        }


    }
}



export const FCJSAlignDistLeft = (pos: { x: number, y: number }, objects: ICJSAlignContainer[], config?: { padding?: number, graphics?: Graphics, anim?: "continuo" | "start" }) => {


    const padding = config ? (config.padding != null ? config.padding : 50) : 50;

    for (let index = 0; index < objects.length; index++) {

        var object = objects[index];
        var x = pos.x + padding * (index);
        var y = pos.y;
        
        object.setTransform(x, y);



    }
}