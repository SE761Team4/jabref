import React from 'react';
import { Text, Group, Rect, Image } from 'react-konva';
import useImage from 'use-image';


const Node = ({node, id, colors, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId, isInSearch: isInSearch}) => {

    const handleDragMove = (e) => {
        node.x_pos = e.target.x()
        node.y_pos = e.target.y()
      updateNode(node);
      updateEdges(node.id, e.target.x(), e.target.y());
    }

    const getIcons = () => {
      
    }

    const [bookmark] = useImage('/assets/bookmarkSmall.png');


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
              {node.citationKey && <Image image={bookmark}/>}
          </Group>
      </Group>
    );
  };
  export default Node;
