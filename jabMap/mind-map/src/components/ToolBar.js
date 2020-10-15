import React, {useRef} from "react";
import Toolbar
    from '@material-ui/core/Toolbar';
import '../styling/Toolbar.css';
import Paper
    from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import {IconTypes} from "../enums/IconTypes";
import PriorityDropdown
    from "./PriorityDropdown";


const MindMapToolbar = ({ selectedNode, updateNode, addNode, saveMap, deleteNode, searchNodes, linking, setLinking, unlinking, setUnlinking}) => {

    const inputRef = useRef(null);


     window.onkeydown = function(e)  {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)){
            // listen to ctrl + F
            e.preventDefault();
            inputRef.current.focus();
        }
    }

    const toggleReadIcon = () => {

        if(selectedNode.icons){
          let newIcons = [];
          if(selectedNode.icons.includes(IconTypes.READ)){
            newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.READ});
            newIcons.push(IconTypes.TO_READ);
          } else {
            newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.TO_READ});
            newIcons.push(IconTypes.READ)
          }
          selectedNode.icons = newIcons;
          updateNode(selectedNode);
        }
      }

      const toggleFavouritedIcon = () => {

        if(selectedNode.icons){
          let newIcons = [];
          if(selectedNode.icons.includes(IconTypes.FAVOURITE)){
            newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.FAVOURITE});
            newIcons.push(IconTypes.NOT_FAVOURITE);
          } else {
            newIcons = selectedNode.icons.filter((icon) => {return icon !== IconTypes.NOT_FAVOURITE});
            newIcons.push(IconTypes.FAVOURITE)
          }
          selectedNode.icons = newIcons;
          updateNode(selectedNode);
        }
      }


    return(
        <Toolbar className = 'toolbar-proportions' component = { Paper }>
        <div className="buttons-container">

            <Button size="small" aria-label = "add" onClick={() => addNode()} >
                <img src="/assets/Add.png" alt="Add" className="toolbar-button"/>
            </Button>
            <Button size="small" onClick={() => setLinking(!linking)} color={linking ? 'primary' : 'default'} >
                <img src="/assets/Link.png" alt="Link" className="toolbar-button "/>
            </Button>

            <Button size="small" onClick={() => setUnlinking(!unlinking)} color={linking ? 'primary' : 'default'} >
                <img src="/assets/Unlink.png" alt="Unlink" className="toolbar-button "/>
            </Button>
            <div className="divider"></div>

            <Button size="small" onClick={toggleReadIcon}>
                <img src="/assets/MarkRead.png" alt="Read Status" className="toolbar-button"/>
            </Button>

            <PriorityDropdown />

            <Button size="small" onClick={toggleFavouritedIcon}>
                <img src="/assets/Favourite.png" alt="Favourite" className="toolbar-button"/>
            </Button>
            <div className="divider"></div>

            <Button size="small" onClick={deleteNode}>
                <img src="/assets/Trash.png" alt="Delete Node" className="trash-button"/>
            </Button>
        </div>

        <div className="search-container">

            <Button size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <img src="/assets/Save.png" alt="Priority" className="toolbar-button save-button"/>
            </Button>

            <input className="search-bar" id="outlined-basic" onChange={searchNodes}  ref={inputRef } placeholder="Search..." />
        </div>

    </Toolbar>
    )
}

export default React.memo(MindMapToolbar);







