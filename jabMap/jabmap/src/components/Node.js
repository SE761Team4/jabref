import React, { useEffect, useState } from 'react'; 


const Circle = ({updateEdges, setSelectedNode, id, x, y, selected}) => {


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

  
    const handlePointerDown = e => {
      const el = e.target;
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      el.setPointerCapture(e.pointerId);
      setPosition({
        ...position,
        active: true,
        isSelected: !position.isSelected,
        offset: {
          x,
          y
        }
      });
      if(!position.isSelected){
        // changeSelected(position.id);
        console.log("this: " + id + " selected: " + selected )

        setSelectedNode(position.id);
      } else {
        console.log("unselecting " + id)
        setSelectedNode("none");
        // changeSelected("none");
      }
    };


    const handlePointerMove = e => {
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;


      if (position.active) {
        setPosition({
          ...position,
          x: position.x - (position.offset.x - x),
          y: position.y - (position.offset.y - y)
        });
        updatePos();
      }

    };
    const handlePointerUp = e => {
      setPosition({
        ...position,
        active: false
      });


    };
  
    const updatePos = () => {
      updateEdges(position.id, position.x, position.y);
    }

    return (
      <g>
        <text x={position.x} y={position.y} class="small" fill="black">A node</text>
        <circle
          cx={position.x}
          cy={position.y}
          r={50}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          stroke="black"
          stroke-width="3"
          // fill="white"
          fill={position.isSelected ? "blue" : "white"}
        >
        </circle>
      </g>

    );
  };

  export default Circle;