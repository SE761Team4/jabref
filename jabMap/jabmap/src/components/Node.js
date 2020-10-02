import React, { useEffect, useState } from 'react'; 
import { Circle, Layer, Text, Group } from 'react-konva';


const Node = ({updateEdges, setSelectedNode, id, x, y, selected, dragStart, dragEnd}) => {


    const [position, setPosition] = useState({
      id: id,
      x: x,
      y: y,
      active: false,
      offset: { },
      isSelected: selected === id 
    });

    useEffect(() => {

      setPosition({
        ...position,
        isSelected: selected == position.id
      });
    }, [selected])

    const setSelected = () => {
      setPosition({
        ...position,
        isSelected: !position.isSelected
      })
      if(position.isSelected){
        setSelectedNode("none");
      } else {
        setSelectedNode(position.id)
      }
    }

    // Can use for dynamic nodes but is laggy
    const handleDragMove = (e) => {
      setPosition({
        ...position,
        x: e.target.x(),
        y: e.target.y()
      })
      updateEdges(e.target.id(), e.target.x(), e.target.y())
    }
    const handleDragEnd = (e) => {
      setPosition({
        ...position,
        x: e.target.x(),
        y: e.target.y()
      })
      updateEdges(e.target.id(), e.target.x(), e.target.y())
    }

    return (
      <Group
        id={position.id}
        x={position.x}
        y={position.y}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onClick={setSelected}
        draggable
      >

      <Circle
        radius={50}
        fill={position.isSelected ? "green" : "blue"}
      />
      <Text text={position.id} />

      </Group>


    );
  };

  export default Node;