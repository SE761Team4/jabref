import React, {useRef } from "react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import '../styling/Toolbar.css';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { IconTypes } from "../enums/IconTypes";


const MindMapToolbar = ({ selectedNode, updateNode, addNode, saveMap, deleteNode, searchNodes, linking, setLinking}) => {
    //Styles
    const useStyles = makeStyles({
        toolbar: {
            width: "100%",
            textAlign: "center"
        }
    });
    const classes = useStyles();

    const inputRef = useRef(null);


     window.onkeydown = function(e)  {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)){
            // listen to ctrl + F
            e.preventDefault();
            inputRef.current.focus();
        }
    }

    const toggleReadIcon = () => {

        console.log(selectedNode.icons)
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

    return(
        <Toolbar className = 'toolbar-proportions' component = { Paper }>
        <div className="buttons-container">
            {/*<div style={{  borderRight: '0.1em solid grey', padding: '0.5em' }}>*/}
            <IconButton size="small" aria-label = "add" onClick={() => addNode()} >
                <img src="/assets/Add.png" alt="Add" className="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={() => setLinking(!linking)} color={linking ? 'primary' : 'default'} >
                <img src="/assets/Link.png" alt="Link" className="toolbar-button "/>
            </IconButton>

            <IconButton size="small" onClick={() => setLinking(!linking)} color={linking ? 'primary' : 'default'} >
                <img src="/assets/Unlink.png" alt="Unlink" className="toolbar-button "/>
            </IconButton>
            <div className="divider"></div>

            <IconButton size="small" onClick={toggleReadIcon}>
                <img src="/assets/Read.png" alt="Read Status" className="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/LowPriority.png" alt="Priority" className="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/Favourite.png" alt="Favourite" className="toolbar-button"/>
            </IconButton>
            <div className="divider"></div>

            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/Trash.png" alt="Delete Node" className="trash-button"/>
            </IconButton>
        </div>

        <div className="search-container">

            <IconButton size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <img src="/assets/Save.png" alt="Priority" className="toolbar-button save-button"/>
            </IconButton>



            <select style={{ border: 'none', textAlign: 'centre', fontSize: 14, marginRight: 30, marginLeft:30 }} >
                <option value = "noFilter"> No Filter </option>
                    <option value = "highPriority"> High Priority </option>
                    <option value = "favourites"> Low Priority </option>
                    <option value = "favourites"> Favourites </option>
                </select>

            <input className="search-bar" id="outlined-basic" onChange={searchNodes}  ref={inputRef } placeholder="Search..." />

            <IconButton size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <img src="/assets/Exit.png" alt="Priority" className="toolbar-button"/>
            </IconButton>
        </div>

    </Toolbar>
    )
}

export default React.memo(MindMapToolbar);







