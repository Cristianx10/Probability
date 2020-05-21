import { Stage, Shape, Container, DisplayObject, Graphics } from 'createjs-module';

import { ICJSIsConteiner } from './createjsContainer';

import CJSSceneManager from './Scene/createjsSceneManager';

class createjsConfig {

    STATIC_CANVAS_BOUNDS = { width: 0, height: 0 };
    VALUE_BACKGROUND: string = "white";

    private background = new Shape();
    container = new Container();

    stage: Stage;
    canvas: HTMLCanvasElement;
    HTMLContainer?: HTMLElement;

    scene = new CJSSceneManager(this);

    constructor() {
        this.canvas = document.createElement("canvas");
        this.stage = new Stage(this.canvas);
        this.stage.addChild(this.background, this.container);
        this.stage.enableMouseOver();
    }

    size(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.stage.setBounds(0, 0, width, height);
        this.container.setBounds(0, 0, width, height);
        this.STATIC_CANVAS_BOUNDS = { width, height };
    }

    appendTo(div: HTMLDivElement | HTMLElement) {
        this.HTMLContainer = div;

        div.style.width = `${this.canvas.width}px`;
        div.style.height = `${this.canvas.height}px`;

        div.appendChild(this.canvas);

        this.drawBackground();

        /*
        this.resizeResponsive();
        window.addEventListener("resize", () => {
            this.resizeResponsive();
        })
        */
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

    removeAllChildren() {
        this.container.removeAllChildren();
    }

    setBackground(value: string) {
        this.VALUE_BACKGROUND = value;
        this.drawBackground();
    }

    private drawBackground() {
        var { x, y, width, height } = this.stage.getBounds();
        this.background.graphics.beginFill(this.VALUE_BACKGROUND)
            .rect(x, y, width, height);
    }

    update() {
        this.stage.update();
    }

    getBounds() {
        return this.stage.getBounds();
    }

    distribuir(graphis: Graphics, nContainers: number, width: number, height: number) {

        const widthTotal = this.canvas.width;
        const heightTotal = this.canvas.height;
        const padding = 50;

        var seccionesX = Math.floor(widthTotal / width);
        var seccionesY = Math.floor(heightTotal / height);

        var seccionSpaceX = seccionesX > nContainers ? nContainers : seccionesX;
        var spaceX = (widthTotal - (width * seccionSpaceX)) / (seccionSpaceX + 1);

        var nItemVerical = Math.round(nContainers / seccionSpaceX);


        var seccionSpaceY = seccionesY > nItemVerical ? nItemVerical : seccionesY;
        console.log(seccionSpaceY)
        var spaceY = (heightTotal - (height * seccionSpaceY)) / (seccionSpaceY + 1);


        var cy = spaceY;
        var cx = 0;
        var count = 0;

        for (let index = 0; index < nContainers; index++) {

            var countIndex = index - count;
            var pad = padding / 2;
            cx += spaceX;


            graphis
                .beginFill("red")
                .rect(cx + pad, cy + pad, width - padding, height - padding)
                .endFill()
                .beginStroke("black")
                .rect(cx, cy, width, height);

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
    resizeResponsive() {

        var width = document.documentElement.clientWidth;
        //var height = document.documentElement.clientHeight;

        // Simple "fit-to-screen" scaling
        //var ratio = this.canvas.width / this.canvas.height; // Use the "default" size of the content you have.

        //var windowRatio = width / height;

        var scale = width / this.canvas.width;

        if (scale <= 1) {
            this.stage.scaleX = this.stage.scaleY = scale;

            this.canvas.width = this.STATIC_CANVAS_BOUNDS.width;
            this.canvas.height = this.STATIC_CANVAS_BOUNDS.height;

            if (this.HTMLContainer) {
                this.HTMLContainer.style.width = `${this.canvas.width * scale}px`;
                this.HTMLContainer.style.height = `${this.canvas.height * scale}px`;
            }
        } else {
            /*
            this.state.scaleX = this.state.scaleY = scale;

            this.canvas.width = this.STATIC_CANVAS_BOUNDS.width * scale;
            this.canvas.height = this.STATIC_CANVAS_BOUNDS.height * scale;

            if (this.HTMLContainer) {
                this.HTMLContainer.style.width = `${this.STATIC_CANVAS_BOUNDS.width * scale}px`;
                this.HTMLContainer.style.height = `${this.STATIC_CANVAS_BOUNDS.height * scale}px`;
            }
            */
        }


        this.stage.update();
    }
}

export default createjsConfig;