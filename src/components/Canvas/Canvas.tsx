import React, { useEffect, createRef } from "react";
import createjsConfig from '../../constants/createjs/createjsConfig';
import "./Canvas.scss";

interface ICanvas {
    canvas: createjsConfig;
}

const Canvas = (props: ICanvas) => {

    const container = createRef<HTMLDivElement>();

    useEffect(() => {
        if (container != null) {
            var containerHTML = container.current as HTMLDivElement;
            props.canvas.appendTo(containerHTML);
        }
    }, [])

    return <div className="Canvas" ref={container}>

    </div>

}

export default Canvas;