import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import "../styling/PriorityDropdown.css";

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="priority-menu">
      <Button
        onClick={handleClick}
      >
        <img src="/assets/LowPriority.png" className="main-button-icon"></img>

      </Button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
        <img src="/assets/LowPriority.png" className="menu-buttons"></img>
          <ListItemText primary="Low priority" />
        </MenuItem>
        <MenuItem>
            <img src="/assets/MediumPriority.png" className="menu-buttons"></img>
          <ListItemText primary="Medium priority" />
        </MenuItem>
        <MenuItem>
          <img src="/assets/HighPriority.png"className="menu-buttons"></img>
          <ListItemText primary="High priority" />
        </MenuItem>
      </Menu>
    </div>
  );
}
