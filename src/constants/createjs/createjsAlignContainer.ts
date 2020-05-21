import { Graphics } from 'createjs-module';
export interface ICJSGetBounds {
    getBounds(): { x: number, y: number, width: number, height: number };
}

export interface ICJSAlignContainer {
    setTransform(x: number, y: number, width: number, height: number): void;
}

export const FCJSAlignCenterCenter = (base: ICJSGetBounds, objects: ICJSAlignContainer[], width: number | string, height: number, config?: { padding?: number, graphics?: Graphics }) => {

    var b = base.getBounds();

    var nContainers = objects.length;

    const widthTotal = b.width;
    const heightTotal = b.height;

    const padding = 50;

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

    var nItemVerical = Math.round(nContainers / seccionSpaceX);


    var seccionSpaceY = seccionesY > nItemVerical ? nItemVerical : seccionesY;

    var spaceY = (heightTotal - (height * seccionSpaceY)) / (seccionSpaceY + 1);


    var cy = spaceY;
    var cx = 0;
    var count = 0;

    for (let index = 0; index < nContainers; index++) {

        var object = objects[index];

        var countIndex = index - count;
        var pad = padding / 2;
        cx += spaceX;


        object.setTransform(cx + pad, cy, width - padding, height);

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