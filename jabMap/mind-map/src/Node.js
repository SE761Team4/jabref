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
    
    const toggleReadIcon = () => {
      if(node.icons){
        let newIcons = [];
        if(node.icons.includes("READ")){
          newIcons = node.icons.filter((icon) => {return icon !== "READ"});
          newIcons.push("TO_READ");
        } else if (node.icons.includes("TO_READ")) {
          newIcons = node.icons.filter((icon) => {return icon !== "TO_READ"});
          newIcons.push("READ")
        }
        node.icons = newIcons;
        updateNode(node);
      }

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
          //codes of this rect is to cover the edge under rect
          radius={{"x" : 50, "y" : 30}}
          width={width}
          height={height}
          offsetX={width/2}
          offsetY={height/2}
          cornerRadius={20}
          fill={"white"}          
          strokeWidth={4}
        />

        <Rect
          radius={{"x" : 50, "y" : 30}}
          width={width}
          height={height}
          offsetX={width/2}
          offsetY={height/2}
          cornerRadius={20}
          fill={isInSearch ? "#3f51b5" : (selectedNodeId === node.id ? "#a2b8e5" : node.colour==undefined?"white":node.colour+"80")}
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
              {(node.citationKey && node.icons && (node.icons.includes("TO_READ") || node.icons.includes("READ"))) && 
                <Image id={`${node.id}_read_status`} image={bookmark} fill={node.icons.includes("READ") ? 'green' : selectedNodeId === node.id ? "#a2b8e5" : "white" } onClick={toggleReadIcon}/>}
          </Group>
      </Group>
    );
  };
  export default Node;
