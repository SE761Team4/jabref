import React from 'react';


const Edge = ({x1, y1, x2, y2}) => {
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} style={{stroke:'rgb(255,0,0)', strokeWidth: 2 }} />
    )
}

export default Edge;