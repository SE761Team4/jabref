import React from 'react';
import { Line } from 'react-konva';


const Edge = ({x1, y1, x2, y2}) => {
    return (
        <Line  points={[x1, y1, x2, y2]} stroke="blue"/>
    )
}

export default Edge;