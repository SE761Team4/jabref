import React from 'react';
import { Ellipse, Text, Group, Rect } from 'react-konva';


const Node = ({node, id, x, y, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId}) => {

    const handleDragMove = (e) => {
        node.x = e.target.x()
        node.y = e.target.y()
      updateNode(node);
      updateEdges(node.id, e.target.x(), e.target.y());
    }

    const width = 150
    const height = 70
    return (
      <Group
        id={node.id}
        x={node.x}
        y={node.y}
        draggable
        onDragMove={handleDragMove}
        onClick={() => setSelectedNode(node)}
      >
        <Rect
          radius={{"x" : 50, "y" : 30}}
          width={width}
          height={height}
          offsetX={width/2}
          offsetY={height/2}
          cornerRadius={5}
          fill={selectedNodeId === node.id ? "green" : "white"}
          stroke={"black"}
        />
        <Text text={node.label}
          offsetX={width/2}
          offsetY={height/2 + 10}
        align="center"
        verticalAlign="middle"
        width={width}
        height={height}
        />
          <Group
              width={width}
              height={height}
              offsetX={width/2 -10}
              offsetY={-height/2 + 20}
          >
              {node.bibEntryId && <Rect
              width={10}
              height={10}
              fill={"red"}
              />}
          </Group>
      </Group>
    );
  };

  export default Node;
