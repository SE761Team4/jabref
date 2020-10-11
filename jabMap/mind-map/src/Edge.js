import React from 'react';
import { Line, Shape } from 'react-konva';


const Edge = ({x1, y1, x2, y2}) => {
    let pts = { st: [x1, y1],
        ct: [x1, y2, x1, y2],
        en: [x2, y2]
    }

    return (
        // <Line  points={[x1, y1, x2, y2]} stroke="blue"/>
        <Shape stroke={"#50618F"}
                strokeWidth={6}
                lineCap={"round"}
                sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(...pts.st);
                    context.bezierCurveTo(...pts.ct,...pts.en);
                    context.strokeShape(shape);
                }}>
        </Shape>
    )
}

export default Edge;
