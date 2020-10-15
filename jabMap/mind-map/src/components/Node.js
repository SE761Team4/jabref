import React, { useEffect, useState } from 'react';
import { Text, Group, Rect, Image } from 'react-konva';
import useImage from 'use-image';
import { IconTypes } from "../enums/IconTypes";

const Node = ({node, id, colors, updateEdges, setSelectedNode, selectedNodeId, updateNode, label, bibEntryId, isInSearch: isInSearch}) => {
  
  const priorityColors = ['none','yellow', 'orange', 'red'];
  const [readIcon] = useImage('/assets/Read.png');
  const [toReadIcon] = useImage('/assets/ToRead.png');
  const [priorityIcon] = useImage('/assets/priority.png');
  const [favouritedIcon] = useImage('/assets/Favourited.png');
  const [notFavouriteIcon] = useImage('/assets/NotFavourited.png');

  const nodeWidth = 170;
  const nodeHeight = 80;

  const [priorityColor, setPriorityColor] = useState();

  // Set initial priority icon color 
  useEffect(() => {
    if(node.icons) {
      if (node.icons.includes("HIGH_PRIORITY")) {
        setPriorityColor(priorityColors[3]);
      } else if(node.icons.includes("MEDIUM_PRIORITY")) {
        setPriorityColor(priorityColors[2]);
      } else if(node.icons.includes("LOW_PRIORITY")) {
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
    
    const toggleFavouritedIcon = () => {

      if(node.icons){
        let newIcons = [];
        if(node.icons.includes(IconTypes.FAVOURITE)){
          newIcons = node.icons.filter((icon) => {return icon !== IconTypes.FAVOURITE});
          newIcons.push(IconTypes.NOT_FAVOURITE);
        } else {
          newIcons = node.icons.filter((icon) => {return icon !== IconTypes.NOT_FAVOURITE});
          newIcons.push(IconTypes.FAVOURITE)
        }
        node.icons = newIcons;
        updateNode(node);
      }
    }

        
    const toggleReadIcon = () => {

      if(node.icons){
        let newIcons = [];
        if(node.icons.includes(IconTypes.READ)){
          newIcons = node.icons.filter((icon) => {return icon !== IconTypes.READ});
          newIcons.push(IconTypes.TO_READ);
        } else {
          newIcons = node.icons.filter((icon) => {return icon !== IconTypes.TO_READ});
          newIcons.push(IconTypes.READ)
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
          width={nodeWidth}
          height={nodeHeight}
          offsetX={nodeWidth/2}
          offsetY={nodeHeight/2}
          cornerRadius={20}
          fill={"white"}          
          strokeWidth={4}
        />

        <Rect
          radius={{"x" : 50, "y" : 30}}
          width={nodeWidth}
          height={nodeHeight}
          offsetX={nodeWidth/2}
          offsetY={nodeHeight/2}
          cornerRadius={20}
          fill={isInSearch ? "#3f51b5" : (selectedNodeId === node.id ? "#a2b8e5" : node.colour==undefined?"white":node.colour+"80")}
          stroke={node.colour === undefined ? "#6E6E6E" : node.colour}
          strokeWidth={4}
        />
        <Text text={node.label}
          offsetX={nodeWidth/2}
          offsetY={nodeHeight/2 + 10}
        align="center"
        verticalAlign="middle"
        width={nodeWidth}
        height={nodeHeight}
        />
          <Group
              width={nodeWidth}
              height={nodeHeight}
              offsetX={nodeWidth/2 -25}
              offsetY={-nodeHeight/2 + 30}
          >
            <Image image={node.icons.includes(IconTypes.READ) ? readIcon : toReadIcon} width={24} height={24} offsetX={-50} onClick={toggleReadIcon}/> 

            {node.icons && <Image image={priorityIcon} width={24} height={24} offsetX={-20} fill={priorityColor !== 'none' ? priorityColor : selectedNodeId === node.id ? "#a2b8e5" : "white"} onClick={togglePriority}/>}

            <Image image={node.icons.includes(IconTypes.FAVOURITE) ? favouritedIcon : notFavouriteIcon} width={24} height={24} offsetX={-80} onClick={toggleFavouritedIcon}/> 


          </Group>
      </Group>
    );
  };
  export default Node;
