import React, {useRef } from "react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import './toolbar.css';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import HeightIcon from '@material-ui/icons/Height';
import Input from '@material-ui/core/Input';
import Avatar from "@material-ui/core/Avatar";
;

// const Toolbar = ({nodes, edges, setNodes, setEdges, getNodeById, selectedNodeId, globalNodeIdCounter, setGlobalNodeIdCounter}) => {


const MindMapToolbar = ({addNode, saveMap, deleteNode, searchNodes, linking, setLinking}) => {
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

    return(
        <Toolbar className = 'toolbar-proportions' component = { Paper }>
        <div class="buttons-container">
            {/*<div style={{  borderRight: '0.1em solid grey', padding: '0.5em' }}>*/}
            <IconButton size="small" aria-label = "add" onClick={() => addNode()} >
                <img src="/assets/Add.png" alt="Add" class="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={() => setLinking(!linking)} color={linking ? 'primary' : 'default'} >
                <img src="/assets/Link.png" alt="Add" class="toolbar-button "/>
            </IconButton>
            <div class="divider"></div>

            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/Read.png" alt="Read Status" class="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/LowPriority.png" alt="Priority" class="toolbar-button"/>
            </IconButton>
            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/Favourite.png" alt="Favourite" class="toolbar-button"/>
            </IconButton>
            <div class="divider"></div>

            <IconButton size="small" onClick={deleteNode}>
                <img src="/assets/Trash.png" alt="Delete Node" class="trash-button"/>
            </IconButton>
        </div>

        <div class="search-container">

            <IconButton size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <img src="/assets/Save.png" alt="Priority" class="toolbar-button save-button"/>
            </IconButton>



            <select style={{ border: 'none', textAlign: 'centre', fontSize: 14, marginRight: 30, marginLeft:30 }} >
                <option value = "noFilter"> No Filter </option>
                    <option value = "highPriority"> High Priority </option>
                    <option value = "favourites"> Low Priority </option>
                    <option value = "favourites"> Favourites </option>
                </select>

            <input class="search-bar" id="outlined-basic" onChange={searchNodes}  ref={inputRef } placeholder="Search..." />

            <IconButton size="small" onClick={() => saveMap()} style={{paddingLeft: '0.5em'}}>
                <img src="/assets/Exit.png" alt="Priority" class="toolbar-button"/>
            </IconButton>
        </div>

    </Toolbar>
    )
}

export default React.memo(MindMapToolbar);






