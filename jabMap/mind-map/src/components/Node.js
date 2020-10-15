import React, { useEffect, useState } from 'react';
import { Text, Group, Rect } from 'react-konva';
import NodeIcons from './NodeIcons';
import { renderText } from '../utils/utilFunctions';

const Node = ({node, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId, isInSearch: isInSearch}) => {
  
  const NODE_WIDTH = 170;
  const NODE_HEIGHT = 80;

  const handleDragMove = (e) => {
        node.x_pos = e.target.x()
        node.y_pos = e.target.y()
      updateNode(node);
      updateEdges(node.id, e.target.x(), e.target.y());
    }
    
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
          // Codes of this rect is to cover the edge under rect
          radius={{"x" : 50, "y" : 30}}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          offsetX={NODE_WIDTH/2}
          offsetY={NODE_HEIGHT/2}
          cornerRadius={20}
          fill={"white"}          
          strokeWidth={4}
        />

        <Rect
          radius={{"x" : 50, "y" : 30}}
          width={NODE_WIDTH}
          height={NODE_HEIGHT}
          offsetX={NODE_WIDTH/2}
          offsetY={NODE_HEIGHT/2}
          cornerRadius={20}
          fill={isInSearch ? "#3f51b5" : (selectedNodeId === node.id ? "#a2b8e5" : node.colour==undefined?"white":node.colour+"80")}
          stroke={node.colour === undefined ? "#6E6E6E" : node.colour}
          strokeWidth={4}
        />
        <Text text={renderText(node.label)}
          offsetX={NODE_WIDTH/2}
          offsetY={NODE_HEIGHT/2 + 10}
        align="center"
        verticalAlign="middle"
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        />
        <NodeIcons node={node} updateNode={updateNode}></NodeIcons> 
      </Group>
    );
  };
  export default Node;
