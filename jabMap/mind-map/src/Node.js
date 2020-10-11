import React, { useEffect, useState } from 'react'; 
import { Ellipse, Layer, Text, Group } from 'react-konva';

const Node = ({id, x, y, colors, updateEdges, setSelectedNodeId, selectedNodeId, updateNode, isInSerchRet}) => {

    const handleDragMove = (e) => {
      updateNode(id, e.target.x(), e.target.y());
      updateEdges(id, e.target.x(), e.target.y());
    }

    return (
      <Group
        id={id}
        x={x}
        y={y}
        draggable
        onDragMove={handleDragMove}
        onClick={() => setSelectedNodeId(id)}
      >
        <Ellipse
          radius={{"x" : 50, "y" : 30}}
          //fill={ selectedNodeId == id ? "green" : (colors == ''? "white":colors)}
          fill={ colors=="white"||colors==""? (selectedNodeId == id ? "green" : "white"):colors}
          stroke={isInSerchRet?"red":"black"}
        />
        <Text text={id}
        x={-50}
        y={-30}
        align="center"
        verticalAlign="middle"
        width={100}
        height={60}
        />
      </Group>
    );
  };
  export default Node;