import React from 'react'; 


const Circle = ({xStart, yStart}) => {
    const [position, setPosition] = React.useState({
      x: 100,
      y: 100,
      active: false,
      offset: { }
    });
  
    const handlePointerDown = e => {
      const el = e.target;
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      el.setPointerCapture(e.pointerId);
      setPosition({
        ...position,
        active: true,
        offset: {
          x,
          y
        }
      });
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
      }

      updatePos();
    };
    const handlePointerUp = e => {
      setPosition({
        ...position,
        active: false
      });


    };
  
    const updatePos = () => {
      xStart(position.x);
      yStart(position.y);
    }

    return (
      <circle
        cx={position.x}
        cy={position.y}
        r={50}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        fill={position.active ? "blue" : "black"}
      />
    );
  };

  export default Circle;