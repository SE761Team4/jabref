import React, { useEffect, useState } from 'react';
import { Text, Group, Rect, Image } from 'react-konva';
import useImage from 'use-image';


const Node = ({node, id, colors, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId, isInSearch: isInSearch}) => {
  

  const priorityColors = ['none','yellow', 'orange', 'red'];
  const [bookmarkIcon] = useImage('/assets/bookmarkSmall.png');
  const [priorityIcon] = useImage('/assets/priority.png');

  const [priorityColor, setPriorityColor] = useState();

  // Set initial priority icon color 
  useEffect(() => {
    if(node.icons){
      if(node.icons.includes("HIGH_PRIORITY")){
        setPriorityColor(priorityColors[3]);
      } else if(node.icons.includes("MEDIUM_PRIORITY")){
        setPriorityColor(priorityColors[2]);
      } else if(node.icons.includes("LOW_PRIORITY")){
        setPriorityColor(priorityColors[1]);
      }
    }
  })
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

    const togglePriority = () => {
      if(node.icons){
        let newIcons = [];
        if(node.icons.includes("HIGH_PRIORITY")){
          newIcons = node.icons.filter((icon) => {return icon !== "HIGH_PRIORITY"});
          setPriorityColor(priorityColors[0]);
        } else if(node.icons.includes("MEDIUM_PRIORITY")){
          newIcons = node.icons.filter((icon) => {return icon !== "MEDIUM_PRIORITY"});
          newIcons.push("HIGH_PRIORITY");
          setPriorityColor(priorityColors[3]);
        } else if(node.icons.includes("LOW_PRIORITY")){
          newIcons = node.icons.filter((icon) => {return icon !== "LOW_PRIORITY"});
          newIcons.push("MEDIUM_PRIORITY");
          setPriorityColor(priorityColors[2]);
        } else {
          newIcons.push(...node.icons);
          newIcons.push("LOW_PRIORITY")
          setPriorityColor(priorityColors[1])
        }
        node.icons = newIcons;
        updateNode(node);
      }
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
              {(node.citationKey && node.icons && (node.icons.includes("TO_READ") || node.icons.includes("READ"))) && 
                <Image image={bookmarkIcon} fill={node.icons.includes("READ") ? 'green' : selectedNodeId === node.id ? "#a2b8e5" : "white" } onClick={toggleReadIcon}/>}
              {node.icons && <Image image={priorityIcon} width={16} height={16} offsetX={-20} fill={priorityColor !== 'none' ? priorityColor : selectedNodeId === node.id ? "#a2b8e5" : "white"} onClick={togglePriority}/>}
          </Group>
      </Group>
    );
  };
  export default Node;
