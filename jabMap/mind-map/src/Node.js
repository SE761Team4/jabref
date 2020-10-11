import React from 'react';
import { Ellipse, Text, Group } from 'react-konva';


const Node = ({id, x_pos, y_pos, colour, updateEdges, setSelectedNodeId, selectedNodeId, updateNode, label}) => {

    const handleDragMove = (e) => {
      updateNode(id, e.target.x(), e.target.y());
      updateEdges(id, e.target.x(), e.target.y());
    }

    return (
      <Group
        id={id}
        x={x_pos}
        y={y_pos}
        draggable
        onDragMove={handleDragMove}
        onClick={() => setSelectedNodeId(id)}
      >
        <Ellipse
          radius={{"x" : 50, "y" : 30}}
          fill={selectedNodeId === id ? "green" : "white"}
          stroke={colour}
        />
        <Text text={label}
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
