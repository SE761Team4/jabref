import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import "../styling/PriorityDropdown.css";
import { Priorities } from "../enums/Priorities";
import { IconTypes } from "../enums/IconTypes";

const PriorityDropdown = ({selectedNode, updateNode}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pickPriority = (event) => {
      console.log(selectedNode)
      if (selectedNode.icons) 
      {
        if (event.target.textContent == Priorities.HIGH)
        {
          let newIcons = [];
          newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.MEDIUM_PRIORITY && icon !== IconTypes.LOW_PRIORITY});
          newIcons.push(IconTypes.HIGH_PRIORITY);
          selectedNode.icons = newIcons;
          updateNode(selectedNode);
        }
        else if (event.target.textContent == Priorities.MEDIUM)
        {
          let newIcons = [];
          newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.HIGH_PRIORITY && icon !== IconTypes.LOW_PRIORITY});
          newIcons.push(IconTypes.MEDIUM_PRIORITY);
          selectedNode.icons = newIcons;
          updateNode(selectedNode);      
      }
        else if (event.target.textContent == Priorities.LOW)
        {
          let newIcons = [];
          newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.MEDIUM_PRIORITY && icon !== IconTypes.HIGH_PRIORITY});
          newIcons.push(IconTypes.LOW_PRIORITY);
          selectedNode.icons = newIcons;
          updateNode(selectedNode);       
        }
      }

      handleClose();
  }

  return (
    <div className="priority-menu">
      <Button
        onClick={handleClick}>
        <img src="/assets/Priority.png" className="main-button-icon"></img>
      </Button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={pickPriority}>
        <img src="/assets/LowPriority.png" alt="low-priority" className="menu-buttons" id="low-priority"></img>
        <ListItemText primary={Priorities.LOW} />
        </MenuItem>
        <MenuItem onClick={pickPriority}>
            <img src="/assets/MediumPriority.png" alt="medium-priority" className="menu-buttons" id="medium-priority"></img>
        <ListItemText primary={Priorities.MEDIUM} />
        </MenuItem>
        <MenuItem onClick={pickPriority}>
        <img src="/assets/HighPriority.png" alt="high-priority" className="menu-buttons" id="high-priority"></img>
        <ListItemText primary={Priorities.HIGH} />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default React.memo(PriorityDropdown)
