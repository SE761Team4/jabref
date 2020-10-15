import React, { useEffect, useState } from 'react';
import useImage from 'use-image';
import { Image, Group } from 'react-konva';
import { IconTypes } from '../enums/IconTypes';

const NodeIcons = ({node, updateNode}) => {

    const [readIcon] = useImage('/assets/Read.png');
    const [toReadIcon] = useImage('/assets/ToRead.png');
    const [highPriorityIcon] = useImage('/assets/HighPriority.png');
    const [medPriorityIcon] = useImage('/assets/MediumPriority.png');
    const [lowPriorityIcon] = useImage('/assets/LowPriority.png');
    const [favouritedIcon] = useImage('/assets/Favourited.png');
    const [notFavouriteIcon] = useImage('/assets/NotFavourited.png');

    const NODE_WIDTH = 170;
    const NODE_HEIGHT = 80;

    useEffect(() => {

      }, [node.icons])

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
  

    return (
        <Group
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        offsetX={NODE_WIDTH/2 -10}
        offsetY={-NODE_HEIGHT/2 + 20}>

        <Image image={node.icons.includes(IconTypes.READ) ? readIcon : toReadIcon} width={24} height={24} offsetX={-50} onClick={toggleReadIcon}/> 

{node.icons.includes(IconTypes.HIGH_PRIORITY) &&
    <Image image={highPriorityIcon} width={24} height={24} offsetX={-20} onClick={toggleReadIcon}></Image>

}

{node.icons.includes(IconTypes.MEDIUM_PRIORITY) &&
    <Image image={medPriorityIcon} width={24} height={24} offsetX={-20} onClick={toggleReadIcon}></Image>

}

{node.icons.includes(IconTypes.LOW_PRIORITY) &&
    <Image image={lowPriorityIcon} width={24} height={24} offsetX={-20} onClick={toggleReadIcon}></Image>

}

        <Image image={node.icons.includes(IconTypes.FAVOURITE) ? favouritedIcon : notFavouriteIcon} width={24} height={24} offsetX={-80} onClick={toggleFavouritedIcon}/>   
    </Group>
    );
}

export default NodeIcons;