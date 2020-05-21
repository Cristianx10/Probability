import React, { useEffect, useRef } from "react";
import createjsConfig from '../../constants/createjs/createjsConfig';
import "./Canvas.scss";

interface ICanvas {
    canvas: createjsConfig;
}

const Canvas = (props: ICanvas) => {

    const container = useRef<HTMLDivElement | any>();

    useEffect(() => {
        console.log("SE CARGO EL CANVAS")
        if (container != null) {
            var containerHTML = container.current as HTMLDivElement;
            props.canvas.appendTo(containerHTML);
        }
    }, [])

    return <div className="Canvas" ref={container}>

    </div>

}

export default Canvas;