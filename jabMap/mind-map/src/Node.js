import React from 'react';
import { Ellipse, Text, Group, Rect } from 'react-konva';


const Node = ({node, id, colors, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId, isInSearch: isInSearch}) => {

    const handleDragMove = (e) => {
        node.x_pos = e.target.x()
        node.y_pos = e.target.y()
      updateNode(node);
      updateEdges(node.id, e.target.x(), e.target.y());
    }

    const width = 150
    const height = 70
    return (
      <Group
        id={node.id}
        x={node.x_pos}
        y={node.y_pos}
        draggable
        onDragMove={handleDragMove}
        onClick={() => setSelectedNode(node)}
        onMouseEnter={(e) => {
            const container = e.target.getStage().container();
            container.style.cursor = "pointer";
        }}
        onMouseLeave={e => {
            const container = e.target.getStage().container();
            container.style.cursor = "default";
        }}
      >
        <Rect
          radius={{"x" : 50, "y" : 30}}
          width={width}
          height={height}
          offsetX={width/2}
          offsetY={height/2}
          cornerRadius={20}
          fill={isInSearch ? "#3f51b5" : selectedNodeId === node.id ? "#a2b8e5" : "white"}
          stroke={node.colour === undefined ? "#6E6E6E" : node.colour}
          strokeWidth={4}
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
              {node.citationKey && <Rect
              width={10}
              height={10}
              fill={"red"}
              />}
          </Group>
      </Group>
    );
  };
  export default Node;
