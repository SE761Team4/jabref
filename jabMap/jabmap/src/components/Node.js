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
      console.log("pos selected: " + position.id + " " + position.isSelected + " " + selected);
    }, [selected])

    const setSelected = () => {
      setPosition({
        ...position,
        isSelected: !position.isSelected
      })
      if(position.isSelected){
        setSelectedNode("none");
      } else {
        console.log("Selected " + position.id)
        setSelectedNode(position.id)
      }
    }

    // Can use for dynamic nodes but is laggy
    const handleDragMove = (e) => {
      console.log("coords " + e.target.x() + e.target.y())
      updateEdges(e.target.id(), e.target.x(), e.target.y())
    }
    const handleDragEnd = (e) => {
      updateEdges(e.target.id(), e.target.x(), e.target.y())
    }

    return (
      <Group
        id={position.id}
        x={position.x}
        y={position.y}
        onDragEnd={handleDragEnd}
        onClick={setSelected}
        draggable
      >
        <Text text={position.id} />
        <Circle
          // id={position.id}
          // x={position.x}
          // y={position.y}
          radius={50}
          fill={position.isSelected ? "green" : "blue"}
          // onDragEnd={handleDragEnd}
          // onClick={setSelected}
          // draggable
        />
      </Group>


    );
  };

  export default Node;